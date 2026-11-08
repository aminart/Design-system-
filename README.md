# Night Navy — design system commun

Feuille de style commune à SpecGen, AuditErgo et DocAnalyser : la palette claire de SpecGen et son mode sombre « Night Navy », sous les mêmes noms de variables.

| Fichier | Rôle |
|---|---|
| `night-navy.css` | Les jetons (`--nn-*`) en clair et en sombre, la base de page et quelques classes `nn-` (bouton, champ, carte, pastille). Fonctionne sans Tailwind. |
| `tailwind-v3-preset.js` | Branchement Tailwind v3 : SpecGen, DocAnalyser. |
| `tailwind-v4.css` | Branchement Tailwind v4 : AuditErgo. |
| `theme-toggle.js` | Bascule clair / sombre, mémorisée dans le navigateur. |
| `exemple.html` | Page de démonstration : ouvrir dans un navigateur. |

Version : 1.1.0.

## Choix du thème

Sur la balise `<html>` :

| Attribut | Résultat |
|---|---|
| aucun | suit le réglage du système |
| `data-theme="light"` | clair forcé |
| `data-theme="dark"` | sombre forcé |

`theme-toggle.js` pose cet attribut et retient le choix. À charger dans `<head>`, avant le CSS, pour éviter un flash de la mauvaise couleur au chargement. Ensuite : `NightNavy.toggle()`, `NightNavy.set("dark" | "light" | null)`, `NightNavy.current()`. L'évènement `nn-themechange` est émis sur `<html>` à chaque changement, pour qu'un composant React se mette à jour.

C'est le même mécanisme que celui d'AuditErgo : son bouton actuel continue de fonctionner.

## Les jetons

| Jeton | Usage | Clair | Sombre |
|---|---|---|---|
| `--nn-bg` | fond de page | `#F5F6F9` | `#0A0C16` |
| `--nn-surface` | panneaux, cartes | `#FFFFFF` | `#111427` |
| `--nn-surface-2` | zones en retrait, en-têtes de tableau | `#F7F8FE` | `#171A30` |
| `--nn-surface-3` | survol | `#F2F3F8` | `#1F2340` |
| `--nn-line` / `--nn-line-strong` | bordures | `#E2E4EC` / `#D5D8E3` | `#262A45` / `#343A5C` |
| `--nn-ink` | titres, texte principal | `#1B1D2A` | `#EDEFF8` |
| `--nn-ink-muted` / `--nn-ink-subtle` | descriptions, aides | `#4A4E61` / `#5A5F73` | `#A0A6C2` / `#858CAD` |
| `--nn-accent` | liens, onglet actif | `#0F1D96` | `#8E9BFF` |
| `--nn-primary` | bouton principal | `#0F1D96` | `#4B5BEF` |
| `--nn-accent-soft` / `--nn-accent-ink` | sélection, bouton doux | `#EEF0FB` / `#0F1D96` | `#1B2152` / `#C3CAFF` |
| `--nn-success`, `--nn-warning`, `--nn-danger` (+ `-soft`, `-text`) | états | | |
| `--nn-ia` / `--nn-ia-soft` | propositions de l'IA | `#6B4FA3` / `#EFEAF8` | `#C2AEF5` / `#251E3D` |

La liste complète est en tête de `night-navy.css`. Les contrastes du mode sombre ont été calculés : texte principal 15,9:1, texte le plus discret 5,2:1, bouton principal 5,2:1. Tout est au-dessus du minimum de 4,5:1.

**Règle d'usage** : `accent` sert au texte et aux traits, `primary` au fond des boutons. En clair ils sont identiques (le marine de SpecGen), en sombre ils divergent pour rester lisibles.

## Installation par app

Dans le dossier du frontend de l'app :

```bash
npm install --save-dev github:aminart/Design-system-#v1.1.0
```

Le paquet s'appelle `night-navy` : les fichiers sont ensuite importés depuis `night-navy/…`. Le numéro après `#` fige la version : une app ne change pas de style tant qu'on ne met pas à jour ce numéro.

### SpecGen (Tailwind v3)

`frontend/tailwind.config.js` :

```js
import typography from "@tailwindcss/typography";
import nightNavy from "night-navy/tailwind-v3-preset";

export default {
  presets: [nightNavy],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  plugins: [typography],
};
```

Retirer l'ancien bloc `colors` : le preset redonne `navy`, `ink`, `line`, `ground` et `success` sous les mêmes noms, branchés sur les variables. En haut de `src/index.css` : `@import "night-navy/night-navy.css";`.

À reprendre ensuite, écran par écran :

