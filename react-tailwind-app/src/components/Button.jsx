export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '', 
  disabled = false,
  ...props 
}) {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-400',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white disabled:bg-gray-400',
    danger: 'bg-red-600 hover:bg-red-700 text-white disabled:bg-red-400',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 disabled:border-blue-400 disabled:text-blue-400'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}