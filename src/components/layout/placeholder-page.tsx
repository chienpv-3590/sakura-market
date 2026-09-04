import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";

// Shared body for the 9 business-group placeholder pages (phase 05-09 will
// replace each page's content with real screens). Renders a real heading
// pulled from the `nav` dictionary — never lorem/placeholder text.
export async function PlaceholderPage({ titleKey }: { titleKey: string }) {
  const locale = await getLocale();
  const dict = await getDictionary(locale, ["nav"]);

  return (
    <section>
      <h1 className="text-2xl font-semibold text-zinc-900">{dict[titleKey] ?? titleKey}</h1>
    </section>
  );
}
