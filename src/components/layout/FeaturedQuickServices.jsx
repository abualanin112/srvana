// src/components/layout/FeaturedQuickServices.jsx
"use client";

import React, { useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// أيقونات
import {
  ArrowLeftIcon,
  MixerHorizontalIcon,
  OpacityIcon,
  LightningBoltIcon,
  Pencil2Icon,
  PlusIcon,
} from "@radix-ui/react-icons";

//  الصور
import acCleaningImg from "@/assets/FeaturedQuickServices-img/ac-cleaning.png";
import plumbingImg from "@/assets/FeaturedQuickServices-img/plumbing-leaks.png";
import electricalImg from "@/assets/FeaturedQuickServices-img/electrical-fixing.png";
import paintingImg from "@/assets/FeaturedQuickServices-img/painting.png";

// --- بيانات الخدمات ---
const quickServicesData = [
  {
    id: "plumbing",
    title: "السباكة",
    description:
      "الأعلى طلبًا يوميًا — حلول سريعة لجميع مشاكل السباكة في منزلك.",
    icon: OpacityIcon,
    image: plumbingImg,
    features: [
      {
        name: "إصلاح تسريبات المياه",
        slug: "/services/plumbing/leak-repair",
      },
      {
        name: "كشف وتسليك انسداد",
        slug: "/services/plumbing/clog-clearing",
      },
      {
        name: "تغيير المحابس والخلاطات",
        slug: "/services/plumbing/faucet-replacement",
      },
      {
        name: "تركيب أحواض وتواليت",
        slug: "/services/plumbing/sink-toilet-installation",
      },
      {
        name: "إصلاح مواسير مكسورة",
        slug: "/services/plumbing/pipe-repair",
      },
      {
        name: "صيانة السخانات",
        slug: "/services/plumbing/heater-maintenance",
      },
      {
        name: "تركيب السخانات",
        slug: "/services/plumbing/heater-installation",
      },
      {
        name: "كشف تسريب حراري",
        slug: "/services/plumbing/thermal-leak-detection",
      },
    ],
  },
  {
    id: "electrical",
    title: "الكهرباء",
    description: "إصلاح وتركيب كهربائي آمن وموثوق لمنزلك ومكتبك.",
    icon: LightningBoltIcon,
    image: electricalImg,
    features: [
      {
        name: "إصلاح أعطال كهرباء",
        slug: "/services/electrical/fault-repair",
      },
      {
        name: "تغيير مفاتيح وبرايز",
        slug: "/services/electrical/switch-socket-replacement",
      },
      {
        name: "تركيب لمبات وسبوتات",
        slug: "/services/electrical/light-installation",
      },
      {
        name: "تركيب نجف",
        slug: "/services/electrical/chandelier-installation",
      },
      {
        name: "تمديد كابلات",
        slug: "/services/electrical/cable-extension",
      },
      {
        name: "تركيب أجهزة كهربائية",
        slug: "/services/electrical/appliance-installation",
      },
      {
        name: "إصلاح لوحة الكهرباء",
        slug: "/services/electrical/panel-repair",
      },
      {
        name: "كشف الأحمال ومشاكل الأمان",
        slug: "/services/electrical/load-safety-check",
      },
    ],
  },
  {
    id: "hvac",
    title: "التكييف",
    description: "صيانة وتركيب وإصلاح جميع أنواع أجهزة التكييف.",
    icon: MixerHorizontalIcon,
    image: acCleaningImg,
    features: [
      {
        name: "صيانة التكييف",
        slug: "/services/hvac/ac-maintenance",
      },
      {
        name: "تنظيف وغسيل التكييف",
        slug: "/services/hvac/ac-cleaning",
      },
      {
        name: "شحن فريون",
        slug: "/services/hvac/freon-recharge",
      },
      {
        name: "تركيب تكييف سبليت",
        slug: "/services/hvac/split-ac-installation",
      },
      {
        name: "تركيب تكييف شباك",
        slug: "/services/hvac/window-ac-installation",
      },
      {
        name: "صيانة التكييف المركزي",
        slug: "/services/hvac/central-ac-maintenance",
      },
      {
        name: "إصلاح أعطال التكييف",
        slug: "/services/hvac/ac-repair",
      },
    ],
  },
  {
    id: "appliance-repair",
    title: "صيانة الأجهزة",
    description: "إصلاح وصيانة جميع الأجهزة الكهربائية المنزلية.",
    icon: MixerHorizontalIcon,
    image: electricalImg,
    features: [
      {
        name: "صيانة الثلاجات",
        slug: "/services/appliance-repair/refrigerator-repair",
      },
      {
        name: "صيانة الديب فريزر",
        slug: "/services/appliance-repair/freezer-repair",
      },
      {
        name: "صيانة الغسالات",
        slug: "/services/appliance-repair/washer-repair",
      },
      {
        name: "صيانة المجففات",
        slug: "/services/appliance-repair/dryer-repair",
      },
      {
        name: "صيانة الميكروويف",
        slug: "/services/appliance-repair/microwave-repair",
      },
      {
        name: "صيانة البوتاجازات والأفران",
        slug: "/services/appliance-repair/stove-oven-repair",
      },
      {
        name: "صيانة السخانات",
        slug: "/services/appliance-repair/heater-repair",
      },
      {
        name: "صيانة المكانس",
        slug: "/services/appliance-repair/vacuum-repair",
      },
      {
        name: "إصلاح الأجهزة الصغيرة",
        slug: "/services/appliance-repair/small-appliance-repair",
      },
      {
        name: "خدمات الطوارئ للأجهزة",
        slug: "/services/appliance-repair/emergency-service",
      },
    ],
  },
  {
    id: "carpentry",
    title: "النجارة والحدادة",
    description: "أعمال نجارة وحدادة خفيفة لمنزلك ومكتبك.",
    icon: Pencil2Icon,
    image: paintingImg,
    features: [
      {
        name: "إصلاح أبواب خشب",
        slug: "/services/carpentry/door-repair",
      },
      {
        name: "تعديل وضبط مفصلات",
        slug: "/services/carpentry/hinge-adjustment",
      },
      {
        name: "تركيب غرف نوم",
        slug: "/services/carpentry/bedroom-installation",
      },
      {
        name: "تركيب مطابخ جاهزة",
        slug: "/services/carpentry/kitchen-installation",
      },
      {
        name: "تفصيل دواليب",
        slug: "/services/carpentry/custom-closets",
      },
      {
        name: "تجميع أثاث",
        slug: "/services/carpentry/furniture-assembly",
      },
      {
        name: "تصليح شبابيك خشب",
        slug: "/services/carpentry/window-repair",
      },
      {
        name: "تركيب أرفف وخزائن",
        slug: "/services/carpentry/shelf-cabinet-installation",
      },
      {
        name: "تغييرات سريعة للديكور الخشبي",
        slug: "/services/carpentry/quick-decor-changes",
      },
    ],
  },
  {
    id: "handyman",
    title: "خدمات عامة",
    description: "أعمال تركيب وصيانة سريعة لجميع احتياجاتك المنزلية.",
    icon: MixerHorizontalIcon,
    image: plumbingImg,
    features: [
      {
        name: "تركيب ستائر",
        slug: "/services/handyman/curtain-installation",
      },
      {
        name: "تركيب شاشة",
        slug: "/services/handyman/tv-mounting",
      },
      {
        name: "تعليق مرايا",
        slug: "/services/handyman/mirror-hanging",
      },
      {
        name: "تركيب أرفف",
        slug: "/services/handyman/shelf-installation",
      },
      {
        name: "فك/تركيب غرف نوم",
        slug: "/services/handyman/bedroom-assembly",
      },
      {
        name: "نقل أثاث وتركيبه",
        slug: "/services/handyman/furniture-moving",
      },
      {
        name: "إصلاحات منزلية بسيطة",
        slug: "/services/handyman/minor-repairs",
      },
      {
        name: "تبديل أكواد / مفاتيح",
        slug: "/services/handyman/lock-replacement",
      },
      {
        name: "تركيب دش وريسيفر",
        slug: "/services/handyman/dish-receiver-installation",
      },
      {
        name: "إصلاح أبواب وشبابيك بسيطة",
        slug: "/services/handyman/door-window-repair",
      },
    ],
  },
  {
    id: "roofing",
    title: "الأسقف والعزل",
    description: "حلول متكاملة لعزل وإصلاح الأسطح والأسقف.",
    icon: OpacityIcon,
    image: acCleaningImg,
    features: [
      {
        name: "إصلاح تسريبات السقف",
        slug: "/services/roofing/roof-leak-repair",
      },
      {
        name: "عزل الأسطح (مائي/حراري)",
        slug: "/services/roofing/roof-insulation",
      },
      {
        name: "تركيب أسقف جديدة",
        slug: "/services/roofing/new-roof-installation",
      },
      {
        name: "أسقف قرميد",
        slug: "/services/roofing/tile-roofing",
      },
      {
        name: "أسقف معدنية",
        slug: "/services/roofing/metal-roofing",
      },
      {
        name: "دهان الأسطح",
        slug: "/services/roofing/roof-painting",
      },
      {
        name: "تنظيف الأسطح",
        slug: "/services/roofing/roof-cleaning",
      },
      {
        name: "سد الشقوق والفواصل",
        slug: "/services/roofing/crack-sealing",
      },
      {
        name: "تركيب مظلات على الأسطح",
        slug: "/services/roofing/canopy-installation",
      },
    ],
  },
];

const ServiceButton = memo(({ service, isSelected, onSelect }) => (
  <button
    onClick={() => onSelect(service)}
    onMouseEnter={() => onSelect(service)}
    className={cn(
      "flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl transition-all duration-200 ease-in-out transform",
      isSelected ? "text-secondary" : "text-primary hover:text-secondary"
    )}
    aria-label={service.title}
  >
    <service.icon className="h-7 w-7 md:h-8 md-w-8" />
    <span className="text-xs md:text-sm font-semibold text-center leading-tight">
      {service.title}
    </span>
  </button>
));

ServiceButton.displayName = "ServiceButton";

const FeaturedQuickServices = () => {
  const [selectedService, setSelectedService] = useState(quickServicesData[0]);

  const handleSelectService = useCallback((service) => {
    setSelectedService(service);
  }, []);

  return (
    <section className="w-full py-16 md:py-24 bg-background overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 ">
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
            <ServiceButton
              key={service.id}
              service={service}
              isSelected={selectedService.id === service.id}
              onSelect={handleSelectService}
            />
          ))}
          <Link to="/services">
            <button
              className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl transition-all duration-200 ease-in-out transform text-muted-foreground hover:text-secondary"
              aria-label="المزيد"
            >
              <PlusIcon className="h-7 w-7 md:h-8 md-w-8" />
              <span className="text-xs md:text-sm font-semibold text-center leading-tight">
                تصفح المزيد
              </span>
            </button>
          </Link>
        </div>

        <Separator className="mb-10 mt-5 border-muted" />

        <div className="flex flex-col lg:flex-row gap-8 items-start mt-10 min-h-[350px]">
          <div className="w-full lg:w-7/12">
            <div
              key={selectedService.id + "-image"}
              className="overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover aspect-video"
                loading="lazy"
              />
            </div>
          </div>

          <div className="w-full lg:w-5/12 text-right flex flex-col items-start lg:items-end">
            <div key={selectedService.id + "-details"} className="w-full">
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
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedQuickServices;
