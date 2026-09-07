import type { SupabaseClient } from "@supabase/supabase-js";
import { requireUser } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/db/types";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { todayJst } from "@/lib/db/business-date";
import { PIPELINE_STAGES } from "@/components/pipeline/pipeline-stage-config";
import { resolvePipelineStageValue } from "@/components/pipeline/resolve-stage-value";
import { ProcessFlow } from "@/components/pipeline/process-flow";
import { PageFrame } from "@/components/layout/page-frame";

const GLOSSARY_KEYS = [
  "term.aitai",
  "term.seri",
  "term.mekiki",
  "term.incentive",
  "term.kyoka",
  "term.shounin",
] as const;

// Pipeline dashboard. The point of this screen is that a lot TRAVELS: it is
// drawn as a connected flow (ProcessFlow), not a grid of loose cards, so the
// order, the forks and the irreversible lock gate are visible before anything
// is read. Every node keeps a live count queried straight from the database
// for the signed-in role, and stays a link to its own screen.
export default async function HomePage() {
  const [user, locale] = await Promise.all([requireUser(), getLocale()]);
  const dict = await getDictionary(locale, ["common"]);
  const supabase: SupabaseClient<Database> = await createClient();
  const today = todayJst();

  const resolved = await Promise.all(
    PIPELINE_STAGES.map((stage) => resolvePipelineStageValue(supabase, stage, user.role, today)),
  );
  const values = Object.fromEntries(
    PIPELINE_STAGES.map((stage, index) => [stage.id, resolved[index]]),
  );

  return (
    <PageFrame
      title={dict["home.title"] ?? "home.title"}
      description={dict["home.welcome"] ?? "home.welcome"}
    >
      <div className="space-y-10">
        <div>
          <h2 className="cds-section-title">
            {dict["home.pipelineTitle"] ?? "home.pipelineTitle"}
          </h2>
          <p className="cds-field__msg cds-field__msg--hint mt-1">
            {dict["home.pipelineSubtitle"] ?? "home.pipelineSubtitle"}
          </p>
          <div className="mt-5">
            <ProcessFlow values={values} />
          </div>
        </div>

        <div>
          <h2 className="cds-section-title">
            {dict["home.glossaryTitle"] ?? "home.glossaryTitle"}
          </h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {GLOSSARY_KEYS.map((key) => (
              <li key={key} className="cds-tag">
                {dict[key] ?? key}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageFrame>
  );
}
