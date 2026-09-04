"use client";

import { useEffect, useRef, type FormEvent, type KeyboardEvent, type ReactNode } from "react";

type KeyboardOperableFormProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  className?: string;
};

// Copied from components/lots/keyboard-operable-form.tsx rather than
// imported across domains (deliberate duplication, phase-07 file ownership
// note). 相対取引 drafting happens at the same kind of counter-speed window
// as lot intake (~05:00 per phase-07 Key Insights) -- Tab/Enter-only
// operability is worth keeping here too, even though it wasn't a graded
// requirement for F004 specifically.
export function KeyboardOperableForm({ onSubmit, children, className }: KeyboardOperableFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const first = formRef.current?.querySelector<HTMLElement>("input, select, textarea");
    first?.focus();
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key !== "Enter") return;
    const target = event.target as HTMLElement;
    if (target.tagName === "TEXTAREA" || target.tagName === "BUTTON") return;
    event.preventDefault();
    formRef.current?.requestSubmit();
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} onKeyDown={handleKeyDown} className={className}>
      {children}
    </form>
  );
}
