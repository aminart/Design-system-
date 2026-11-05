/**
 * Night Navy — preset Tailwind v3 (SpecGen, Analyse documentaire).
 *
 * Dans tailwind.config.js :
 *   import nightNavy from "./night-navy/tailwind-v3-preset.js";
 *   export default { presets: [nightNavy], content: [...], ... };
 * et importer night-navy.css avant les directives @tailwind dans le CSS principal.
 *
 * Les couleurs pointent vers les variables CSS de night-navy.css : elles changent seules avec le thème.
 * Limite : les modificateurs d'opacité (bg-primary/50) ne fonctionnent pas avec des variables en v3 ;
 * utiliser les jetons « soft » à la place.
 */
const v = (name) => `var(--nn-${name})`;

export default {
  darkMode: ["variant", ['&:where([data-theme="dark"], [data-theme="dark"] *)', "@media (prefers-color-scheme: dark) { &:where(:root:not([data-theme=\"light\"]), :root:not([data-theme=\"light\"]) *) }"]],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "Arial", "system-ui", "sans-serif"],
        mono: ["Roboto Mono", "ui-monospace", "Consolas", "monospace"],
      },
      colors: {
        bg: v("bg"),
        surface: { DEFAULT: v("surface"), 2: v("surface-2"), 3: v("surface-3") },
        line: { DEFAULT: v("line"), strong: v("line-strong"), dashed: v("line-dashed") },
        ink: { DEFAULT: v("ink"), body: v("ink-body"), muted: v("ink-muted"), subtle: v("ink-subtle") },
        accent: { DEFAULT: v("accent"), soft: v("accent-soft"), softer: v("accent-softer"), ink: v("accent-ink"), muted: v("accent-muted") },
        primary: { DEFAULT: v("primary"), hover: v("primary-hover"), disabled: v("primary-disabled"), on: v("on-primary"), "on-disabled": v("on-primary-disabled") },
        success: { DEFAULT: v("success"), text: v("success-text"), soft: v("success-soft") },
        warning: { DEFAULT: v("warning"), text: v("warning-text"), soft: v("warning-soft"), line: v("warning-line") },
        danger: { DEFAULT: v("danger"), text: v("danger-text"), soft: v("danger-soft") },
        ia: { DEFAULT: v("ia"), soft: v("ia-soft") },
        focus: v("focus"),

        // Compatibilité SpecGen : les anciens noms restent valables pendant la migration.
        // bg-navy (boutons) suit le bouton principal ; pour du texte, passer à text-accent.
        navy: { DEFAULT: v("primary"), dark: v("primary-hover"), soft: v("accent-soft"), softer: v("accent-softer"), muted: v("accent-muted") },
        ground: v("bg"),
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "8px",
        md: "10px",
        lg: "14px",
      },
    },
  },
};
