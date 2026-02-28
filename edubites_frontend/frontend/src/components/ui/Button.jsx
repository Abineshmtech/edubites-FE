const variants = {
  primary: "bg-edubites-sky hover:bg-opacity-90 text-white",
  secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
  success: "bg-emerald-500 hover:bg-emerald-600 text-white",
  danger: "bg-rose-500 hover:bg-rose-600 text-white",
  outline: "border-2 border-edubites-sky text-edubites-sky hover:bg-edubites-sky hover:text-white",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  icon: Icon,
  ...props
}) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2 rounded-lg font-medium
        transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}
