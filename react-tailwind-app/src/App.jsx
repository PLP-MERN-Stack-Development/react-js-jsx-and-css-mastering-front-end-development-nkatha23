import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";      // layout that contains Navbar/Footer + <Outlet />
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import ApiDemo from "./pages/ApiDemo";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
        <Routes>
          {/* Layout wraps pages with Navbar/Footer */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="tasks"
              element={<Tasks />} 
            />
            <Route path="api" element={<ApiDemo />} />
            {/* Example route showing how to keep local UI (counter) inside Home if desired */}
          </Route>

          {/* Fallback route (optional) */}
          <Route
            path="*"
            element={
              <main className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-semibold">Page not found</h2>
              </main>
            }
          />
        </Routes>

        {/* Floating counter UI — optional; you can remove if you don't want it */}
        <div className="fixed right-4 bottom-4 bg-white dark:bg-gray-800 shadow rounded p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCount((c) => c - 1)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              -
            </button>
            <span className="w-8 text-center font-semibold">{count}</span>
            <button
              onClick={() => setCount((c) => c + 1)}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}



// import { useState } from 'react';
// import './App.css';
// import React from 'react'
// import TaskManager from './components/pages/Tasks'
// import { Routes, Route } from 'react-router-dom'
// import Layout from './components/Layout'
// import Home from './pages/Home'
// import Tasks from './pages/Tasks'
// import ApiDemo from './pages/ApiDemo'

// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import Tasks from "./pages/Tasks";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//       {/* Navbar component will go here */}
//       <header className="bg-white dark:bg-gray-800 shadow">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold">PLP Task Manager</h1>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//         <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6">
//           <div className="flex flex-col items-center justify-center">
//             <p className="text-lg mb-4">
//               Edit <code className="font-mono bg-gray-200 dark:bg-gray-700 p-1 rounded">src/App.jsx</code> and save to test HMR
//             </p>
            
//             <div className="flex items-center gap-4 my-4">
//               <button
//                 onClick={() => setCount((count) => count - 1)}
//                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//               >
//                 -
//               </button>
//               <span className="text-xl font-bold">{count}</span>
//               <button
//                 onClick={() => setCount((count) => count + 1)}
//                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
//               >
//                 +
//               </button>
//             </div>

//             <p className="text-gray-500 dark:text-gray-400 mt-4">
//               Implement your TaskManager component here
//             </p>
//           </div>
//         </div>
        
//         {/* API data display will go here */}
//         <div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6">
//           <h2 className="text-2xl font-bold mb-4">API Data</h2>
//           <p className="text-gray-500 dark:text-gray-400">
//             Fetch and display data from an API here
//           </p>
//         </div>
//       </main>

//       {/* Footer component will go here */}
//       <footer className="bg-white dark:bg-gray-800 shadow mt-auto">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           <p className="text-center text-gray-500 dark:text-gray-400">
//             © {new Date().getFullYear()} PLP Task Manager. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
//       <main className="container mx-auto px-4 py-8">
//         <TaskManager />
//       </main>
//     </div>
//   )
// }