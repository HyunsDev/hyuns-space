import { motion } from "framer-motion";
import { DoubleArrowDownIcon } from "@radix-ui/react-icons";

import HyunsLogo from "@/assets/hyuns.png";

export function AboutHeroSection() {
  return (
    <div className="h-[100dvh] flex justify-center items-center relative px-4">
      <div className="flex flex-col justify-center items-center">
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <img className="size-[80px] rounded-full" src={HyunsLogo} alt="" />
        </motion.div>

        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <div className="text-center text-2xl mt-8 font-light">
            박현우 | Hyuns
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.9 }}
        >
          <div className="text-center text-sm">
            <a
              href="mailto:hyuns@hyuns.dev"
              className="text-muted-foreground hover:underline"
            >
              hyuns@hyuns.dev
            </a>
          </div>

          <div className="text-center text-sm">
            <a
              href="https://github.com/HyunsDev"
              className="text-muted-foreground hover:underline"
              target="_blank"
            >
              Github
            </a>{" "}
            |{" "}
            <a
              href="https://instagram.com/hyunsdev"
              className="text-muted-foreground hover:underline"
              target="_blank"
            >
              Instagram
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-[32px]">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: 8 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            duration: 1.2,
          }}
        >
          <DoubleArrowDownIcon className="size-6 text-muted-foreground" />
        </motion.div>
      </div>
    </div>
  );
}
