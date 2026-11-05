/**
 * Night Navy — choix du thème clair / sombre, mémorisé dans le navigateur.
 *
 * Sans choix enregistré, l'app suit le réglage du système.
 * À charger le plus tôt possible (dans <head>) pour éviter un flash de la mauvaise couleur :
 *   <script src="/night-navy/theme-toggle.js"></script>
 * Puis, sur un bouton : onclick="NightNavy.toggle()"
 * Depuis React : window.NightNavy.toggle(), window.NightNavy.current()  ("light" | "dark")
 */
(function () {
  var KEY = "nn-theme";
  var root = document.documentElement;

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function systemDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function current() {
    var forced = root.getAttribute("data-theme");
    if (forced === "light" || forced === "dark") return forced;
    return systemDark() ? "dark" : "light";
  }

  function set(theme) {
    if (theme === "light" || theme === "dark") root.setAttribute("data-theme", theme);
    else root.removeAttribute("data-theme");
    try {
      if (theme === "light" || theme === "dark") localStorage.setItem(KEY, theme);
      else localStorage.removeItem(KEY);
    } catch (e) { /* stockage indisponible : le choix vaut pour cette page seulement */ }
    root.dispatchEvent(new CustomEvent("nn-themechange", { detail: current() }));
  }

  function toggle() {
    set(current() === "dark" ? "light" : "dark");
  }

  var initial = saved();
  if (initial === "light" || initial === "dark") root.setAttribute("data-theme", initial);

  window.NightNavy = { current: current, set: set, toggle: toggle };
})();
