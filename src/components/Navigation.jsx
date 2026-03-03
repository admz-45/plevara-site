import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full px-4 md:px-6 py-4 md:py-5 backdrop-blur-xl bg-slate-950/90 border-b border-slate-800/50 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold tracking-tight text-white"
        >
          PLEVARA
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          <Link
            to="/"
            className="hidden md:block text-slate-300 hover:text-white transition-colors text-sm font-medium"
          >
            HOME
          </Link>
          <Link
            to="/avoer-system"
            className="hidden md:block text-slate-300 hover:text-white transition-colors text-sm font-medium"
          >
            THE AVOER SYSTEM
          </Link>
          <Link
            to="/resources"
            className="hidden md:block text-slate-300 hover:text-white transition-colors text-sm font-medium"
          >
            RESOURCES
          </Link>
          <Link
            to="/contact"
            className="hidden md:block text-slate-300 hover:text-white transition-colors text-sm font-medium"
          >
            CONTACT
          </Link>
          <a
            href="https://cal.com/plevara-d8kr0w/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 md:px-6 py-2 md:py-2.5 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-all duration-300 text-sm md:text-base font-medium hover:shadow-lg hover:shadow-blue-500/30"
          >
            BOOK A CALL
          </a>
        </div>
      </div>
    </nav>
  );
}
