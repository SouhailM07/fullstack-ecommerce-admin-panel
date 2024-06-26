import "./mypanel.css";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
// assets
import {
  faBox,
  faBoxArchive,
  faHouse,
  IconDefinition,
  faCartShopping,
  faUsers,
  faGear,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MyPanel() {
  let links: { icon: IconDefinition; txt: string; link: string }[] = [
    { icon: faHouse, txt: "dashboard", link: "/dashboard" },
    { icon: faBoxArchive, txt: "products", link: "/products" },
    { icon: faCartShopping, txt: "orders", link: "/orders" },
    { icon: faUsers, txt: "customers", link: "/customers" },
    { icon: faGear, txt: "settings", link: "/settings" },
  ];

  return (
    <aside className="sticky top-0 h-screen border-r-2 border-borderColor min-w-[17rem]">
      <div className="flex border-b-2 border-borderColor py-pySize  h-header items-center justify-between pl-pxSize pr-[1rem]">
        <h1 className="text-secondaryColor  text-[1.3rem] font-bold flex gap-x-[1rem] items-center">
          <FontAwesomeIcon icon={faBox} />
          <span>Acme Inc</span>
        </h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="border-2 text-gray-600 border-borderColor aspect-square h-[2.2rem] rounded-lg"
        >
          <FontAwesomeIcon icon={faBell} />
        </motion.button>
      </div>
      <ul className="flex flex-col gap-y-[1rem] items-center py-[1rem]">
        {links.map((e, i) => (
          <RenderItem {...e} i={i} key={i} />
        ))}
      </ul>
    </aside>
  );
}

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
