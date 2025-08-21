import { UI_CONFIG } from '../../utils/constants/apiConstants';
//LoadingSpinner es el indicador de carga (los típicos tres puntitos animados que parpadean cuando el chat está escribiendo)
//El truco: cada círculo usa un animationDelay distinto, lo que crea el efecto escalonado típico de los 3 puntos que se encienden y apagan en secuencia.

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div 
        className={`${sizes[size]} bg-gray-400 rounded-full animate-pulse`}
        style={{ animationDelay: UI_CONFIG.ANIMATION_DELAY.DOT_1 }}
      />
      <div 
        className={`${sizes[size]} bg-gray-400 rounded-full animate-pulse`}
        style={{ animationDelay: UI_CONFIG.ANIMATION_DELAY.DOT_2 }}
      />
      <div 
        className={`${sizes[size]} bg-gray-400 rounded-full animate-pulse`}
        style={{ animationDelay: UI_CONFIG.ANIMATION_DELAY.DOT_3 }}
      />
    </div>
  );
};

export default LoadingSpinner;