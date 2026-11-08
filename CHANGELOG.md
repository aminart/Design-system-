# Historique des versions

## 1.1.0 — 2026-11-08

- En-tête d'app commun : `nn-appbar` (identité, onglets, utilitaires), `nn-appbar-tab` (onglet actif en bleu
  marine), `nn-icon-btn`, `nn-segmented` (langue). Navigation sur une deuxième ligne sous 760 px.
- Titre de page aligné à gauche : `nn-page-head`, `nn-page-title`, `nn-page-subtitle`.
- Règle de la suite : seule l'icône d'une app a sa couleur, tout le reste suit les jetons.

## 1.0.0 — 2026-11-05

- Première version : jetons clair (palette de SpecGen) et sombre (Night Navy) sous les mêmes noms `--nn-*`.
- Branchements Tailwind v3 (preset) et v4 (`@theme inline`), variante `dark:` qui suit le système ou `data-theme`.
- Classes `nn-` sans Tailwind : bouton, champ, carte, pastille.
- `theme-toggle.js` : bascule clair / sombre mémorisée.
