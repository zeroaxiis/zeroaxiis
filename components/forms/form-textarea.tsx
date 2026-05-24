import { TextareaHTMLAttributes } from "react";

interface FormTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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
    <div className="input-focus-ring border-b border-stroke bg-transparent transition-all duration-300 group">
      {label && (
        <label
          className="block font-label-mono text-[10px] uppercase tracking-[0.22em] text-bone-mute mb-2 group-focus-within:text-accent transition-colors"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <textarea
        className="w-full bg-transparent border-none text-bone font-body-md text-body-md pb-4 placeholder-bone-low focus:outline-none focus:ring-0 resize-none"
        id={id}
        placeholder={placeholder}
        rows={rows}
        {...props}
      />
      {error && <p className="text-error text-xs mt-1 pb-2">{error}</p>}
    </div>
  );
}
