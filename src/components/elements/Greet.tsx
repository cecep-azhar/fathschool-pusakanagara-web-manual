import { SayHello } from "@/lib/utils/moment";
import { motion } from "framer-motion";

export const Greet = () => {
  const waveAnimation = {
    initial: { rotate: -4 },
    animate: {
      rotate: [-4, 14, -8, 14, -4, 10, -4],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut",
        repeatDelay: 2,
      },
    },
  };

  return (
    <h2 className="sm:w-5/6 lg:w-3/4 mx-auto text-center">
      Hello,{" "}
      {SayHello()}
      <motion.span
        initial={waveAnimation.initial}
        animate={waveAnimation.animate}
        style={{ display: "inline-block", originX: 0.7, originY: 0.7 }}
      >
        👋
      </motion.span>
    </h2>
  );
};
