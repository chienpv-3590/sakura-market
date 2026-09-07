import type { SupabaseClient } from "@supabase/supabase-js";
import { requireUser } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { todayJst } from "@/lib/db/business-date";
import { PIPELINE_STAGES } from "@/components/pipeline/pipeline-stage-config";
import { resolvePipelineStageValue } from "@/components/pipeline/resolve-stage-value";
import { StageCard } from "@/components/pipeline/stage-card";

const GLOSSARY_KEYS = [
  "term.aitai",
  "term.seri",
  "term.mekiki",
  "term.incentive",
  "term.kyoka",
  "term.shounin",
] as const;

// Pipeline dashboard: one tile per business stage, left-to-right in flow
// order, each linking to its screen with a live count (or a lock/pending
// state) queried straight from the database for the signed-in role.
export default async function HomePage() {
  const [user, locale] = await Promise.all([requireUser(), getLocale()]);
  const dict = await getDictionary(locale, ["common"]);
  const supabase: SupabaseClient<Database> = await createClient();
  const today = todayJst();

  const values = await Promise.all(
    PIPELINE_STAGES.map((stage) => resolvePipelineStageValue(supabase, stage, user.role, today)),
  );

  return (
    <div className="space-y-10">
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
          {dict["home.pipelineTitle"] ?? "home.pipelineTitle"}
        </h2>
        <p className="mt-1 text-sm text-zinc-600">
          {dict["home.pipelineSubtitle"] ?? "home.pipelineSubtitle"}
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PIPELINE_STAGES.map((stage, index) => (
            <StageCard
              key={stage.id}
              titleKey={stage.titleKey}
              href={stage.href}
              value={values[index]}
              allowedRoles={stage.allowedRoles}
            />
          ))}
        </div>
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
