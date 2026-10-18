# Guide d'utilisation — Angular Versions Course

Ce guide explique comment installer le projet, lancer l'application TaskBoard,
faire les exercices, exécuter les tests et contribuer. Pour la liste des
améliorations possibles, voir [ameliorations.md](ameliorations.md).

## Sommaire

1. [À quoi sert ce projet](#1-à-quoi-sert-ce-projet)
2. [Voir le résultat sans rien installer](#2-voir-le-résultat-sans-rien-installer)
3. [Installation](#3-installation)
4. [Lancer l'application TaskBoard](#4-lancer-lapplication-taskboard)
5. [Faire un exercice, pas à pas](#5-faire-un-exercice-pas-à-pas)
6. [Exécuter les tests](#6-exécuter-les-tests)
7. [Modifier les leçons](#7-modifier-les-leçons)
8. [CI/CD : ce qui tourne sur GitHub](#8-cicd--ce-qui-tourne-sur-github)
9. [Contribuer : branches et pull requests](#9-contribuer--branches-et-pull-requests)
10. [Dépannage](#10-dépannage)

---

## 1. À quoi sert ce projet

C'est un **cours de modernisation Angular**. La même petite application,
**TaskBoard** (liste de tâches, formulaire, connexion, page admin protégée),
est écrite dans le style propre à chaque version majeure :

| Dossier | Angular | Style illustré |
|---|---|---|
| `ng14/` | 14 | NgModules, guard en classe, `*ngIf` / `*ngFor`, injection par constructeur |
| `ng16/` | 16 | Composants standalone, `inject()`, guard fonctionnel, `signal()` / `computed()` |
| `ng18/` | 18 | Nouveau control flow `@if` / `@for` / `@let` / `@defer` |
| `ng20/`, `ng22/` | 20, 22 | *Prévus* : `linkedSignal`, `resource`, Vitest, Signal Forms |

Chaque dossier est un **workspace Angular indépendant** (son propre
`package.json` et ses propres `node_modules`). Il contient :

- `src/app/taskboard/` : l'application de **référence**, complète, dont tous
  les tests passent ;
- `src/app/exercises/` : des **exercices** à compléter. Leurs tests échouent
  tant que vous ne les avez pas implémentés : votre exécution de tests sert de
  **tableau de score**.

Le dossier `lessons/` contient les leçons en Markdown (encore des squelettes
pour l'instant), et `docs/diagrams/` deux diagrammes d'architecture.

## 2. Voir le résultat sans rien installer

Le projet est publié automatiquement sur GitHub Pages à chaque fusion dans
`main` :

- Page d'accueil : https://smayros-dev.github.io/angular-cheat-sheet/
- Les trois versions de l'application : `/ng14/`, `/ng16/`, `/ng18/`
- Les diagrammes : liens sur la page d'accueil

Ouvrez `/ng14/` et `/ng18/` dans deux onglets : le comportement est identique,
seul le code change. C'est tout le principe du cours.

## 3. Installation

### 3.1 Prérequis

| Outil | Pourquoi |
|---|---|
| **Git** | cloner le dépôt |
| **nvm** : [nvm-windows](https://github.com/coreybutler/nvm-windows) sous Windows, [nvm](https://github.com/nvm-sh/nvm) sous macOS/Linux | chaque workspace exige une version précise de Node |
| **Chrome** (ou Edge sous Windows) | les tests Karma tournent dans un navigateur headless |

Versions de Node nécessaires :

```bash
nvm install 16   # pour ng14
nvm install 18   # pour ng16
nvm install 20   # pour ng18
```

### 3.2 Cloner et installer les dépendances

```bash
git clone https://github.com/smayros-dev/angular-cheat-sheet.git
cd angular-cheat-sheet

nvm use 16 && cd ng14 && npm ci && cd ..
nvm use 18 && cd ng16 && npm ci && cd ..
nvm use 20 && cd ng18 && npm ci && cd ..
```

> Il n'y a **pas** de `package.json` à la racine : les versions d'Angular
> entreraient en conflit. Installez chaque workspace séparément, avec sa
> version de Node.

**Windows sans droits administrateur :** `nvm use` ne fonctionne pas sans
terminal élevé. Appelez alors directement le binaire de la bonne version, par
exemple pour `ng16` :

```powershell
cd ng16
& "$env:NVM_HOME\v18.20.8\node.exe" "$env:NVM_HOME\v18.20.8\node_modules\npm\bin\npm-cli.js" ci
```

(Adaptez `v18.20.8` à la version installée ; `nvm list` l'affiche.)

**Astuce :** à la première commande `ng`, Angular demande si vous acceptez
l'envoi de statistiques. Pour ne jamais voir la question (et ne pas modifier
`angular.json`), définissez une fois la variable d'environnement
`NG_CLI_ANALYTICS=false`.

## 4. Lancer l'application TaskBoard

```bash
nvm use 18
cd ng16
npm start            # = ng serve → http://localhost:4200
```

Même chose pour `ng14` (Node 16) ou `ng18` (Node 20). Un seul serveur à la
fois sur le port 4200, ou utilisez `npm start -- --port 4201`.

### Ce que vous pouvez essayer

| Action | Ce que ça montre |
|---|---|
| Ajouter une tâche avec le formulaire | Formulaire réactif typé : titre obligatoire, au moins 3 caractères, erreurs affichées après avoir quitté le champ |
| Observer « N of M done » | `TaskService.doneCount` : un getter en ng14, un `computed()` en ng16/ng18 |
| Aller sur `/admin` sans être connecté | Le guard redirige vers `/login` |
| Cliquer sur **Log in** | Connexion puis navigation vers `/admin` ; le lien *Admin* apparaît sur le tableau |
| Survoler une tâche ou y naviguer avec Tab | La directive `tbHighlight` |
| En ng18, le lien *Admin* | Chargé via `@defer (on viewport)`, avec un placeholder |

Pour comprendre l'architecture d'un coup d'œil, ouvrez
[docs/diagrams/taskboard-app/taskboard-app.html](diagrams/taskboard-app/taskboard-app.html)
dans un navigateur.

## 5. Faire un exercice, pas à pas

Exemple : le pipe `taskStatus` de la leçon 02, dans `ng16`.

1. **Lire la leçon** : `lessons/02-directives-pipes.md`.
2. **Regarder la référence** : `ng14/src/app/taskboard/pipes/status.pipe.ts`,
   puis sa version ng16.
3. **Lire le test**, c'est le cahier des charges :
   `ng16/src/app/exercises/pipes/task-status.pipe.spec.ts`.
4. **Ouvrir le stub** : `ng16/src/app/exercises/pipes/task-status.pipe.ts`.
   Il commence par `// TODO Angular 16 — see lessons/02-directives-pipes.md`.
5. **Implémenter** dans le style de la version visée (en ng16 : `*ngIf` dans
   les templates ; en ng18 : `@if`).
6. **Lancer uniquement les tests de cet exercice** (boucle rapide) :

   ```bash
   cd ng16
   npx ng test --watch=false --browsers=ChromeHeadless \
     --include='src/app/exercises/pipes/**/*.spec.ts'
   ```

   Ou en mode watch, pour relancer à chaque sauvegarde :

   ```bash
   npx ng test --include='src/app/exercises/pipes/**/*.spec.ts'
   ```

7. Quand c'est vert, passez à l'exercice suivant.

### Liste des exercices

| Leçon | Fichiers (sous `src/app/exercises/`) |
|---|---|
| 01 Composants & templates | `components/task-badge.component.ts`, `components/task-panel.component.ts` |
| 02 Directives & pipes | `pipes/task-status.pipe.ts`, `components/task-list.component.ts` |
| 03 Services & DI | `services/task-store.service.ts` |
| 04 RxJS & async | `services/task-feed.service.ts` |
| 05 Formulaires | `components/task-form.component.ts` |
| 06 Routing | `routing/session.service.ts`, `routing/can-activate-tasks.guard.ts`, `routing/task.routes.ts`, `routing/login.component.ts` |
| 07 Signals & détection de changements | `signals/task-stats.service.ts` |

Les tests sont **identiques** dans `ng16` et `ng18` : seul l'idiome de votre
solution change. Refaire le même exercice dans les deux versions est le
meilleur moyen de voir ce qui a évolué.

## 6. Exécuter les tests

### 6.1 Avec l'orchestrateur (recommandé)

`tools/run.mjs` lance chaque suite avec **la bonne version de Node**, sans
changer votre Node global :

```bash
node tools/run.mjs test ng16            # un workspace
node tools/run.mjs test all             # tous, continue même en cas d'échec
node tools/run.mjs test all --strict    # s'arrête au premier échec
node tools/run.mjs test all --dry-run   # affiche les commandes et vérifications, sans rien lancer
```

Le script trouve Node via `NVM_HOME` (nvm-windows) ou `NVM_DIR` (nvm-sh), et
vérifie avant de lancer que le workspace existe et que `node_modules` est
installé.

### 6.2 Lire le résultat

| Résultat | Signification |
|---|---|
| `ng14=pass` | Tout est vert (pas d'exercices en ng14) |
| `ng16=fail` avec ~38 échecs | **Normal** au départ : ce sont les tests des exercices |
| Un test `taskboard/` en échec | **Anormal** : l'application de référence est cassée |
| `ng20=fail … workspace missing` | Normal : ng20 et ng22 ne sont pas encore créés |

Pour ne lancer que l'application de référence (doit toujours être vert) :

```bash
npx ng test --watch=false --browsers=ChromeHeadless \
  --include='src/app/app.component.spec.ts' --include='src/app/taskboard/**/*.spec.ts'
```

## 7. Modifier les leçons

Les fichiers `lessons/*.md` sont la source de vérité. Après chaque
modification :

```bash
node tools/build-lessons.mjs
git add lessons lessons-data.js
```

- Le script refuse de générer le bundle s'il n'y a pas exactement 7 leçons, si
  une leçon ne commence pas par un titre `# `, ou si un fichier d'exercice
  référencé n'existe pas.
- Le résultat est déterministe : les fins de ligne CRLF et le BOM sont
  normalisés.
- La CI échoue si `lessons-data.js` n'est pas à jour : pensez à committer les
  deux fichiers ensemble.

## 8. CI/CD : ce qui tourne sur GitHub

| Workflow | Déclencheur | Rôle |
|---|---|---|
| **CI** (`.github/workflows/ci.yml`) | chaque PR, et chaque push sur `main`, `course-build` ou `solutions` | 1) Vérifie les outils et que `lessons-data.js` est à jour. 2) Pour chaque workspace, avec sa version de Node : `npm ci`, tests de référence (**bloquants**), tableau de score des exercices (**informatif**, sauf sur `solutions`), build de production. |
| **Deploy** (`.github/workflows/deploy.yml`) | push sur `main`, ou lancement manuel | Construit les 3 applications et publie le site GitHub Pages |

Suivre les exécutions :

- dans l'onglet **Actions** du dépôt ;
- ou en ligne de commande : `gh run list`, `gh pr checks <numéro>`,
  `gh run view <id> --log-failed`.

## 9. Contribuer : branches et pull requests

1. Partir de `main` à jour : `git switch main && git pull`.
2. Créer une branche : `git switch -c fix/ma-correction`.
3. Committer, pousser, puis ouvrir une PR :
   ```bash
   git push -u origin fix/ma-correction
   gh pr create --base main --fill
   ```
4. Attendre que la CI soit verte (`gh pr checks --watch`).
5. Fusionner avec **« Create a merge commit »**. La branche est ensuite
   supprimée automatiquement (option *Automatically delete head branches*
   activée).
6. En local : `git switch main && git pull && git fetch --prune`.

Règles du projet :

- Ne jamais modifier les tests des exercices dans un seul workspace : ils
  doivent rester **identiques** dans `ng16` et `ng18`.
- L'application `taskboard/` doit rester **verte** sur toutes les branches.
- Respecter l'idiome de chaque version : pas de `@if` en ng16, pas de `*ngIf`
  en ng18.

## 10. Dépannage

| Symptôme | Cause | Solution |
|---|---|---|
| `npm ci` : *package.json and package-lock.json are in sync* | Le lock a été généré avec une autre version de npm | Dans le workspace, avec **sa** version de Node : `npm install --package-lock-only`, puis committer le lock |
| `nvm use` : erreur, ou rien ne change | nvm-windows exige un terminal administrateur | Utiliser `node tools/run.mjs`, ou appeler le `node.exe` de la version directement (voir §3.2) |
| Karma : *No binary for ChromeHeadless* | Chrome est introuvable | Installer Chrome, ou définir `CHROME_BIN` vers `chrome.exe` / `msedge.exe` |
| Erreurs de syntaxe étranges au build | Mauvaise version de Node pour ce workspace | `node -v` : ng14 → 16, ng16 → 18, ng18 → 20 |
| `angular.json` modifié après `ng serve` (bloc `"cli": { "analytics": … }`) | Votre réponse à la question des statistiques a été enregistrée | `git checkout -- ngXX/angular.json`, puis définir `NG_CLI_ANALYTICS=false` |
| Port 4200 déjà utilisé | Un autre `ng serve` tourne | `npm start -- --port 4201` |
| Recharger `/ng16/login` sur GitHub Pages ramène à l'accueil de l'app | Pages ne sait pas servir les routes Angular | Comportement attendu : naviguer depuis l'application |
| `run.mjs` : *dependencies not installed* | `node_modules` absent | `npm ci` dans ce workspace, avec sa version de Node |
