-- ============================================================
-- SUIVI PROGRESSION MATHS/SCIENCES/TECHNO — Schéma Supabase
-- ============================================================

-- 1. Profils (liés à auth.users)
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  nom         text not null default '',
  etablissement text not null default '',
  created_at  timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Profil visible par son propriétaire" on public.profiles
  for all using (auth.uid() = id);

-- Trigger : créer un profil à l'inscription
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles(id) values (new.id);
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Classes
create table if not exists public.classes (
  id          uuid primary key default gen_random_uuid(),
  teacher_id  uuid not null references public.profiles(id) on delete cascade,
  nom         text not null,
  niveau      text not null,  -- 'troisieme_pm'|'cap'|'seconde'|'premiere'|'terminale'|'upe2a'
  matiere     text not null default 'maths',
  annee       text not null default '2025-2026',
  couleur     text not null default '#4f46e5',
  created_at  timestamptz default now()
);
alter table public.classes enable row level security;
create policy "Classes du prof" on public.classes
  for all using (teacher_id = auth.uid());

-- 3. Progression des items
create table if not exists public.progress (
  id              uuid primary key default gen_random_uuid(),
  class_id        uuid not null references public.classes(id) on delete cascade,
  item_key        text not null,      -- ex: "pm0m1_0" (id chapitre + index item)
  statut          text not null default 'nc',  -- nc|enc|rev|ok
  date_realisation date,              -- date choisie par l'enseignant
  temps_minutes   int default 0,
  updated_at      timestamptz default now(),
  unique(class_id, item_key)
);
alter table public.progress enable row level security;
create policy "Progress via classe du prof" on public.progress
  for all using (
    exists (
      select 1 from public.classes
      where classes.id = progress.class_id
        and classes.teacher_id = auth.uid()
    )
  );

-- 4. Évaluations
create table if not exists public.evaluations (
  id          uuid primary key default gen_random_uuid(),
  class_id    uuid not null references public.classes(id) on delete cascade,
  titre       text not null default 'Évaluation',
  date_eval   date not null,
  note_max    numeric(5,2),
  created_at  timestamptz default now()
);
alter table public.evaluations enable row level security;
create policy "Evals via classe du prof" on public.evaluations
  for all using (
    exists (
      select 1 from public.classes
      where classes.id = evaluations.class_id
        and classes.teacher_id = auth.uid()
    )
  );

-- 5. Items d'une évaluation
create table if not exists public.evaluation_items (
  id              uuid primary key default gen_random_uuid(),
  evaluation_id   uuid not null references public.evaluations(id) on delete cascade,
  item_key        text not null,
  unique(evaluation_id, item_key)
);
alter table public.evaluation_items enable row level security;
create policy "Eval items via eval du prof" on public.evaluation_items
  for all using (
    exists (
      select 1 from public.evaluations e
      join public.classes c on c.id = e.class_id
      where e.id = evaluation_items.evaluation_id
        and c.teacher_id = auth.uid()
    )
  );
