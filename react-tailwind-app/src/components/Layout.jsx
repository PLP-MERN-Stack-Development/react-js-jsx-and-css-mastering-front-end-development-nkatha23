// src/components/Layout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold">PLP Task Manager</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/tasks" className="hover:underline">Tasks</Link>
          <Link to="/api" className="hover:underline">API</Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-800 text-sm mt-auto">
      <div className="container mx-auto px-4 py-6 text-center">
        © {new Date().getFullYear()} PLP Task Manager. All rights reserved.
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
