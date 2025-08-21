const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  loading = false,
  className = '',
  onClick,
  type = 'button',
  ...props 

/*
children → contenido del botón (texto o icono).
variant → estilo del botón (primary, secondary, outline, ghost, danger).
size → tamaño (sm, md, lg, icon).
disabled → deshabilita el botón.
loading → si es true, muestra un spinner de carga y deshabilita el botón.
className → clases adicionales para personalizar.
onClick → función que se ejecuta al hacer clic.
type → tipo HTML (button, submit, reset).
...props → permite pasar otras props arbitrarias al botón.
*/

}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  /*
Clases comunes a todos los botones:
inline-flex items-center justify-center → centra contenido con flex.
font-medium rounded-lg → estilo de fuente y bordes redondeados.
transition-colors → animación suave al cambiar colores.
focus:outline-none focus:ring-2 focus:ring-offset-2 → efecto de foco accesible.
disabled:opacity-50 disabled:cursor-not-allowed → estilo para botones deshabilitados.
*/
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-600 text-gray-300 hover:bg-gray-700 focus:ring-gray-500',
    ghost: 'text-gray-300 hover:bg-gray-800 hover:text-white focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    icon: 'p-2'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
};

/*
disabled={disabled || loading} → no se puede presionar si está deshabilitado o cargando.
Spinner de carga (loading && ...):
SVG animado con animate-spin.
Pequeño círculo girando antes del texto del botón.
{children} → muestra el contenido real del botón (texto o iconos).
*/

export default Button;