- `text-navy` sur du texte → `text-accent` (en sombre, `navy` suit le bouton, trop foncé pour du texte) ;
- `bg-white` → `bg-surface`, `hover:bg-[#F2F3F8]` → `hover:bg-surface-3` ;
- les couleurs écrites en dur (`#…`), environ 60.

### DocAnalyser (Tailwind v3)

Même preset. Ses variables `--ad-*` peuvent pointer vers les jetons communs dans `src/theme.css`, ce qui évite de toucher aux classes :

```css
:root {
  --ad-ink: var(--nn-ink);
  --ad-page: var(--nn-bg);
  --ad-line: var(--nn-line);
  --ad-accent: var(--nn-primary);
  --ad-accent-soft: var(--nn-accent-soft);
  /* … */
}
```

Puis remplacer les `bg-white` et les couleurs écrites en dur, environ 120.

### AuditErgo (Tailwind v4)

`web/src/index.css` :

```css
@import "tailwindcss";
@import "night-navy/night-navy.css";
@import "night-navy/tailwind-v4.css";
```

Ses variables actuelles (`--fond`, `--surface`, `--marque`…) peuvent être rebranchées une à une sur les jetons (`--fond: var(--nn-bg);`). Les couleurs métier restent dans l'app : l'échelle de gravité et les graphiques.

## Sans Tailwind

Avec les fichiers copiés à côté de la page :

```html
<script src="theme-toggle.js"></script>
<link rel="stylesheet" href="night-navy.css">

<button class="nn-btn nn-btn-primary">Générer</button>
<span class="nn-chip nn-chip-success">LLM connecté</span>
```

## En-tête d'app et titre de page (1.1.0)

Toutes les apps de la suite ont le **même en-tête**, en trois zones toujours dans cet ordre :

1. **Identité** : icône de l'app (32 px) et son nom ;
2. **Navigation** : onglets soulignés, l'onglet actif en bleu marine (`aria-current="page"`) ;
3. **Utilitaires**, dans cet ordre : aide, langue (FR / EN), thème, réglages.

**Seule l'icône a sa couleur propre** : tout le reste (onglet actif, boutons, pastilles) suit les jetons. Une
nouvelle app n'a qu'une icône à fournir.

```html
<header class="nn-appbar">
  <a class="nn-appbar-brand" href="#/"><img class="nn-appbar-icon" src="icone.svg" alt=""> SpecGen</a>
  <nav class="nn-appbar-nav" aria-label="Navigation">
    <a class="nn-appbar-tab" aria-current="page" href="#/">Accueil</a>
    <a class="nn-appbar-tab" href="#/contexte">Créer un contexte</a>
  </nav>
  <div class="nn-appbar-tools">
    <button class="nn-icon-btn" aria-label="Aide">…</button>
    <div class="nn-segmented" role="group" aria-label="Langue">
      <button aria-pressed="true">FR</button><button aria-pressed="false">EN</button>
    </div>
    <button class="nn-icon-btn" aria-label="Changer de thème" onclick="NightNavy.toggle()">…</button>
    <button class="nn-icon-btn" aria-label="Réglages">…</button>
  </div>
</header>
```

Un onglet qui est un `<button>` prend la classe `is-active`. Sous 760 px de large, la navigation passe sur une
deuxième ligne et défile. Une app sans langue ou sans aide omet simplement l'élément, sans changer l'ordre des autres.

**Titre de page**, aligné à gauche :

```html
<div class="nn-page-head">
  <div>
    <h1 class="nn-page-title">Nouvelle analyse</h1>
    <p class="nn-page-subtitle">Importez vos documents, choisissez comment les lire…</p>
  </div>
  <button class="nn-btn nn-btn-secondary">Action de la page</button>
</div>
```

## Police

Aucune police n'est téléchargée, pour que les apps fonctionnent hors ligne. Roboto est utilisée si elle est installée sur le poste ou fournie par l'app, sinon Arial. Pour l'embarquer partout, ajouter les fichiers Roboto dans le dossier et un `@font-face`.

## Publier une nouvelle version

1. Modifier `night-navy.css` : une couleur sombre s'écrit **dans les deux blocs sombres** (préférence système et `data-theme="dark"`).
2. Vérifier avec `exemple.html`, en clair et en sombre.
3. Augmenter `version` dans `package.json`, noter le changement dans `CHANGELOG.md`.
4. Committer, puis poser l'étiquette : `git tag v1.1.0 && git push --tags`.
5. Dans chaque app, quand on le souhaite : `npm install --save-dev github:aminart/Design-system-#v1.1.0`.

Dans React, la bascule s'importe dans `main.tsx` : `import "night-navy/theme-toggle";`, puis `window.NightNavy.toggle()` sur le bouton.
