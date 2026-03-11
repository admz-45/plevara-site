import { useState } from "react";
import { Link } from "react-router-dom";

const links = [
  { to: "/", label: "HOME" },
  { to: "/avoer-system", label: "THE AVOER SYSTEM" },
  { to: "/resources", label: "RESOURCES" },
  { to: "/contact", label: "CONTACT" },
  { to: "/about-us", label: "ABOUT US" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full px-4 md:px-6 py-4 md:py-5 backdrop-blur-xl bg-slate-950/90 border-b border-slate-800/50 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold tracking-tight text-white"
        >
          PLEVARA
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
            >
              {label}
            </Link>
          ))}

          <a
            href="https://cal.com/plevara-d8kr0w/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-all duration-300 text-base font-medium hover:shadow-lg hover:shadow-blue-500/30"
          >
            BOOK A CALL
          </a>
        </div>

        {/* Mobile: hamburger */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-4 pb-4 border-t border-slate-800/50 pt-4">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-slate-300 hover:text-white transition-colors text-sm font-medium px-2"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}

          <a
            href="https://cal.com/plevara-d8kr0w/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-all duration-300 text-sm font-medium text-center"
          >
            BOOK A CALL
          </a>
        </div>
      )}
    </nav>
  );
}
