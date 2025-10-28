"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// مكونات Shadcn UI
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// أيقونات
import {
  ArrowLeft,
  AirVent,
  ShowerHead,
  Droplets,
  Plug,
  Paintbrush2,
  Plus,
} from "lucide-react";

//  الصور
import acCleaningImg from "@/assets/FeaturedQuickServices-img/ac-cleaning.png";
import heaterImg from "@/assets/FeaturedQuickServices-img/heater-installation.png";
import plumbingImg from "@/assets/FeaturedQuickServices-img/plumbing-leaks.png";
import electricalImg from "@/assets/FeaturedQuickServices-img/electrical-fixing.png";
import paintingImg from "@/assets/FeaturedQuickServices-img/painting.png";

const quickServicesData = [
  {
    id: "ac-cleaning",
    title: "تنظيف التكييف",
    description: "خدمة تنظيف عميق لوحدات التكييف لتحسين الأداء وجودة الهواء.",
    icon: AirVent,
    image: acCleaningImg,
    features: [
      {
        name: "تنظيف فلاتر الوحدة الداخلية",
        slug: "/services/ac-cleaning/filter-cleaning",
      },
      {
        name: "غسيل الوحدة الداخلية بمضخة",
        slug: "/services/ac-cleaning/internal-unit-wash",
      },
      {
        name: "تنظيف مبخر الهواء",
        slug: "/services/ac-cleaning/evaporator-disinfection",
      },
      {
        name: "غسيل الوحدة الخارجية",
        slug: "/services/ac-cleaning/external-unit-wash",
      },
      {
        name: "تنظيف مروحة المكثف",
        slug: "/services/ac-cleaning/condenser-fan-cleaning",
      },
      {
        name: "فحص ضغط غاز الفريون",
        slug: "/services/ac-cleaning/freon-pressure-check",
      },
      {
        name: "قياس أداء التبريد",
        slug: "/services/ac-cleaning/performance-measurement",
      },
      {
        name: "تعقيم مجاري الهواء",
        slug: "/services/ac-cleaning/air-duct-sanitization",
      },
      { name: "تجفيف أجزاء الوحدة", slug: "/services/ac-cleaning/unit-drying" },
      {
        name: "فحص خراطيم التصريف",
        slug: "/services/ac-cleaning/drain-hose-inspection",
      },
      {
        name: "تنظيف حوض التصريف",
        slug: "/services/ac-cleaning/drain-pan-cleaning",
      },
      { name: "فحص الانسداد", slug: "/services/ac-cleaning/blockage-check" },
    ],
  },
  {
    id: "heater-installation",
    title: "تركيب سخان",
    description:
      "تركيب احترافي وآمن لجميع أنواع سخانات المياه، مع ضمان الجودة.",
    icon: ShowerHead,
    image: heaterImg,
    features: [
      {
        name: "تحديد الموقع الأنسب",
        slug: "/services/heater-installation/location-selection",
      },
      {
        name: "تثبيت قاعدة السخان",
        slug: "/services/heater-installation/base-mounting",
      },
      {
        name: "تأسيس تمديدات الماء الحار",
        slug: "/services/heater-installation/hot-water-piping",
      },
      {
        name: "تأسيس تمديدات الماء البارد",
        slug: "/services/heater-installation/cold-water-piping",
      },
      {
        name: "تركيب صمام الأمان",
        slug: "/services/heater-installation/safety-valve",
      },
      {
        name: "توصيل آمن للكهرباء",
        slug: "/services/heater-installation/electrical-wiring",
      },
      {
        name: "استخدام أسلاك مناسبة",
        slug: "/services/heater-installation/proper-cabling",
      },
      {
        name: "تركيب مفتاح مستقل",
        slug: "/services/heater-installation/dedicated-switch",
      },
      {
        name: "استخدام شريط التفلون",
        slug: "/services/heater-installation/teflon-taping",
      },
      {
        name: "منع التسريب المستقبلي",
        slug: "/services/heater-installation/leak-prevention",
      },
      {
        name: "اختبار ضغط المياه",
        slug: "/services/heater-installation/pressure-test",
      },
      {
        name: "التأكد من عدم التسريب",
        slug: "/services/heater-installation/leak-check",
      },
      {
        name: "ضبط درجة الحرارة",
        slug: "/services/heater-installation/temperature-setting",
      },
      {
        name: "شرح طريقة التشغيل",
        slug: "/services/heater-installation/user-guidance",
      },
      {
        name: "اختبار عمل الثرموستات",
        slug: "/services/heater-installation/thermostat-test",
      },
      {
        name: "تركيب سخانات مركزية",
        slug: "/services/heater-installation/central-heaters",
      },
    ],
  },
  {
    id: "plumbing-leaks",
    title: "تسربات السباكة",
    description: "كشف وإصلاح فوري لجميع تسربات المياه في المطابخ والحمامات.",
    icon: Droplets,
    image: plumbingImg,
    features: [
      {
        name: "كشف إلكتروني للتسربات",
        slug: "/services/plumbing-leaks/electronic-detection",
      },
      {
        name: "تحديد دقيق لمكان التسريب",
        slug: "/services/plumbing-leaks/precise-location",
      },
      {
        name: "إصلاح تسربات الصنابير",
        slug: "/services/plumbing-leaks/faucet-repair",
      },
      {
        name: "معالجة تسربات المراحيض",
        slug: "/services/plumbing-leaks/toilet-leak-repair",
      },
      {
        name: "إصلاح تسربات الشطافات",
        slug: "/services/plumbing-leaks/bidet-sprayer-repair",
      },
      {
        name: "إصلاح مواسير التغذية",
        slug: "/services/plumbing-leaks/supply-pipe-repair",
      },
      {
        name: "معالجة تسربات الصرف",
        slug: "/services/plumbing-leaks/drainage-leak-repair",
      },
      {
        name: "إصلاح بدون تكسير",
        slug: "/services/plumbing-leaks/no-demolition-repair",
      },
      {
        name: "عزل أرضيات الحمامات",
        slug: "/services/plumbing-leaks/floor-insulation",
      },
      {
        name: "تغيير القطع التالفة",
        slug: "/services/plumbing-leaks/part-replacement",
      },
      {
        name: "معالجة رطوبة الجدران",
        slug: "/services/plumbing-leaks/wall-dampness-treatment",
      },
      {
        name: "إصلاح تسربات السخانات",
        slug: "/services/plumbing-leaks/heater-leak-repair",
      },
      {
        name: "كشف تسربات الغاز",
        slug: "/services/plumbing-leaks/gas-leak-detection",
      },
      {
        name: "تقديم تقرير معتمد",
        slug: "/services/plumbing-leaks/certified-report",
      },
    ],
  },
  {
    id: "electrical-fixing",
    title: "صيانة كهرباء",
    description:
      "حلول شاملة لمشاكل الكهرباء، من تغيير المقابس إلى فحص الدوائر.",
    icon: Plug,
    image: electricalImg,
    features: [
      {
        name: "إصلاح انقطاع التيار",
        slug: "/services/electrical-fixing/power-outage",
      },
      {
        name: "اكتشاف سبب الأعطال",
        slug: "/services/electrical-fixing/fault-diagnosis",
      },
      {
        name: "تغيير مفاتيح الإضاءة",
        slug: "/services/electrical-fixing/switch-replacement",
      },
      {
        name: "تركيب مقابس جديدة",
        slug: "/services/electrical-fixing/socket-installation",
      },
      {
        name: "توزيع الأحمال",
        slug: "/services/electrical-fixing/load-distribution",
      },
      {
        name: "إصلاح أعطال الطبلون",
        slug: "/services/electrical-fixing/panel-repair",
      },
      {
        name: "تغيير القواطع",
        slug: "/services/electrical-fixing/breaker-replacement",
      },
      {
        name: "تمديد نقاط كهرباء",
        slug: "/services/electrical-fixing/new-wiring-points",
      },
      {
        name: "تركيب جميع أنواع الإضاءة",
        slug: "/services/electrical-fixing/lighting-installation",
      },
      {
        name: "تركيب إضاءة مخفية",
        slug: "/services/electrical-fixing/led-strip-installation",
      },
      {
        name: "إصلاح التماس الكهربائي",
        slug: "/services/electrical-fixing/short-circuit-repair",
      },
      {
        name: "توصيل المراوح والسخانات",
        slug: "/services/electrical-fixing/appliance-connection",
      },
      {
        name: "فحص تأريض المبنى",
        slug: "/services/electrical-fixing/grounding-check",
      },
    ],
  },
  {
    id: "painting",
    title: "خدمات الدهان",
    description: "دهانات داخلية وخارجية بجودة عالية وألوان عصرية تناسب ذوقك.",
    icon: Paintbrush2,
    image: paintingImg,
    features: [
      { name: "دهانات داخلية", slug: "/services/painting/interior-painting" },
      { name: "دهانات خارجية", slug: "/services/painting/exterior-painting" },
      { name: "حماية الأثاث والأرضيات", slug: "/services/painting/protection" },
      {
        name: "معالجة الشقوق والثقوب",
        slug: "/services/painting/crack-repair",
      },
      { name: "صنفرة وتنعيم الجدران", slug: "/services/painting/wall-sanding" },
      {
        name: "تطبيق طبقة أساس",
        slug: "/services/painting/primer-application",
      },
      {
        name: "دهان طبقتين فأكثر",
        slug: "/services/painting/multi-coat-painting",
      },
      {
        name: "استخدام دهانات قابلة للغسيل",
        slug: "/services/painting/washable-paint",
      },
      {
        name: "تنفيذ ديكورات حديثة",
        slug: "/services/painting/decorative-finishes",
      },
      {
        name: "دهان الأبواب الخشبية",
        slug: "/services/painting/wood-door-painting",
      },
      {
        name: "دهان الأبواب الحديدية",
        slug: "/services/painting/metal-door-painting",
      },
      {
        name: "دهانات مقاومة للبكتيريا",
        slug: "/services/painting/antibacterial-paint",
      },
    ],
  },
];

