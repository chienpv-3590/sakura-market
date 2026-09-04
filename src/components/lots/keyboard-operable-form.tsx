"use client";

import { useEffect, useRef, type FormEvent, type KeyboardEvent, type ReactNode } from "react";

type KeyboardOperableFormProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  className?: string;
};

/**
 * NFR-USE-01: SCR004/SCR005 run at ~02:00-03:00 on the market floor -- every
 * field must be operable by Tab + Enter alone, no mouse. Native <form>
 * submit-on-Enter already covers single-line <input>s with a submit button
 * present, but this wrapper makes both guarantees explicit and independent
 * of field type: autofocus on the first focusable field on mount, and a
 * form-level Enter handler that calls requestSubmit() from any descendant
 * (except a <textarea>, which keeps Enter as a literal newline, and a
 * <button>, which already handles its own activation).
 */
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
