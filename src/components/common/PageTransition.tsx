import type { ReactNode } from "react";
import { motion } from "motion/react";

type PageTransitionProps = {
  children: ReactNode;
};

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        rotateY: -6,
        x: 25,
      }}
      animate={{
        opacity: 1,
        rotateY: 0,
        x: 0,
      }}
      exit={{
        opacity: 0,
        rotateY: 6,
        x: -25,
      }}
      transition={{
        duration: 0.35,
        ease: "easeInOut",
      }}
      style={{
        transformOrigin: "left center",
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
