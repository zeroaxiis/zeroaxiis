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
    <div className="input-focus-ring border-b border-stroke bg-transparent transition-all duration-300 group">
      {label && (
        <label
          className="block font-label-mono text-[10px] uppercase tracking-[0.22em] text-bone-mute mb-2 group-focus-within:text-accent transition-colors"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        className="w-full bg-transparent border-none text-bone font-body-md text-body-md pb-4 placeholder-bone-low focus:outline-none focus:ring-0"
        id={id}
        placeholder={placeholder}
        type={type}
        {...props}
      />
      {error && <p className="text-error text-xs mt-1 pb-2">{error}</p>}
    </div>
  );
}
