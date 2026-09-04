import { LocaleSwitcher } from "./locale-switcher";

export function AppShellHeader() {
  return (
    <header className="flex items-center justify-end border-b border-zinc-200 px-6 py-3">
      <LocaleSwitcher />
    </header>
  );
}
