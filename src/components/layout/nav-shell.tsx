"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";

// Port of the design system's AppShell.jsx + NavProvider: the single source of
// truth for whether the dark rail is expanded. The ONLY trigger is the toggle
// in the topheader; .cds-shell's grid and .cds-rolenav are both listeners.
//
// `sidebar` and `header` arrive as already-rendered Server Component elements
// (see app-shell.tsx). React context follows render position, not where an
// element was created, so both still read this provider.

const STORAGE_KEY = "sakura.nav.expanded";

// localStorage is an external store, so it is read as one. useSyncExternalStore
// renders the server snapshot (expanded) during hydration and swaps to the
// stored preference immediately after -- no hydration mismatch, and no
// setState-in-an-effect. The `storage` event also keeps two open tabs in step.
const navStore = {
  subscribe(onChange: () => void) {
    window.addEventListener("storage", onChange);
    navStore.local.add(onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      navStore.local.delete(onChange);
    };
  },
  local: new Set<() => void>(),
  getSnapshot(): boolean {
    try {
      return window.localStorage.getItem(STORAGE_KEY) !== "0";
    } catch {
      // Private browsing with storage denied: fall back to expanded.
      return true;
    }
  },
  getServerSnapshot(): boolean {
    return true;
  },
  write(expanded: boolean) {
    try {
      window.localStorage.setItem(STORAGE_KEY, expanded ? "1" : "0");
    } catch {
      // The preference just does not persist; the toggle still works.
    }
    for (const listener of navStore.local) listener();
  },
};

type NavState = { expanded: boolean; toggle: () => void };

const NavContext = createContext<NavState>({ expanded: true, toggle: () => {} });

export function useNavState(): NavState {
  return useContext(NavContext);
}

export function NavShell({
  sidebar,
  header,
  children,
}: {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
}) {
  const expanded = useSyncExternalStore(
    navStore.subscribe,
    navStore.getSnapshot,
    navStore.getServerSnapshot,
  );

  const toggle = useCallback(() => {
    navStore.write(!navStore.getSnapshot());
  }, []);

  const value = useMemo(() => ({ expanded, toggle }), [expanded, toggle]);

  // Sets the user's PREFERENCE, not the grid column. An inline custom
  // property outranks every stylesheet rule, so writing --nav-w here would
  // make the responsive collapse in cds-app-layout.css unreachable; that CSS
  // reads --nav-w-pref and overrides it below --bp-tablet.
  const style = {
    "--nav-w-pref": expanded ? "var(--sidebar-w)" : "var(--sidebar-w-collapsed)",
  } as CSSProperties;

  return (
    <NavContext.Provider value={value}>
      <div
        className={`cds-shell ${expanded ? "cds-shell--open" : "cds-shell--closed"}`}
        style={style}
      >
        <div className="cds-shell__nav" id="app-nav">
          {sidebar}
        </div>
        <div className="cds-shell__main">
          {header}
          {/* No padding here: every screen supplies its own PageFrame, whose
              header band is flush to the topheader and whose content region
              carries .cds-shell__page's padding -- the design system's own
              page composition. */}
          <div className="cds-shell__body">{children}</div>
        </div>
      </div>
    </NavContext.Provider>
  );
}
