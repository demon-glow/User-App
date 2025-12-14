import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const linkBase =
    "px-4 py-3 rounded-lg font-semibold transition-all duration-300";

  const activeLink =
    "bg-black text-white shadow-md";

  const inactiveLink =
    "text-gray-700 hover:bg-gray-300 hover:translate-x-1";

  return (
    <nav className="h-screen w-1/6 bg-gray-100 p-6 flex flex-col shadow-lg">
      <div className="flex flex-col space-y-3">
        <Link
          to="/"
          className={`${linkBase} ${
            location.pathname === "/" ? activeLink : inactiveLink
          }`}
        >
          Users
        </Link>

        <Link
          to="/department"
          className={`${linkBase} ${
            location.pathname === "/department"
              ? activeLink
              : inactiveLink
          }`}
        >
          Department
        </Link>
      </div>

      <div className="flex-grow" />
    </nav>
  );
}

export default Navbar;
