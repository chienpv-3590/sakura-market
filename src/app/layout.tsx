import type { Metadata } from "next";
import { Noto_Sans_JP, Roboto_Mono } from "next/font/google";
import { getLocale } from "@/lib/i18n/get-locale";
import "./globals.css";

// The design system asks for "Noto Sans JP" (--font-sans) and "Roboto Mono"
// (--font-mono); both are loaded here rather than named and hoped for, and
// globals.css prepends these variables to the token's declared stack.
//
// One sans for both scripts, so VI and JA text on the same screen never flash
// between two families. `vietnamese` is listed explicitly: Google serves the
// precomposed Vietnamese block (U+1EA0-1EF9, i.e. ạ ậ ệ ộ ợ ự and the tone
// marks on ă â đ ê ô ơ ư) as its own subset, NOT as part of latin-ext.
const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin", "latin-ext", "vietnamese"],
  display: "swap",
});

// Figures only -- codes, quantities, prices, dates. Latin subsets are enough;
// no Vietnamese prose is ever set in mono.
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sakura Market",
  description: "Sakura Market — internal auction operations prototype",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${notoSansJP.variable} ${robotoMono.variable} antialiased`}
    >
      {/* h-full + the shell's own `height:100%` grid is what lets .cds-shell__body
          own its scroll, so the dark rail and the topheader stay put. */}
      <body>{children}</body>
    </html>
  );
}
