# Comment améliorer ce projet

État au 18/10/2026 : les outils, `ng14`, `ng16`, `ng18`, la CI et le
déploiement GitHub Pages fonctionnent, et la CI est verte sur `main`. Cette
page liste les améliorations possibles, classées par priorité, avec pour
chacune l'effort estimé et le gain attendu. Pour utiliser le projet, voir le
[guide d'utilisation](guide-utilisation.md).

Légende de l'effort : **S** = moins d'une heure, **M** = une demi-journée,
**L** = plusieurs jours.

## Priorité 1 : terminer le cours (le cœur du projet)

Sans contenu, le cours n'est pas encore utilisable par un apprenant. Ces
points viennent du
[plan d'implémentation](superpowers/plans/2026-10-15-angular-versions-course.md)
(tâches 8 à 24).

| # | Amélioration | Effort | Pourquoi |
|---|---|---|---|
| 1.1 | **Écrire les 7 leçons** (`lessons/*.md`, tâches 12–14) | L | Ce sont encore des squelettes d'une ligne, alors que les exercices y renvoient (`// TODO … see lessons/…`) |
| 1.2 | **Créer la branche `solutions`** pour ng16 et ng18 (tâche 22) | M | Permet à l'apprenant de comparer ; la CI est déjà prête, le tableau de score y devient bloquant |
| 1.3 | **Workspace `ng20`** avec Vitest et `linkedSignal` (tâches 8–9) | L | Couvre l'ère `resource()` / `httpResource()` ; nécessite Node 22 (`nvm install 22`) |
| 1.4 | **Workspace `ng22`** avec Signal Forms et OnPush par défaut (tâches 10–11) | L | L'aboutissement du cours ; nécessite Node 24 |
| 1.5 | **Lecteur `lessons.html`** hors ligne (tâche 15) | M | `lessons-data.js` est déjà généré mais rien ne l'affiche |
| 1.6 | **Diagrammes par version et par concept, plus la galerie `index.html`** (tâches 16–20) | M | Le design en prévoit 14 ; 2 existent aujourd'hui |

Ajout de `ng20` / `ng22` : il faudra aussi ajouter leurs lignes dans la
matrice de `ci.yml` et `deploy.yml`, ainsi que dans `.github/pages/index.html`.

## Priorité 2 : petites améliorations rapides (quick wins)

| # | Amélioration | Effort | Pourquoi |
|---|---|---|---|
| 2.1 | **Désactiver les statistiques Angular CLI** : `"cli": { "analytics": false }` dans chaque `angular.json` | S | Lancer `ng serve` pose une question puis modifie `angular.json` (constaté sur `ng16`) : fichier modifié par erreur, invite bloquante |
| 2.2 | **Dependabot** pour les GitHub Actions (et npm en sécurité seulement, sans montée de version majeure) | S | Les versions d'actions (`checkout@v5`, `deploy-pages@v4`…) vieillissent ; chaque workspace doit rester sur sa version majeure d'Angular |
| 2.3 | **Résumé du tableau de score dans la CI** : nombre d'exercices réussis par leçon dans le *job summary* | M | Aujourd'hui il faut lire les logs pour savoir combien d'exercices passent |
| 2.4 | **Filtre dans `run.mjs`** : `node tools/run.mjs test ng16 --only exercises/pipes` | S | Évite de taper la longue commande `npx ng test --include=…` du guide |
| 2.5 | **Gabarits GitHub** : modèle de PR et d'issue (*bug*, *exercice incorrect*) | S | Contributions plus homogènes |
| 2.6 | **Traduire le README ou le relier au guide** : il est en anglais, ce guide est en français | S | Un seul point d'entrée cohérent pour le public visé |

## Priorité 3 : qualité et robustesse

| # | Amélioration | Effort | Pourquoi |
|---|---|---|---|
| 3.1 | **Vérifier l'idiome de chaque version dans la CI** : refuser `@if` / `@for` dans `ng14`/`ng16`, et `*ngIf` / `*ngFor` dans le `taskboard/` de `ng18` | S | C'est une règle centrale du cours (« Review Focus 4 » du plan), aujourd'hui vérifiée à la main |
| 3.2 | **Vérifier que les specs d'exercices sont identiques** entre `ng16` et `ng18` (`diff -r` en CI) | S | La règle « tests verbatim » est facile à casser par inadvertance |
| 3.3 | **Lint** : ESLint (`@angular-eslint`) et Prettier par workspace | M | Style homogène, erreurs détectées avant les tests |
| 3.4 | **Rapport de couverture** (`karma-coverage` est déjà installé), publié comme artefact CI | S | Visualiser ce que les tests couvrent réellement |
| 3.5 | **Tests de `tools/*.mjs`** avec `node --test` (`parseArgs`, `resolveNode`, normalisation des leçons) | M | Les outils ne sont vérifiés que manuellement |
| 3.6 | **Liens profonds sur GitHub Pages** : `/ng16/login` rechargé revient à l'accueil de l'app | M | Passer en `withHashLocation()` pour la version publiée, ou générer une redirection qui conserve le chemin |

## Priorité 4 : sécurité et maintenance

| # | Amélioration | Effort | Pourquoi |
|---|---|---|---|
| 4.1 | **Documenter que ng14, ng16 et ng18 sont en fin de vie (EOL)** | S | Angular 19 et les versions antérieures ne reçoivent plus de correctifs ; `npm audit` signale des vulnérabilités (voir ci-dessous). Acceptable pour un cours, à ne pas déployer en production |
| 4.2 | **Prévoir la fin du support de Node 16 et 18 dans la CI** | M | `actions/setup-node` peut cesser de les fournir ; alternative : conteneurs `node:16` / `node:18` dans la matrice |
| 4.3 | **Épingler les actions par SHA** plutôt que par tag (`actions/checkout@<sha>`) | S | Bonne pratique contre la compromission de la chaîne d'approvisionnement ; Dependabot (2.2) les met à jour |

Résultat de `npm audit` par workspace (18/10/2026) :

| Workspace | Critique | Haute | Modérée | Faible | Total |
|---|---|---|---|---|---|
| `ng14` | 2 | 34 | 35 | 3 | 74 |
| `ng16` | 2 | 38 | 19 | 7 | 66 |
| `ng18` | 2 | 39 | 16 | 7 | 64 |

Prochaine étape : lancer `npm audit --omit=dev` pour distinguer ce qui est
livré dans l'application publiée de ce qui ne concerne que l'outillage de
build et de test. Ensuite, appliquer les correctifs **sans** changer de
version majeure d'Angular (`npm audit fix`, jamais `--force`, qui casserait
le principe « une version par workspace »).

## Ordre conseillé

1. **Quick wins** (2.1, 2.2, 3.1, 3.2), une PR chacun : peu d'effort, et ils
   protègent tout le reste.
2. **Leçons 01–03 et solutions ng16/ng18** (1.1, 1.2) : rend le cours
   utilisable de bout en bout.
3. **`ng20` puis `ng22`** (1.3, 1.4), en ajoutant la CI et le déploiement de
   chacun.
4. **Lecteur de leçons et diagrammes** (1.5, 1.6).
5. Le reste au fil de l'eau.

Chaque amélioration suit le flux habituel : une branche depuis `main`, une PR,
une CI verte, puis une fusion avec merge commit (voir le
[guide, §9](guide-utilisation.md#9-contribuer--branches-et-pull-requests)).
