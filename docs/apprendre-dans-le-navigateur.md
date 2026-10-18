# Apprendre dans le navigateur (GitHub Codespaces)

Faites les exercices **directement dans votre navigateur** : un VS Code complet,
déjà installé, sans rien mettre sur votre ordinateur.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/smayros-dev/angular-cheat-sheet?quickstart=1)

## Ce qui est prêt à l'ouverture

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

## Faire un exercice

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

## Lancer l'application

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

## Sauvegarder votre travail

Votre code reste dans le codespace tant que vous ne le supprimez pas. Pour le
garder sur GitHub :

```bash
git switch -c mes-solutions
git add -A && git commit -m "Mes solutions"
git push -u origin mes-solutions
```

Si vous n'avez pas les droits d'écriture sur le dépôt, Codespaces propose de
créer un *fork* au moment du `push`.

## Autre option : VS Code + Docker sur votre PC

La même configuration (`.devcontainer/`) fonctionne en local avec l'extension
**Dev Containers** de VS Code. Démarrez Docker, ouvrez le dossier, puis
choisissez *Reopen in Container*.
