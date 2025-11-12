import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TaskManager from './pages/TaskManager';
import UsersPage from './pages/UsersPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'tasks':
        return <TaskManager />;
      case 'users':
        return <UsersPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
          {renderPage()}
        </main>
        <Footer setCurrentPage={setCurrentPage} />
      </div>
    </ThemeProvider>
  );
}