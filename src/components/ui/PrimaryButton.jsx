import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const PrimaryButton = ({ children, className, ...props }) => {
  return (
    <Button
      className={cn(
        "group relative flex items-center justify-between",
        "font-bold rounded-full py-2 px-6",
        "overflow-hidden shadow-lg transition-all duration-300",
        "bg-primary text-primary-foreground hover:bg-primary/60",
        className
      )}
      {...props}
    >
      {/* النص */}
      <span className="text-lg z-10">{children}</span>

      {/* مربع الأيقونة */}
      <motion.div
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-md",
          "bg-background text-primary shadow-sm"
        )}
        // حركة عند المرور: السهم يتحرك شمال وفوق فقط
        whileHover={{ x: -6, y: -6 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <ArrowRight className="w-6 h-6" /> {/* السهم لا يتغير اتجاهه */}
      </motion.div>

      {/* لمعان خفيف عند hover */}
      <motion.div
        className="absolute inset-0 bg-white/20 z-0"
        initial={{ x: "-100%", opacity: 0 }}
        whileHover={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </Button>
  );
};
