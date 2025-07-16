"use client";
import { cn } from "@/libs/utils";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const MeteorsComponent = ({ number, className }) => {
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    const generated = new Array(number).fill(null).map((_, idx) => {
      const position = idx * (2500 / number) - 400;
      return {
        key: `meteor-${idx}`,
        position,
        delay: Math.random() * 5,
        duration: Math.floor(Math.random() * (10 - 5) + 5),
      };
    });
    setMeteors(generated);
  }, [number]);

  if (meteors.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      {meteors.map((el) => (
        <span
          key={el.key}
          className={cn(
            "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
            "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
            className
          )}
          style={{
            top: "-30px",
            left: `${el.position}px`,
            animationDelay: `${el.delay}s`,
            animationDuration: `${el.duration}s`,
          }}
        />
      ))}
    </motion.div>
  );
};

MeteorsComponent.displayName = "Meteors";

export const Meteors = React.memo(MeteorsComponent);
