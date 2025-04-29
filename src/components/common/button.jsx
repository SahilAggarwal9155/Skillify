export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  isLoading = false,
  leftIcon,
  rightIcon,
  onClick,
}) {
  const variantClasses = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    success: "bg-green-600 hover:bg-green-700 text-white",
    warning: "bg-amber-500 hover:bg-amber-600 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    outline:
      "bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-700",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
  };

  const sizeClasses = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };
  return (
    <button
      onClick={onClick}
      className={` ${className} bg-black text-white text-[10px]  p-3 flex justify-center items-center hover:cursor-pointer hover:transition duration-500 ease-in-out  rounded-3xl ${
        variantClasses[variant]
      } ${sizeClasses[size]} ${
        isLoading ? "opacity-70 cursor-not-allowed" : ""
      } ${className}`}
    >
      {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}
