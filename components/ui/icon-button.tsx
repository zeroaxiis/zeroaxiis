interface IconButtonProps {
  icon: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  label?: string;
}

export function IconButton({
  icon,
  href = "#",
  onClick,
  className = "",
  label,
}: IconButtonProps) {
  return (
    <a
      className={`text-outline hover:text-primary transition-colors cursor-pointer ${className}`}
      href={href}
      onClick={onClick}
      title={label}
    >
      <span className="material-symbols-outlined">{icon}</span>
    </a>
  );
}
