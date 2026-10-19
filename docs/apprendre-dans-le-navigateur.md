# Apprendre dans le navigateur

Deux façons de faire les exercices sans rien installer :

| | StackBlitz | GitHub Codespaces |
|---|---|---|
| Compte | aucun | compte GitHub |
| Démarrage | environ 1 minute | 5 minutes la première fois |
| Workspaces | `ng18` | `ng14`, `ng16`, `ng18` |
| Idéal pour | coder un exercice tout de suite | le tableau de score complet |

## Coder en live avec StackBlitz

Cliquez sur un exercice : StackBlitz ouvre `ng18` avec le fichier à compléter,
installe les dépendances, puis lance les tests des exercices. Les résultats
Jasmine s'affichent dans l'onglet d'aperçu et **se relancent à chaque
sauvegarde** (`Ctrl+S`).

| Leçon | Exercice |
|---|---|
| 01 Composants | [task-badge](https://stackblitz.com/github/smayros-dev/angular-cheat-sheet/tree/main/ng18?file=src/app/exercises/components/task-badge.component.ts) · [task-panel](https://stackblitz.com/github/smayros-dev/angular-cheat-sheet/tree/main/ng18?file=src/app/exercises/components/task-panel.component.ts) |
| 02 Directives & pipes | [task-status pipe](https://stackblitz.com/github/smayros-dev/angular-cheat-sheet/tree/main/ng18?file=src/app/exercises/pipes/task-status.pipe.ts) · [task-list](https://stackblitz.com/github/smayros-dev/angular-cheat-sheet/tree/main/ng18?file=src/app/exercises/components/task-list.component.ts) |
| 03 Services & DI | [task-store](https://stackblitz.com/github/smayros-dev/angular-cheat-sheet/tree/main/ng18?file=src/app/exercises/services/task-store.service.ts) |
| 04 RxJS & async | [task-feed](https://stackblitz.com/github/smayros-dev/angular-cheat-sheet/tree/main/ng18?file=src/app/exercises/services/task-feed.service.ts) |
| 05 Formulaires | [task-form](https://stackblitz.com/github/smayros-dev/angular-cheat-sheet/tree/main/ng18?file=src/app/exercises/components/task-form.component.ts) |
| 06 Routing | [guard](https://stackblitz.com/github/smayros-dev/angular-cheat-sheet/tree/main/ng18?file=src/app/exercises/routing/can-activate-tasks.guard.ts) · [routes](https://stackblitz.com/github/smayros-dev/angular-cheat-sheet/tree/main/ng18?file=src/app/exercises/routing/task.routes.ts) · [session](https://stackblitz.com/github/smayros-dev/angular-cheat-sheet/tree/main/ng18?file=src/app/exercises/routing/session.service.ts) · [login](https://stackblitz.com/github/smayros-dev/angular-cheat-sheet/tree/main/ng18?file=src/app/exercises/routing/login.component.ts) |
| 07 Signals | [task-stats](https://stackblitz.com/github/smayros-dev/angular-cheat-sheet/tree/main/ng18?file=src/app/exercises/signals/task-stats.service.ts) |

- L'aperçu montre tous les exercices : au départ tout est rouge (38 tests).
  Repérez la section de votre exercice ; elle passe au vert quand il est
  terminé.
- Pour voir l'application TaskBoard, ouvrez un second terminal et lancez
  `npm start`.
- Votre code vit dans votre navigateur. Pour le garder, cliquez sur **Fork**
  (compte StackBlitz requis).

> Pourquoi les tests tournent dans l'aperçu : Karma a besoin d'un vrai
> navigateur. StackBlitz n'en a pas côté serveur, donc `npm run test:web`
> (`ng18/karma.web.conf.js`) lance Karma sans navigateur, et c'est l'onglet
> d'aperçu qui exécute les tests.

## Environnement complet avec GitHub Codespaces

Un VS Code complet, déjà installé, sans rien mettre sur votre ordinateur.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/smayros-dev/angular-cheat-sheet?quickstart=1)

### Ce qui est prêt à l'ouverture

Au premier démarrage (environ 5 minutes, une seule fois), l'environnement
installe :

- Node 16, 18 et 20 (via nvm), la bonne version pour chaque workspace ;
- Google Chrome, pour les tests Karma ;
- les dépendances de `ng14`, `ng16` et `ng18`.

Ensuite, l'ouverture prend quelques secondes.

> **Coût :** un compte GitHub gratuit inclut environ 60 heures de Codespaces
> (machine à 2 cœurs) par mois. Arrêtez le codespace quand vous avez fini
> (menu *Codespaces → Stop current codespace*) ; il s'arrête aussi tout seul
> après 30 minutes d'inactivité.

### Faire un exercice

Dans le terminal intégré (`Ctrl+ù` ou *Terminal → New Terminal*) :

```bash
cd ng16
nvm use 18
npx ng test --browsers=ChromeHeadlessCI --include='src/app/exercises/pipes/**/*.spec.ts'
```

1. Ouvrez `ng16/src/app/exercises/pipes/task-status.pipe.ts` dans l'explorateur.
2. Modifiez le code et sauvegardez (`Ctrl+S`).
3. Les tests se relancent automatiquement dans le terminal. L'exercice est
   terminé quand vous voyez `TOTAL: 4 SUCCESS`.

Versions de Node à utiliser :

| Workspace | Commande |
|---|---|
| `ng14` | `nvm use 16` |
| `ng16` | `nvm use 18` |
| `ng18` | `nvm use 20` |

Tableau de score complet (tous les workspaces, chacun avec sa version de Node) :

```bash
node tools/run.mjs test all
```

### Lancer l'application

```bash
cd ng16
nvm use 18
npm run start:web
```

Codespaces ouvre automatiquement un aperçu du port **4200**. Sinon, ouvrez
l'onglet **Ports** et cliquez sur l'icône 🌐 de la ligne *TaskBoard (ng serve)*.

> Utilisez `npm run start:web` et non `npm start` : dans Codespaces, la page
> arrive par une adresse `…app.github.dev` que `ng serve` refuserait par
> défaut (*Invalid Host header*).

### Sauvegarder votre travail

Votre code reste dans le codespace tant que vous ne le supprimez pas. Pour le
garder sur GitHub :

```bash
git switch -c mes-solutions
git add -A && git commit -m "Mes solutions"
git push -u origin mes-solutions
```

Si vous n'avez pas les droits d'écriture sur le dépôt, Codespaces propose de
créer un *fork* au moment du `push`.

### Autre option : VS Code + Docker sur votre PC

La même configuration (`.devcontainer/`) fonctionne en local avec l'extension
**Dev Containers** de VS Code. Démarrez Docker, ouvrez le dossier, puis
choisissez *Reopen in Container*.
