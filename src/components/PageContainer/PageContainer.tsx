import React from "react";
import { motion } from "framer-motion";

export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="page absolute top-0 left-0 w-full h-full overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
