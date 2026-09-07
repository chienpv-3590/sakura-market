import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The design system's page composition, ported whole:
 *
 *   <PageHeader/>                        flush white band, its own 24/32 pad
 *   <div style={padding:"20px 32px"}>    the content region
 *
 * (see ui_kits/cacao-platform/PropertyListScreen.jsx). The band is why the
 * 56px topheader has something to sit on instead of floating over grey, and
 * it is the only place a screen title is allowed to live -- so every screen
 * in the app puts its title in the same place, at the same size.
 *
 * `status` sits on the title line (a lot's state next to its code); `meta`
 * runs under it (secondary facts); `actions` is right-aligned (the primary
 * write action, or the handoff caption that replaces it for a role that may
 * not perform it).
 *
 * Server Component: no hooks, so a page passes already-translated strings.
 */
export function PageFrame({
  title,
  description,
  backHref,
  backLabel,
  status,
  actions,
  meta,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  backHref?: string;
  backLabel?: string;
  status?: ReactNode;
  actions?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <div className="cds-pageheader">
        {backHref && backLabel && (
          <Link href={backHref} className="cds-pageheader__back">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            {backLabel}
          </Link>
        )}
        <div className="cds-pageheader__row">
          <div className="cds-pageheader__titlewrap">
            <div className="cds-pageheader__titleline">
              <h1 className="cds-pageheader__title">{title}</h1>
              {status}
            </div>
            {description && <div className="cds-pageheader__desc">{description}</div>}
          </div>
          {actions && <div className="cds-pageheader__actions">{actions}</div>}
        </div>
        {meta && <div className="cds-pageheader__meta">{meta}</div>}
      </div>
      <div className="cds-shell__page">{children}</div>
    </>
  );
}
