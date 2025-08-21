import Button from '../ui/Button';
import { useChatContext } from '../../context/ChatContext/ChatContext';

/*
Button → Componente de botón reutilizable con estilos predefinidos.
useChatContext →  Aquí se usa para manejar 
la apertura/cierre de la sidebar.
*/

const Header = () => {
  const { toggleSidebar } = useChatContext();

  return (
    <header className="border-b border-gray-700 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="hover:bg-gray-800"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
        <h1 className="text-lg font-semibold">ChatGPT</h1>
      </div>
      
      <Button variant="primary" size="md">
        Obtener Plus
      </Button>
    </header>
  );
};

export default Header;