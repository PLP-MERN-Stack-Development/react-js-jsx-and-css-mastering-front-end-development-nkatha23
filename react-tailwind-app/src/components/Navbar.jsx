import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-slate-900 shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold">Week3 App</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/tasks" className="hover:underline">Tasks</Link>
        </div>
      </div>
    </nav>
  );
}
