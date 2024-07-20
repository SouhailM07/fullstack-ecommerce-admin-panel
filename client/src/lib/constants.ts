import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBoxArchive,
  faCartShopping,
  faGear,
  faHouse,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export let links: { icon: IconDefinition; txt: string; link: string }[] = [
  { icon: faHouse, txt: "dashboard", link: "/" },
  { icon: faBoxArchive, txt: "products", link: "/products" },
  { icon: faCartShopping, txt: "orders", link: "/orders" },
  { icon: faUsers, txt: "customers", link: "/customers" },
  { icon: faGear, txt: "settings", link: "/settings" },
];
