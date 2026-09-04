import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";

const GLOSSARY_KEYS = [
  "term.aitai",
  "term.seri",
  "term.mekiki",
  "term.incentive",
  "term.kyoka",
  "term.shounin",
] as const;

export default async function HomePage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale, ["common"]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">
          {dict["home.title"] ?? "home.title"}
        </h1>
        <p className="mt-1 text-sm text-zinc-600">
          {dict["home.welcome"] ?? "home.welcome"}
        </p>
      </div>
      <div>
        <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-500">
          {dict["home.glossaryTitle"] ?? "home.glossaryTitle"}
        </h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {GLOSSARY_KEYS.map((key) => (
            <li
              key={key}
              className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-800"
            >
              {dict[key] ?? key}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
