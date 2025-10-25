"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  HardHat,
  ClipboardCheck,
  MapPin,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SrvanaIcon from "./SrvanaIcon.jsx";
import { Button } from "@/components/ui/button";

// --- بيانات الكروت ---
const statsData = [
  {
    icon: Users,
    endValue: 5000,
    label: "عميل سعيد",
    suffix: "+",
    gridPosition: "col-start-1 col-end-3 row-start-5 row-end-7",
    className: "bg-chart-1 text-primary-foreground",
  },
  {
    icon: HardHat,
    endValue: 1000,
    label: "فني موثق",
    suffix: "+",
    gridPosition: "col-start-3 col-end-5 row-start-4 row-end-7",
    className: "bg-chart-2 text-primary-foreground",
  },
  {
    icon: ClipboardCheck,
    endValue: 20000,
    label: "خدمة مكتملة",
    suffix: "+",
    gridPosition: "col-start-5 col-end-7 row-start-3 row-end-7",

    className: "bg-chart-3 text-primary-foreground",
  },
  {
    icon: MapPin,
    endValue: 25,
    label: "مدينة مغطاة",
    suffix: "+",
    gridPosition: "col-start-7 col-end-9 row-start-2 row-end-7",

    className: "bg-chart-4 text-primary-foreground",
  },
  {
    label: "ثقة تُبنى بالعمل",
    gridPosition: "col-start-9 col-end-11 row-start-1 row-end-7",
    className:
      "relative overflow-hidden bg-[url('@/assets/LegacyOfTrustSection-img/Workers.jpg')] bg-cover bg-center text-primary-foreground",
    isImage: true,
  },
];

// --- مكوّن البطاقة ---
const StatCard = ({
  icon: Icon,
  endValue,
  label,
  suffix,
  className,
  isImage,
}) => {
  return (
    <motion.div
      className={cn(
        "rounded-2xl p-6 flex flex-col justify-start h-full relative overflow-hidden transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl",
        className
      )}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* --- محتوى أعلى البطاقة --- */}
      <div className="flex flex-col items-start mb-auto z-10 relative">
        {Icon && !isImage && (
          <Icon className="w-10 h-10 mb-4 " strokeWidth={1} />
        )}
        {isImage && (
          <div className="w-10 h-10 mb-4">
            <SrvanaIcon className="w-10 h-10 text-white" />
          </div>
        )}

        {/* الرقم المميز */}
        <h3 className="text-4xl font-extrabold">
          {isImage ? "80%" : endValue + suffix}
        </h3>

        {/* النص تحت الرقم */}
        <p className="text-2xl mt-1">{label}</p>
      </div>

      {/* --- overlay لتعتيم الخلفية فقط --- */}
      {isImage && <div className="absolute inset-0 bg-black/40"></div>}
    </motion.div>
  );
};

// --- المكوّن الرئيسي ---
const AboutStatsSection = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-card overflow-hidden">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-10 grid-rows-6 gap-6 min-h-[650px] relative">
          {/* --- النص داخل الجريد --- */}
          <motion.div
            className="col-start-1 col-end-5 row-start-1 row-end-5 flex flex-col justify-start text-right"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h4 className="text-primary font-semibold mb-2 text-lg">
              عن الشركة
            </h4>
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 text-foreground leading-tight">
              بناء إرث من الثقة
            </h2>
            <p className="text-lg text-muted-foreground max-w-md ml-auto">
              قصتنا دليل على قوى التعاون وتجاوز التحديات والنمو في قطاع الخدمات،
              بخطى ثابتة نحو مستقبل من الجودة والاعتمادية.
            </p>

            {/* ---زر المزيد --- */}
            <div className="mt-6 max-w-xs">
              <Button size="lg" variant="secondary">
                اعرف المزيد
                <ArrowLeft className="h-5 w-5 mr-2" />
              </Button>
            </div>
          </motion.div>

          {/* --- الكروت داخل نفس الجريد --- */}
          {statsData.map((item, index) => (
            <div key={index} className={cn(item.gridPosition)}>
              <StatCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStatsSection;
