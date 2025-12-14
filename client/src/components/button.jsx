function Button({
  label,
  onClick,
  className = "",
  icon,
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 font-medium shadow-md transition duration-200
        flex items-center justify-center gap-2 rounded-md
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
}

export default Button;