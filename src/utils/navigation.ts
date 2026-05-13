// Custom event used for client-side navigation hooks. Keep this consistent if
// you add listeners elsewhere in the app.
const NAVIGATION_EVENT = "template-portfolio:navigate";

type NavigationListener = (path: string) => void;

type NavigationEvent = CustomEvent<string>;

// ---------------------------------------------------------------------------
// BASE PATH HANDLING
// ---------------------------------------------------------------------------
// When the app is served from a sub-path (e.g. /Portf/ on GitHub Pages) every
// URL reported by the browser includes that prefix, so window.location.pathname
// looks like "/Portf/privacy-policy" instead of just "/privacy-policy".
//
// Vite embeds the configured base (set via VITE_BASE_URL at build time) into
// import.meta.env.BASE_URL, so we read it here to strip the prefix before
// matching routes and re-apply it before calling history.pushState.
//
// Template users: you do NOT need to change anything in this file.
//   • Deploying to a root domain?  Leave VITE_BASE_URL unset.  BASE_PATH will
//     be "" and both stripBasePath / addBasePath are transparent no-ops.
//   • Deploying to a sub-path?  Set VITE_BASE_URL in your build command or CI
//     environment (see vite.config.ts and package.json for details).  This file
//     picks it up automatically through import.meta.env.BASE_URL.
// ---------------------------------------------------------------------------
const BASE_PATH = (() => {
  const base = import.meta.env.BASE_URL ?? "/";
  // Normalize to a prefix without trailing slash so it can be stripped cleanly.
  // e.g. "/Portf/" → "/Portf",  "/" → ""
  return base === "/" ? "" : base.replace(/\/$/, "");
})();

function isWindowAvailable() {
  return typeof window !== "undefined";
}

function stripTrailingSlashes(value: string) {
  let end = value.length;
  while (end > 1 && value.charCodeAt(end - 1) === 47) {
    end -= 1;
  }
  return end === value.length ? value : value.slice(0, end);
}

function normalizePath(path: string): string {
  if (!path) return "/";
  const prefixed = path.startsWith("/") ? path : `/${path}`;
  if (prefixed === "/") return "/";
  return stripTrailingSlashes(prefixed) || "/";
}

/** Strip the deployment base path and return an app-relative pathname.
 *  e.g. with BASE_PATH="/Portf":  "/Portf/privacy-policy" → "/privacy-policy"
 *  If no base path is set this is a transparent no-op.
 */
function stripBasePath(pathname: string): string {
  if (!BASE_PATH) return pathname;
  if (pathname === BASE_PATH || pathname === `${BASE_PATH}/`) return "/";
  if (pathname.startsWith(`${BASE_PATH}/`)) {
    return pathname.slice(BASE_PATH.length);
  }
  return pathname;
}

/** Prepend the deployment base path to an app-relative path before pushing to
 *  browser history.  e.g. with BASE_PATH="/Portf":  "/privacy-policy" →
 *  "/Portf/privacy-policy".  Transparent no-op when no base path is set.
 */
function addBasePath(path: string): string {
  if (!BASE_PATH) return path;
  const stripped = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${stripped}`;
}

export function getCurrentPath(): string {
  if (!isWindowAvailable()) return "/";
  return normalizePath(stripBasePath(window.location.pathname));
}

export function navigateTo(path: string) {
  if (!isWindowAvailable()) return;
  const normalized = normalizePath(path);
  const current = getCurrentPath();
  if (normalized === current) return;
  window.history.pushState({}, "", addBasePath(normalized));
  dispatchNavigation(normalized);
}

function dispatchNavigation(path: string) {
  if (!isWindowAvailable()) return;
  const event: NavigationEvent = new CustomEvent(NAVIGATION_EVENT, {
    detail: path,
  });
  window.dispatchEvent(event);
}

export function subscribeToNavigation(listener: NavigationListener) {
  if (!isWindowAvailable()) return () => undefined;
  const handler = (event: Event) => {
    const customEvent = event as NavigationEvent;
    const nextPath =
      typeof customEvent.detail === "string"
        ? customEvent.detail
        : getCurrentPath();
    listener(normalizePath(nextPath));
  };

  window.addEventListener(NAVIGATION_EVENT, handler as EventListener);
  return () => {
    window.removeEventListener(NAVIGATION_EVENT, handler as EventListener);
  };
}

export function canUseClientNavigation() {
  if (!isWindowAvailable()) return false;
  return window.history.length > 1;
}

export function goBackOrNavigateHome() {
  if (!isWindowAvailable()) return;
  if (window.history.length > 1) {
    window.history.back();
    return;
  }
  navigateTo("/");
}

export { normalizePath };
