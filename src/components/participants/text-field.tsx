import type { ChangeEvent } from "react";

export const INPUT_CLASS =
  "mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none";

/** Shared label+input row used by participant-form.tsx's plain text/date fields. */
export function TextField({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
  disabled,
  placeholder,
}: {
  id: string;
  label: string;
  type?: "text" | "date";
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-zinc-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        className={INPUT_CLASS}
      />
    </div>
  );
}
