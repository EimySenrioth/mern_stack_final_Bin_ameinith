import Header from './Header';
import Sidebar from './Sidebar';
import { useChatContext } from '../../context/ChatContext/ChatContext';

const MainLayout = ({ children }) => {
  const { isSidebarOpen } = useChatContext();

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;