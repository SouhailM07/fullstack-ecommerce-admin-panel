import "./mybutton.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export default function MyButton({
  icon = null,
  label,
  color,
  handler = null,
}: {
  icon?: IconDefinition | null;
  label: string;
  color: string;
  handler?: any;
}) {
  return (
    <motion.button
      onClick={handler}
      whileHover={{ scale: 1.1 }}
      className={`${color} rounded-lg p-3 space-x-[1rem]`}
    >
      {icon ? (
        <>
          <FontAwesomeIcon icon={icon} />
          <span>{label}</span>
        </>
      ) : (
        label
      )}
    </motion.button>
  );
}
