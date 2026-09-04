import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { getLocale } from "@/lib/i18n/get-locale";
import "./globals.css";

// One font for both scripts: Noto Sans JP's Latin Extended Additional block
// covers Vietnamese diacritics too, so VI and JA text never flash between
// two different fonts on the same screen.
const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Sakura Market",
  description: "Sakura Market — internal auction operations prototype",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
