import { Link, useLocation } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-base-300/60 bg-base-100/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-14 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight">BrewPad</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Link
              to="/create"
              className="btn btn-primary gap-2 rounded-2xl"
              aria-current={pathname === "/create" ? "page" : undefined}
            >
              <PlusIcon className="size-4" />
              New Note
            </Link>
          </nav>
        </div>
      </div>
      <div className="h-0.5 w-full bg-gradient-to-r from-primary via-secondary to-accent" />
    </header>
  );
};

export default Navbar;
