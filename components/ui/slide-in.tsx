"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function SlideIn({
  children,
  from = "left",
  delay = 0,
  className,
}: {
  children: ReactNode;
  from?: "left" | "right" | "up" | "fade";
  delay?: number;
  className?: string;
}) {
  const initial =
    from === "fade"
      ? { opacity: 0 }
      : from === "left"
        ? { x: -60, opacity: 0 }
        : from === "right"
          ? { x: 60, opacity: 0 }
          : { y: 40, opacity: 0 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
