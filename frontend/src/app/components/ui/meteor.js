"use client";
import { cn } from "@/libs/utils";
import {motion} from "framer-motion"
import React, { useMemo } from "react";

export const Meteors = React.memo(({
  number,
  className
}) => {
  
  const meteors = useMemo(() => {
    return new Array(number).fill(null).map((_, idx) => {
      const position = idx * (2000 / number) - 400;
      return {
        key: `meteor-${idx}`,
        position,
        delay: Math.random() * 5,
        duration: Math.floor(Math.random() * (10 - 5) + 5),
      };
    });
  }, [number]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      {meteors.map((el, idx) => {
        const meteorCount = number || 20;
        // Calculate position to evenly distribute meteors across container width
        const position = idx * (2000 / meteorCount) - 400; // Spread across 800px range, centered

        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
              className
            )}
            style={{
              top: "-30px", // Start above the container
              left: position + "px",
              animationDelay: Math.random() * 5 + "s", // Random delay between 0-5s
              animationDuration: Math.floor(Math.random() * (10 - 5) + 5) + "s", // Keep some randomness in duration
            }}></span>
        );
      })}
    </motion.div>
  );
});
