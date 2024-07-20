import "./navbar.css";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { useAuth, UserButton, useUser } from "@clerk/clerk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { links } from "@/lib/constants";

export default function Navbar() {
  const location = useLocation();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const getRouteName = () => {
    let route = location.pathname;
    let routeArr = route.split("/");
    if (routeArr[1] == "") {
      return links[0].txt;
    } else if (routeArr.length > 2) {
      return routeArr[2];
    } else {
      return routeArr[1];
    }
  };
  getRouteName();
  return (
    <header className="sticky top-0 bg-white py-pySize max-md:px-[1rem] px-pxSize h-header border-b-2 border-borderColor  z-[20]">
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
            <span className="max-sm:hidden">{user?.fullName}</span>
            <UserButton />
            <SmallSideBar />
          </div>
        )}
      </nav>
    </header>
  );
}

const SmallSideBar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <FontAwesomeIcon className="lg:hidden" icon={faBars} />
      </SheetTrigger>
      <SheetContent side="left" className="w-[17rem] !px-0">
        <SheetHeader>
          <SheetTitle className="text-center">Menubar</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <ul className="flex flex-col gap-y-[1rem] items-center py-[1rem]">
          {links.map((e, i) => (
            <RenderItem {...e} i={i} key={i} />
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

const RenderItem = ({ icon, txt, link, i }) => {
  const location = useLocation();

  return (
    <motion.button
      role="listitem"
      initial={{ opacity: 0, x: +100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: i * 0.1,
      }}
      className=" w-[85%]"
    >
      <Link
        to={link}
        className={`${
          "/" + location.pathname.split("/")[1] === link
            ? "bg-secondaryColor text-white"
            : "hover:border-secondaryColor "
        } hover:translate-x-[10px] duration-200 border-2 border-transparent  flex items-center px-3 py-2 rounded-lg  gap-x-[1.3rem]`}
      >
        <FontAwesomeIcon icon={icon} />
        <span className="capitalize">{txt}</span>
      </Link>
    </motion.button>
  );
};
