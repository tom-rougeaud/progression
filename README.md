# Suivi Progression — Maths/Sciences/Techno

Application de suivi pédagogique pour enseignants en lycée professionnel (3ème PM, CAP, 2nde/1ère/Term Bac Pro, UPE2A).

## Fonctionnalités

- 🔐 **Multi-profs** : chaque enseignant se connecte avec son compte
- 📚 **Multi-classes** : plusieurs classes par prof, chacune avec son niveau et sa couleur
- 📋 **Programme accordéon** : navigation thèmes → chapitres → items
- 🔄 **4 statuts** : Non commencé · En cours · En révision · Maîtrisé
- 📅 **Dates personnalisées** : choisissez la date de réalisation (pas d'auto-remplissage)
- ⏱️ **Suivi du temps** : par item ou par chapitre (réparti automatiquement)
- 📝 **Évaluations** : créez une éval, choisissez les items évalués, associez une date

## Installation

### 1. Créer le projet Supabase

1. Allez sur [supabase.com](https://supabase.com) → **New project**
2. Dans **SQL Editor**, exécutez le contenu de `supabase_schema.sql`
3. Récupérez dans **Settings → API** :
   - `Project URL`
   - `anon / public` key

### 2. Configurer l'application

Éditez `config.js` et remplacez :

```js
const SUPABASE_URL  = 'https://VOTRE_PROJECT_ID.supabase.co';
const SUPABASE_ANON = 'VOTRE_ANON_KEY';
```

### 3. Activer GitHub Pages

Dans le repo GitHub → **Settings → Pages** :
- Source : `Deploy from a branch`
- Branch : `main` / `/ (root)`

L'application est accessible sur `https://tom-rougeaud.github.io/progression/`

## Structure des fichiers

```
progression/
├── index.html          # Application principale
├── auth.html           # Page de connexion / inscription
├── style.css           # Styles (dark mode inclus)
├── config.js           # ⚙️ URLs Supabase (à renseigner)
├── curriculum.js       # Programmes officiels (3ème PM → Term Pro)
├── supabase_schema.sql # Schéma de base de données + RLS
└── README.md
```

## Schéma Supabase

| Table | Description |
|-------|-------------|
| `profiles` | Profil de l'enseignant (nom, établissement) |
| `classes` | Classes avec niveau, couleur, année |
| `progress` | Statut + date + temps par item et par classe |
| `evaluations` | Évaluations (titre, date) |
| `evaluation_items` | Items associés à chaque évaluation |

## Licence

CC BY-NC-SA 4.0 — Tom Rougeaud
