import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-800 text-sm">
      <div className="container mx-auto px-4 py-4 text-center">
        © {new Date().getFullYear()} Your Name — Built with React & Tailwind
      </div>
    </footer>
  );
}
