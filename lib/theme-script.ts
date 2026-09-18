/**
 * Runs before hydration so the theme is applied to <html> without a flash
 * of the wrong color scheme. Kept as a plain string (not a component) so it
 * can run synchronously from <head> via dangerouslySetInnerHTML.
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("martex-theme");
    var theme = stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
    var isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  } catch (e) {}
})();
`;
