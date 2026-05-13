import { TextareaHTMLAttributes } from "react";

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function FormTextarea({
  label,
  error,
  id,
  placeholder,
  rows = 5,
  ...props
}: FormTextareaProps) {
  return (
    <div className="input-focus-ring border border-stroke rounded bg-canvas transition-colors duration-200">
      {label && (
        <label className="sr-only" htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        className="w-full bg-transparent border-none text-primary font-label-mono text-label-mono p-4 placeholder-ghost-text focus:ring-0 resize-none"
        id={id}
        placeholder={placeholder}
        rows={rows}
        {...props}
      />
      {error && <p className="text-error text-xs mt-1 px-4 pb-2">{error}</p>}
    </div>
  );
}
