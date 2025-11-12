import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function Navbar({ currentPage, setCurrentPage }) {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  const NavLink = ({ page, children }) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`px-3 py-2 rounded-lg transition-colors font-medium ${
        currentPage === page
          ? 'bg-blue-600 text-white'
          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
      }`}
    >
      {children}
    </button>
  );

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:scale-105 transition-transform"
          >
            TaskApp
          </button>
          
          <div className="flex items-center gap-4">
            <NavLink page="home">Home</NavLink>
            <NavLink page="tasks">Tasks</NavLink>
            <NavLink page="users">Users</NavLink>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all text-xl"
              aria-label="Toggle theme"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}