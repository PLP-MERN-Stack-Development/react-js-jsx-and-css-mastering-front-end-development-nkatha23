import React, { useState, useEffect, useRef, useMemo } from "react";
import Button from "../ui/Button";

/**
 * Utility: generate id (use crypto.randomUUID when available)
 */
const genId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
};

/**
 * Custom hook for managing tasks with localStorage persistence
 */
const useLocalStorageTasks = (key = "tasks") => {
  // init (defensive: localStorage may not exist in some environments)
  const safeGet = () => {
    try {
      const raw = typeof localStorage !== "undefined" ? localStorage.getItem(key) : null;
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.warn("Could not read tasks from localStorage", err);
      return [];
    }
  };

  const [tasks, setTasks] = useState(safeGet);

  // persist to localStorage
  useEffect(() => {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(key, JSON.stringify(tasks));
      }
    } catch (err) {
      console.warn("Could not save tasks to localStorage", err);
    }
  }, [tasks, key]);

  // sync across tabs/windows
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === key) {
        try {
          const newVal = e.newValue ? JSON.parse(e.newValue) : [];
          setTasks(newVal);
        } catch {
          // ignore parse errors
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);

  // Add a new task - prevents duplicates by exact text match (case-insensitive)
  const addTask = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return { ok: false, reason: "empty" };

    const duplicate = tasks.some((t) => t.text.toLowerCase() === trimmed.toLowerCase());
    if (duplicate) return { ok: false, reason: "duplicate" };

    const newTask = {
      id: genId(),
      text: trimmed,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    return { ok: true, task: newTask };
  };

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  return { tasks, addTask, toggleTask, deleteTask, clearCompleted, setTasks };
};

/**
 * TaskManager component
 */
const TaskManager = () => {
  const { tasks, addTask, toggleTask, deleteTask, clearCompleted } = useLocalStorageTasks();
  const [newTaskText, setNewTaskText] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed
  const inputRef = useRef(null);

  // filtered tasks (memoized)
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter((t) => !t.completed);
      case "completed":
        return tasks.filter((t) => t.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  // derived stats
  const remainingCount = useMemo(() => tasks.filter((t) => !t.completed).length, [tasks]);
  const completedCount = useMemo(() => tasks.filter((t) => t.completed).length, [tasks]);

  useEffect(() => {
    // autofocus input on mount
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = addTask(newTaskText);
    if (result.ok) {
      setNewTaskText("");
      if (inputRef.current) inputRef.current.focus();
    } else {
      // Small inline feedback — you can replace with a toast
      if (result.reason === "empty") {
        // do nothing (could show message)
      } else if (result.reason === "duplicate") {
        // do nothing (could show message)
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Task Manager</h2>

      {/* Task input form */}
      <form onSubmit={handleSubmit} className="mb-4" aria-label="Add task form">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            aria-label="New task"
          />
          <Button
            type="submit"
            variant="primary"
            aria-label="Add task"
            disabled={!newTaskText.trim()}
          >
            Add
          </Button>
        </div>
      </form>

      {/* Filters and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "active" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setFilter("active")}
          >
            Active
          </Button>
          <Button
            variant={filter === "completed" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setFilter("completed")}
          >
            Completed
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {remainingCount} remaining
            {completedCount > 0 && ` · ${completedCount} completed`}
          </span>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (completedCount === 0) return;
              // confirmation to avoid accidental clears
              if (window.confirm("Clear all completed tasks?")) {
                clearCompleted();
              }
            }}
            disabled={completedCount === 0}
            aria-label="Clear completed tasks"
          >
            Clear completed
          </Button>
        </div>
      </div>

      {/* Task list */}
      <ul className="space-y-2">
        {filteredTasks.length === 0 ? (
          <li className="text-gray-500 dark:text-gray-400 text-center py-4">No tasks found</li>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
            >
              <div className="flex items-center gap-3">
                <input
                  id={`task-${task.id}`}
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  aria-label={`Mark ${task.text} as ${task.completed ? "incomplete" : "complete"}`}
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={`select-none ${task.completed ? "line-through text-gray-500 dark:text-gray-400" : ""}`}
                >
                  {task.text}
                </label>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (window.confirm(`Delete task: "${task.text}"?`)) deleteTask(task.id);
                  }}
                  aria-label={`Delete ${task.text}`}
                  className="text-sm px-3 py-1 rounded border border-transparent hover:bg-red-50 dark:hover:bg-red-800"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskManager;
