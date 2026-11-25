/* Projet : Suivi Progression — test de bout en bout du bloc Compte (base Supabase simulée)
   Auteur : Tom Rougeaud · Réalisé avec l’aide de l’IA : Claude Sonnet 5.5 (Anthropic) */
const { chromium } = require('playwright');
const URL_APP = 'http://127.0.0.1:8766/index.html', BASE = 'https://zfqzvwpjxmrlctxsmxch.supabase.co';
let ok = 0, ko = 0;
function t(c, m) { if (c) ok++; else { ko++; console.log('ÉCHEC :', m); } }
(async () => {
  const st = { users: {}, progress: [], evals: [], items: [], puts: [], upserts: [], rpcs: [], externes: [], erreurs: [], signupBody: null, pseudosPris: ['dejapris1'] };
  const b = await chromium.launch(); const ctx = await b.newContext({ acceptDownloads: true }); const p = await ctx.newPage();
  p.on('console', (m) => { if (m.type() === 'error' && !/status of 4/.test(m.text())) st.erreurs.push(m.text()); }); p.on('pageerror', (e) => st.erreurs.push('JS ' + e.message));
  const j = (route, code, body, h) => route.fulfill({ status: code, contentType: 'application/json', headers: h || {}, body: body === undefined ? '' : JSON.stringify(body) });
  const tok = (u) => ({ access_token: 'tk-' + u.id, refresh_token: 'rf', expires_in: 3600, expires_at: Math.floor(Date.now() / 1000) + 3600, user: u });
  await p.route('**/*', async (route) => {
    const r = route.request(), u = new URL(r.url());
    if (u.origin === 'http://127.0.0.1:8766') return route.continue();
    if (u.origin !== BASE) { st.externes.push(r.url()); return route.abort(); }
    const path = u.pathname, m = r.method(); let body = null; try { body = r.postData() ? JSON.parse(r.postData()) : null; } catch (e) {}
    if (path === '/auth/v1/settings') return j(route, 200, { mailer_autoconfirm: true });
    if (path === '/auth/v1/signup') { const id = 'u' + (Object.keys(st.users).length + 1); const us = { id, email: body.email, pw: body.password }; st.users[body.email] = us; st.signupBody = body; return j(route, 200, tok({ id, email: body.email })); }
    if (path === '/auth/v1/token') { const us = st.users[body.email]; if (!us || us.pw !== body.password) return j(route, 400, { error: 'invalid_grant', error_description: 'Invalid login credentials' }); return j(route, 200, tok({ id: us.id, email: us.email })); }
    if (path === '/auth/v1/user' && m === 'GET') { const us = Object.values(st.users).find((x) => r.headers().authorization === 'Bearer tk-' + x.id); return us ? j(route, 200, { id: us.id, email: us.email }) : j(route, 401, { message: 'jwt' }); }
    if (path === '/auth/v1/user' && m === 'PUT') { const us = Object.values(st.users).find((x) => r.headers().authorization === 'Bearer tk-' + x.id); us.pw = body.password; st.puts.push(body.password); return j(route, 200, { id: us.id }); }
    if (path === '/auth/v1/logout') return j(route, 204);
    if (path === '/rest/v1/rpc/pseudo_disponible') { st.rpcs.push(['pseudo_disponible', body]); return j(route, 200, !st.pseudosPris.includes(body.p)); }
    if (path === '/rest/v1/rpc/delete_user') { st.rpcs.push(['delete_user']); st.users = {}; st.progress = []; return j(route, 204); }
    if (path === '/rest/v1/progress') {
      if (m === 'POST') { st.upserts.push({ q: u.search, rows: body }); body.forEach((x) => st.progress.push(x)); return j(route, 201); }
      return j(route, 200, st.progress);
    }
    if (path === '/rest/v1/evaluations') {
      if (m === 'POST') { const row = Object.assign({ id: 'e' + (st.evals.length + 1) }, body); st.evals.push(row); return route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify(row) }); }
      if (m === 'DELETE') { const id = u.searchParams.get('id').slice(3); st.evals = st.evals.filter((x) => x.id !== id); return j(route, 204); }
      return j(route, 200, st.evals.map((e) => Object.assign({}, e, { evaluation_items: st.items.filter((i) => i.evaluation_id === e.id) })));
    }
    if (path === '/rest/v1/evaluation_items') { body.forEach((x) => st.items.push(x)); return j(route, 201); }
    return j(route, 404, { message: 'inconnu ' + path });
  });
  p.on('dialog', (d) => { st.dialog = d.message(); d.accept(); });
  await p.goto(URL_APP); await p.waitForTimeout(500);

  /* 1. page propre */
  t(!(await p.content()).includes('cdn.jsdelivr'), 'plus de CDN');
  t(!(await p.content()).includes('@gmail'), 'plus d’e-mail dans la page');
  await p.evaluate(() => openModal('authModal'));
  t(await p.locator('#compte-id').count() === 1, 'champ identifiant présent');
  t(await p.locator('#auth-zone input[type=email]').count() === 0, 'aucun champ e-mail');
  t(await p.locator('#auth-zone input[type=password]').count() === 1, 'un seul champ mot de passe en connexion');

  /* 2. création : règles */
  await p.click('text=Créer un compte');
  await p.fill('#compte-id', 'dejapris1'); await p.waitForTimeout(700);
  t((await p.locator('#auth-zone').innerText()).includes('déjà pris'), 'pseudo pris signalé');
  await p.fill('#compte-id', 'abc'); await p.waitForTimeout(700);
  t((await p.locator('#auth-zone').innerText()).includes('Format non valide'), 'pseudo trop court signalé');
  await p.fill('#compte-id', 'Monpseudo1'); await p.waitForTimeout(700);
  t((await p.locator('#auth-zone').innerText()).includes('Pseudo disponible'), 'pseudo libre signalé');
  await p.fill('#compte-mdp', 'faible'); await p.click('#auth-zone button[type=submit]'); await p.waitForTimeout(300);
  t((await p.locator('.auth-msg').first().innerText()).includes('règles'), 'mot de passe faible refusé');
  t(Object.keys(st.users).length === 0, 'aucun compte créé avec mot de passe faible');
  await p.fill('#compte-mdp', 'Bonne-phrase42'); await p.waitForTimeout(100);
  t((await p.locator('.regles li.ok').count()) === 5, 'cinq règles cochées');
  await p.click('#auth-zone .mdp-wrap button'); t(await p.locator('#compte-mdp').getAttribute('type') === 'text', 'afficher le mot de passe');
  await p.click('#auth-zone button[type=submit]'); await p.waitForTimeout(600);
  t(st.signupBody && st.signupBody.email === 'monpseudo1@progression.pseudo.invalid', 'identifiant technique propre à l’appli');
  t(st.signupBody && st.signupBody.data.pseudo === 'monpseudo1', 'pseudo transmis');
  t((await p.locator('#ft-auth-label').innerText()).includes('Connecté'), 'connecté après création');

  /* 3. synchronisation */
  await p.evaluate(() => { var sd = getSD('c1', 'maths'); sd.statuses = { 'n1': { s: 2, d: '2026-11-20', time: 30 } }; });
  await p.evaluate(() => window._SB.syncProgress('c1', 'maths')); await p.waitForTimeout(300);
  t(st.upserts.length === 1 && decodeURIComponent(st.upserts[0].q).includes('on_conflict=user_id,class_id,subject_id,item_key'), 'upsert avec la bonne clé de conflit');
  t(st.upserts[0].rows[0].user_id === 'u1' && st.upserts[0].rows[0].statut === '2', 'ligne de progression correcte');
  st.progress.push({ user_id: 'u1', class_id: 'c1', subject_id: 'maths', item_key: 'n2', statut: '3', date_realisation: '2026-11-21', temps_minutes: 5 });
  await p.evaluate(() => window._SB.pullProgress()); await p.waitForTimeout(300);
  t(await p.evaluate(() => getSD('c1', 'maths').statuses.n2 && getSD('c1', 'maths').statuses.n2.s) === 3, 'lecture de la progression distante');

  /* 4. évaluations */
  const ev = await p.evaluate(() => window._SB.saveEval({ class_id: 'c1', subject_id: 'maths', titre: 'Contrôle 1', date_eval: '2026-11-22', items: ['n1', 'n2'] }));
  t(ev && ev.id === 'e1' && st.items.length === 2, 'évaluation enregistrée avec ses notions');
  const liste = await p.evaluate(() => window._SB.loadEvals());
  t(liste.length === 1 && liste[0].evaluation_items.length === 2, 'évaluations relues');
  await p.evaluate(() => window._SB.deleteEval('e1')); await p.waitForTimeout(200);
  t(st.evals.length === 0, 'évaluation supprimée');

  /* 5. session conservée après rechargement */
  await p.reload(); await p.waitForTimeout(700);
  t((await p.locator('#ft-auth-label').innerText()).includes('Connecté'), 'session conservée au rechargement');

  /* 6. changement de mot de passe */
  await p.evaluate(() => openModal('accountModal'));
  await p.fill('#compte-actuel', 'Mauvais-mdp1!'); await p.fill('#compte-nouveau', 'Nouveau-mdp77'); await p.fill('#compte-confirm', 'Nouveau-mdp77');
  await p.click('#compte-mdp-zone button[type=submit]'); await p.waitForTimeout(500);
  t((await p.locator('#compte-mdp-zone .auth-msg').innerText()).includes('incorrect'), 'ancien mot de passe faux refusé');
  await p.fill('#compte-actuel', 'Bonne-phrase42'); await p.fill('#compte-nouveau', 'Nouveau-mdp77'); await p.fill('#compte-confirm', 'Nouveau-mdp77');
  await p.click('#compte-mdp-zone button[type=submit]'); await p.waitForTimeout(500);
  t(st.puts.includes('Nouveau-mdp77'), 'mot de passe changé côté serveur');

  /* 7. export puis suppression */
  const [dl] = await Promise.all([p.waitForEvent('download'), p.evaluate(() => window._SB.exportData())]);
  t(/mes_donnees_suivi_/.test(dl.suggestedFilename()), 'export JSON proposé');
  await p.evaluate(() => window._SB.deleteAccount()); await p.waitForTimeout(600);
  t(st.rpcs.some((x) => x[0] === 'delete_user'), 'suppression de compte demandée');
  t((await p.locator('#ft-auth-label').innerText()).includes('Connexion'), 'déconnecté après suppression');

  /* 8. ancien compte e-mail : identifiant envoyé tel quel */
  st.users['ancien@exemple.fr'] = { id: 'u9', email: 'ancien@exemple.fr', pw: 'Ancien-mdp1!' };
  await p.evaluate(() => openModal('authModal'));
  await p.fill('#compte-id', 'ancien@exemple.fr'); await p.fill('#compte-mdp', 'Ancien-mdp1!');
  await p.click('#auth-zone button[type=submit]'); await p.waitForTimeout(600);
  t((await p.locator('#ft-auth-label').innerText()).includes('Connecté'), 'ancien compte e-mail accepté');
  await p.evaluate(() => window._SB.logout()); await p.waitForTimeout(300);
  await p.evaluate(() => openModal('authModal'));
  await p.fill('#compte-id', 'ancien@exemple.fr'); await p.fill('#compte-mdp', 'faux');
  await p.click('#auth-zone button[type=submit]'); await p.waitForTimeout(500);
  t((await p.locator('.auth-msg').first().innerText()).includes('incorrect'), 'mauvais mot de passe : message clair');
  await p.click('text=Mot de passe oublié ?'); await p.fill('#compte-id', 'pseudoquelconque'); await p.click('text=Mot de passe oublié ?');
  t((await p.locator('.auth-msg').first().innerText()).includes('responsable'), 'oubli sur compte à pseudo : renvoi au responsable');

  t(st.externes.length === 0, 'aucune requête vers un site externe : ' + st.externes.join(','));
  t(st.erreurs.length === 0, 'aucune erreur console : ' + st.erreurs.join(' | '));
  console.log(ok + ' réussis, ' + ko + ' échecs'); await b.close(); process.exit(ko ? 1 : 0);
})();
