import AppLogo from "./AppLogo";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { UserDropdownSkeleton } from "./dropdowns/user-dropdown";

const LazyUserDropdown = lazy(  
  () => import("@/components/dropdowns/user-dropdown")
);

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Docs",
    path: "/docs",
  },
];

const Navbar = () => {
  return (
    <nav className="flex justify-between max-w-7xl mx-auto items-center gap-3 p-5">
      <AppLogo />
      <ul className="absolute flex items-center gap-3 left-1/2 -translate-x-1/2">
        {navLinks.map((link, idx) => (
          <li key={idx}>
            <Link className="font-medium" to={link.path}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <Suspense fallback={<UserDropdownSkeleton />}>
        <LazyUserDropdown />
      </Suspense>
    </nav>
  );
};

export default Navbar;
