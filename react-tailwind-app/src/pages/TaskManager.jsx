import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Card from '../components/Card';
import Button from '../components/Button';

export default function TaskManager() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks, 
        { 
          id: Date.now(), 
          text: newTask, 
          completed: false, 
          createdAt: new Date().toISOString() 
        }
      ]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(t => !t.completed));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  };

  return (
    <div className="space-y-6">
      <Card title="📋 Task Manager" className="border-t-4 border-blue-600">
        <div className="space-y-4">
          {/* Add Task Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <Button onClick={addTask}>
              Add Task
            </Button>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg capitalize transition-all font-medium ${
                  filter === f
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {f} ({f === 'all' ? stats.total : f === 'active' ? stats.active : stats.completed})
              </button>
            ))}
            {stats.completed > 0 && (
              <Button 
                variant="danger" 
                onClick={clearCompleted} 
                className="ml-auto"
              >
                Clear Completed
              </Button>
            )}
          </div>

          {/* Task List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {filter === 'all' ? '📝 No tasks yet. Add one to get started!' :
                   filter === 'active' ? '✨ No active tasks. Great job!' :
                   '🎉 No completed tasks yet. Keep working!'}
                </p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all transform hover:scale-[1.01]"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 cursor-pointer accent-blue-600"
                  />
                  <div className="flex-1">
                    <span className={`block ${task.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-white'}`}>
                      {task.text}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(task.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <Button 
                    variant="danger" 
                    onClick={() => deleteTask(task.id)} 
                    className="px-3 py-1 text-sm"
                  >
                    Delete
                  </Button>
                </div>
              ))
            )}
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.active}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}