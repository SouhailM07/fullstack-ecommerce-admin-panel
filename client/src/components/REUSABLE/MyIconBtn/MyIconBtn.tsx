import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, HTMLMotionProps } from "framer-motion";

type MyIconBtnProps = {
  icon: IconDefinition;
  customStyle: string;
} & HTMLMotionProps<"button">;

export default function MyIconBtn({
  icon,
  customStyle,
  ...buttonProps
}: MyIconBtnProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      {...buttonProps}
      className={`h-[3rem] grid place-items-center rounded-lg aspect-square ${customStyle}`}
    >
      <FontAwesomeIcon icon={icon} />
    </motion.button>
  );
}
