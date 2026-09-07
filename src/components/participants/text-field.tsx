import type { ChangeEvent } from "react";

const INPUT_CLASS = "cds-input--native mt-1 w-full";

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
      <label htmlFor={id} className="cds-field__label">
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
