# Historique des versions

## 1.2.1 — 2026-11-21

- Cases à cocher et boutons radio dans les apps Tailwind : le contour disparaissait (cases vides et radios),
  effacé par la remise à zéro de Tailwind (`* { border-width: 0 }`). Les sélecteurs passent de `:where(input…)`
  à `input:where(…)` : ils l'emportent sur cette remise à zéro.
- Plus de `margin: 0` imposé : l'alignement reste à l'app (`nn-check` garde le sien).
- README : comment faire une variante (couleur de l'IA) en Tailwind v4, dont les classes passent après le
  design system.

## 1.2.0 — 2026-11-21

- Cases à cocher et boutons radio : tous les `<input type="checkbox">` et `<input type="radio">` prennent le
  style Night Navy, sans classe à ajouter. 18 px, contour `ink-subtle`, coché en `primary` (coche blanche,
  point central pour le radio), état mixte, survol `accent`, anneau de focus, désactivé, clair et sombre.
  Sélecteurs à spécificité nulle : les classes de l'app gardent la main.
- `nn-check` : libellé à côté d'une case ou d'un radio, aligné sur la première ligne.

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
