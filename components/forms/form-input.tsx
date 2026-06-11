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
    <div className="relative group flex flex-col gap-2">
      {label && (
        <label
          className="block font-label-mono text-[9px] uppercase tracking-[0.2em] text-bone-mute group-focus-within:text-accent transition-colors duration-300"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className="relative overflow-hidden">
        <input
          className="w-full bg-[#050505] border border-stroke text-bone font-body-sm px-4 py-4 placeholder-stroke focus:border-accent focus:bg-[#0a0a0a] focus:outline-none transition-all duration-300 rounded-none"
          id={id}
          placeholder={placeholder}
          type={type}
          {...props}
        />
        {/* Animated accent bar on focus */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-500 group-focus-within:w-full pointer-events-none" />
      </div>
      {error && <p className="text-error text-xs mt-1">{error}</p>}
    </div>
  );
}
