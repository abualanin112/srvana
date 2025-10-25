"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// مكونات Shadcn UI
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// أيقونات
import {
  ArrowLeft,
  Sparkles,
  ShowerHead,
  AirVent,
  Plug,
  Paintbrush2,
  Hammer,
  Droplets,
  Wrench,
  MapPin,
  UserCheck,
} from "lucide-react";

// استيراد الصور من مجلد (assets)
import acCleaningImg from "@/assets/FeaturedQuickServices-img/ac-cleaning.png";
import heaterImg from "@/assets/FeaturedQuickServices-img/heater-installation.png";
import plumbingImg from "@/assets/FeaturedQuickServices-img/plumbing-leaks.png";
import electricalImg from "@/assets/FeaturedQuickServices-img/electrical-fixing.png";
import paintingImg from "@/assets/FeaturedQuickServices-img/painting.png";
import carpentryImg from "@/assets/FeaturedQuickServices-img/carpentry.png";

// --- بيانات وهمية للخدمات ---
const quickServicesData = [
  {
    id: "ac-cleaning",
    title: "تنظيف التكييف",
    description: "خدمة تنظيف عميق لوحدات التكييف لتحسين الأداء وجودة الهواء.",
    icon: AirVent,
    image: acCleaningImg,
  },
  {
    id: "heater-installation",
    title: "تركيب سخان مياه",
    description:
      "تركيب احترافي وآمن لجميع أنواع سخانات المياه، مع ضمان الجودة.",
    icon: ShowerHead,
    image: heaterImg,
  },
  {
    id: "plumbing-leaks",
    title: "إصلاح تسربات السباكة",
    description: "كشف وإصلاح فوري لجميع تسربات المياه في المطابخ والحمامات.",
    icon: Droplets,
    image: plumbingImg,
  },
  {
    id: "electrical-fixing",
    title: "صيانة كهرباء",
    description:
      "حلول شاملة لمشاكل الكهرباء، من تغيير المقابس إلى فحص الدوائر.",
    icon: Plug,
    image: electricalImg,
  },
  {
    id: "painting",
    title: "خدمات الدهان",
    description: "دهانات داخلية وخارجية بجودة عالية وألوان عصرية تناسب ذوقك.",
    icon: Paintbrush2,
    image: paintingImg,
  },
  {
    id: "carpentry",
    title: "أعمال نجارة",
    description:
      "تركيب وإصلاح الأبواب، النوافذ، والأثاث الخشبي بدقة واحترافية.",
    icon: Hammer,
    image: carpentryImg,
  },
];

const FeaturedQuickServices = () => {
  const [selectedService, setSelectedService] = useState(quickServicesData[0]);

  const motionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="container max-w-screen-xl mx-auto px-4">
        {" "}
        <div className="mb-12 text-center">
          {" "}
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            خدمات سريعة شائعة
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            {" "}
            الحل الأمثل للأعمال البسيطة والفنية اليومية السريعة والواضحة
          </p>
        </div>
        {/* --- البطاقة الرئيسية التي تحتوي على كل المحتوى --- */}
        <Card className="overflow-hidden shadow-lg border !py-0">
          <div className="flex flex-col lg:flex-row">
            {/* --- العمود الأول (الثلث الأيمن) - البطاقة الداكنة --- */}
            <div className="lg:w-1/3 bg-primary text-primary-foreground p-12 flex flex-col justify-center relative">
              <div className="relative z-10">
                <h3 className="text-3xl font-extrabold mt-8 mb-6 text-secondary text-center md:text-right">
                  كيف تعمل؟
                </h3>

                <div className="space-y-2">
                  {[
                    { icon: Wrench, text: "حدد الخدمة المطلوبة" },
                    { icon: MapPin, text: "عين المكان والوقت المناسب" },
                    { icon: UserCheck, text: "اختر الفني المفضل لديك" },
                  ].map((step, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 bg-primary/15 rounded-xl p-3 hover:bg-primary/25 transition-all duration-300"
                    >
                      <div className="flex items-center justify-center bg-secondary/20 rounded-full size-12 shrink-0">
                        <step.icon className="text-secondary size-6" />
                      </div>
                      <p className="text-base md:text-lg font-medium text-primary-foreground/90">
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* --- العمود الثاني (الثلثان) - الجزء التفاعلي --- */}
            <div className="lg:w-2/3 flex flex-col gap-8 p-12 bg-card">
              {" "}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {quickServicesData.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    onMouseEnter={() => setSelectedService(service)}
                    className={cn(
                      "flex flex-col items-center justify-center gap-2 p-3 rounded-lg aspect-square transition-colors duration-200 ease-in-out",
                      selectedService.id === service.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted hover:bg-accent hover:text-accent-foreground"
                    )}
                    aria-label={service.title}
                  >
                    <service.icon className="h-8 w-8" />
                    <span className="text-xs font-medium text-center hidden sm:block">
                      {service.title}
                    </span>
                  </button>
                ))}
              </div>
              {/* 2. تفاصيل الخدمة المختارة */}
              <div className="flex-grow overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedService.id}
                    variants={motionVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center h-full"
                  >
                    <div className="md:col-span-2 w-full">
                      <img
                        src={selectedService.image}
                        alt={selectedService.title}
                        className="w-full aspect-video object-cover rounded-xl shadow-md"
                      />
                    </div>
                    <div className="md:col-span-1 flex flex-col text-center md:text-right items-center md:items-start">
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {selectedService.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 text-base">
                        {selectedService.description}
                      </p>
                      <Button size="lg" variant="secondary">
                        احجز الخدمة
                        <ArrowLeft className="h-5 w-5 mr-2" />
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FeaturedQuickServices;
