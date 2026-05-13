import { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function FormInput({
  label,
  error,
  id,
  type = "text",
  placeholder,
  ...props
}: FormInputProps) {
  return (
    <div className="input-focus-ring border border-stroke rounded bg-canvas transition-colors duration-200">
      {label && (
        <label className="sr-only" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className="w-full bg-transparent border-none text-primary font-label-mono text-label-mono p-4 placeholder-ghost-text focus:ring-0"
        id={id}
        placeholder={placeholder}
        type={type}
        {...props}
      />
      {error && <p className="text-error text-xs mt-1 px-4 pb-2">{error}</p>}
    </div>
  );
}
