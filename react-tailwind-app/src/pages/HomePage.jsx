import Card from '../components/Card';
import Button from '../components/Button';

export default function HomePage({ setCurrentPage }) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
          Welcome to TaskApp
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Manage your tasks efficiently with our modern task management system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card title="📝 Task Management">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create, update, and organize your tasks with ease. Mark them as complete and track your progress.
          </p>
          <Button onClick={() => setCurrentPage('tasks')}>
            Get Started
          </Button>
        </Card>

        <Card title="👥 User Directory">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Browse and search through our user database with pagination and filtering.
          </p>
          <Button onClick={() => setCurrentPage('users')} variant="secondary">
            View Users
          </Button>
        </Card>

        <Card title="🌓 Dark Mode">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Switch between light and dark themes seamlessly with persistent preferences.
          </p>
          <Button variant="outline">
            Toggle Theme
          </Button>
        </Card>
      </div>

      <Card title="✨ Features" className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <span className="text-3xl">⚛️</span>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                React Hooks
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Using useState, useEffect, and useContext for state management
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-3xl">💾</span>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                Local Storage
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Custom hook for persistent data storage across sessions
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-3xl">🌐</span>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                API Integration
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fetch and display data from JSONPlaceholder API
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-3xl">🎨</span>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                Responsive Design
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mobile-first design with Tailwind CSS v4 utility classes
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-3xl">🔍</span>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                Search & Filter
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Filter tasks by status and search users by name or email
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-3xl">📊</span>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                Statistics
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Real-time task statistics and progress tracking
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            Ready to get started?
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Create your first task or explore the user directory
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => setCurrentPage('tasks')}>
              Create Task
            </Button>
            <Button onClick={() => setCurrentPage('users')} variant="secondary">
              Browse Users
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}