const FeaturedQuickServices = () => {
  const [selectedService, setSelectedService] = useState(quickServicesData[0]);

  const textVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  return (
    <section className="w-full py-16 md:py-24 bg-background overflow-hidden">
      <div className="container max-w-screen-xl mx-auto px-4 ">
        <div className="mb-8 text-center">
          <h4 className="text-md text-primary font-semibold mb-2 text-lg">
            خدمات سريعة
          </h4>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 text-foreground leading-tight">
            ما الخدمة التي تبحث عنها؟
          </h2>
          <p className="text-lg text-muted-foreground mb-2">
            الحل الأمثل للخدمات اليومية السريعة.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-5">
          {quickServicesData.map((service) => (
            <button
              key={service.id}
              onClick={() => setSelectedService(service)}
              onMouseEnter={() => setSelectedService(service)}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl transition-all duration-200 ease-in-out transform",
                selectedService.id === service.id
                  ? "text-secondary"
                  : "text-primary hover:text-secondary"
              )}
              aria-label={service.title}
            >
              <service.icon className="h-7 w-7 md:h-8 md-w-8" />
              <span className="text-xs md:text-sm font-semibold text-center leading-tight">
                {service.title}
              </span>
            </button>
          ))}
          <button
            className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl transition-all duration-200 ease-in-out transform text-muted-foreground hover:text-secondary"
            aria-label="المزيد"
          >
            <Plus className="h-7 w-7 md:h-8 md-w-8" />
            <span className="text-xs md:text-sm font-semibold text-center leading-tight">
              تصفح المزيد
            </span>
          </button>
        </div>

        <Separator className="mb-10 mt-5 border-muted" />

        <div className="flex flex-col lg:flex-row gap-8 items-start mt-10 min-h-[350px]">
          <div className="w-full lg:w-7/12">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedService.id + "-image"}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="overflow-hidden rounded-xl shadow-lg"
              >
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover aspect-[16/9]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="w-full lg:w-5/12 text-right flex flex-col items-start lg:items-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedService.id + "-details"}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <h3 className="mb-2 text-3xl font-bold text-foreground">
                  {selectedService.title}
                </h3>
                <p className="mb-6 text-base text-muted-foreground">
                  {selectedService.description}
                </p>

                {/* --- badges --- */}
                <div className="flex flex-wrap justify-start gap-2 mb-6">
                  {(selectedService.features || []).map((feature) => (
                    <Link to={feature.slug} key={feature.name}>
                      <Badge
                        variant="outline"
                        className={cn(
                          "cursor-pointer rounded-md bg-primary/5 text-primary border-primary/50 transition-colors duration-200",

                          "hover:bg-primary/10  hover:border-primary",
                          "dark:bg-primary/20 dark:text-primary-foreground"
                        )}
                      >
                        {feature.name}
                      </Badge>
                    </Link>
                  ))}
                </div>

                <div className="mt-8 max-w-xs">
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
    </section>
  );
};

export default FeaturedQuickServices;
