import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/require-role";
import { REPORT_REGISTRY } from "@/lib/reports/registry";

// A1 (FR-RPT-01) -- SCR019 catalog. Static registry, no DB read: any active
// session may view which reports exist and whether each is real or mock.
export async function GET(): Promise<NextResponse> {
  await requireUser();
  const catalog = REPORT_REGISTRY.map((r) => ({
    code: r.code,
    titleKey: r.titleKey,
    frequencyKey: r.frequencyKey,
    filterDescriptionKey: r.filterDescriptionKey,
    isMock: r.isMock,
  }));
  return NextResponse.json(catalog);
}
