import "./navbar.css";
import { useLocation } from "react-router-dom";
import { useAuth, UserButton, useUser } from "@clerk/clerk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
export default function Navbar() {
  const location = useLocation();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const getRouteName = () => {
    let route = location.pathname;
    let routeArr = route.split("/");
    if (routeArr.length > 2) {
      return routeArr[2];
    } else {
      return routeArr[1];
    }
  };
  getRouteName();
  return (
    <header className="sticky top-0 bg-white py-pySize px-pxSize h-header border-b-2 border-borderColor  z-[99]">
      <nav className="flex justify-between items-center">
        <span className="text-title font-bold capitalize">
          {getRouteName()}
        </span>
        {!isSignedIn ? (
          <a
            href="#"
            className="aspect-square h-[2rem] grid place-items-center "
          >
            <FontAwesomeIcon icon={faUser} />
          </a>
        ) : (
          <div className="flex items-center gap-x-[1rem]">
            <span>{user?.fullName}</span>
            <UserButton />
          </div>
        )}
      </nav>
    </header>
  );
}
