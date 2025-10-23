import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import CountUp from "react-countup";
import TopTechnicians from "@/components/layout/TopTechnicians";
import AppHeroSection from "@/components/layout/AppHeroSection";
import FaqSection from "@/components/layout/FaqSection";
import BlogSection from "@/components/layout/BlogSection";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  FaUsers,
  FaHardHat,
  FaClipboardCheck,
  FaMapMarkerAlt,
  FaWrench,
  FaBox,
  FaArrowLeft,
  FaLightbulb,
  FaFaucet,
  FaFan,
  FaHammer,
} from "react-icons/fa";

// بيانات الخدمات الشائعة (للقسم الثاني)
const featuredServices = [
  {
    id: "ac-repair",
    title: "صيانة أجهزة التكييف",
    description:
      "نقدم صيانة شاملة وتركيب لجميع أنواع أجهزة التكييف للحفاظ على أدائها الأمثل.",
    image: "/assets/images/ac-repair.jpg", // صورة توضيحية لخدمة التكييف
    icon: FaFan,
    ctaLink: "/services/ac-repair",
  },
  {
    id: "electrical",
    title: "صيانة كهرباء",
    description:
      "إصلاح جميع الأعطال الكهربائية وتمديداتها، وتركيب الإضاءة وأنظمة الأمان.",
    image: "/assets/images/electrical-repair.jpg", // صورة توضيحية لخدمة الكهرباء
    icon: FaLightbulb,
    ctaLink: "/services/electrical",
  },
  {
    id: "plumbing",
    title: "صيانة سباكة",
    description:
      "حلول متكاملة لمشاكل السباكة، من إصلاح التسربات إلى تركيب الأدوات الصحية الحديثة.",
    image: "/assets/images/plumbing-repair.jpg", // صورة توضيحية لخدمة السباكة
    icon: FaFaucet,
    ctaLink: "/services/plumbing",
  },
  {
    id: "general-maintenance",
    title: "صيانة عامة للمنازل",
    description:
      "خدمات صيانة متنوعة للمنازل والمنشآت، تشمل النجارة والدهانات والتركيبات.",
    image: "/assets/images/general-maintenance.jpg", // صورة توضيحية لخدمة عامة
    icon: FaHammer,
    ctaLink: "/services/general-maintenance",
  },
];

// <<< 2. بيانات قسم الأرقام
const statsData = [
  {
    icon: FaUsers,
    endValue: 5000,
    label: "عميل سعيد",
    suffix: "+",
  },
  {
    icon: FaHardHat,
    endValue: 1000,
    label: "فني محترف",
    suffix: "+",
  },
  {
    icon: FaClipboardCheck,
    endValue: 20000,
    label: "خدمة مكتملة",
    suffix: "+",
  },
  {
    icon: FaMapMarkerAlt,
    endValue: 25,
    label: "مدينة مغطاة",
    suffix: "+",
  },
];

export default function HomePage() {
  const [selectedService, setSelectedService] = useState(featuredServices[0]);
  return (
    <>
      <section className="relative w-full py-20 md:py-32 lg:py-48 bg-background flex items-center justify-center text-center">
        <div className="container max-w-4xl px-4 md:px-6">
          {/* العنوان الرئيسي */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight mb-6">
            كل خدماتك في مكان واحد
          </h1>

          {/* الوصف */}
          <p className="text-lg md:text-xl text-muted-foreground mb-15 max-w-2xl mx-auto">
            من صيانة الأجهزة المنزلية إلى مشاريعك الكبيرة، نحن نوفر كل شيء
            بسهولة واحترافية.
          </p>

          {/* الأزرار */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/services/book">
              <Button size="lg" className="px-8 py-3 text-lg font-semibold">
                <FaWrench className="h-5 w-5 ml-2" />{" "}
                {/* أيقونة مفتاح للخدمات */}
                احجز خدمة
              </Button>
            </Link>
            <Link to="/projects-services">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 text-lg font-semibold"
              >
                <FaBox className="h-5 w-5 ml-2" /> {/* أيقونة حزمة للمشاريع */}
                خدمة المشاريع
              </Button>
            </Link>
          </div>

          {/* دعوة للعمل (CTA) للفنيين */}
          <Link
            to="/join-as-technician"
            className="inline-flex items-center text-primary hover:text-primary-foreground transition-colors group"
          >
            <span className="text-lg font-medium">هل أنت فني؟ انضم إلينا</span>
            <FaArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:translate-x-1" />{" "}
            {/* سهم متجه لليسار ليتناسب مع RTL */}
          </Link>
        </div>
      </section>
      {/* القسم الثاني: خدمات شائعة */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="mb-10 text-right">
            {" "}
            {/* عنوان القسم في اليمين */}
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              خدمات شائعة
            </h2>
            <Separator className="mt-4 w-24 bg-primary h-1 mr-auto ml-0" />{" "}
            {/* خط سميك تحت العنوان */}
          </div>

          {/* 1. الحاوية الرئيسية أصبحت هي البطاقة الموحدة */}
          <div className="bg-card rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3 overflow-hidden">
            {/* الجزء الأيمن: قائمة الخدمات (مع فاصل على اليسار للشاشات الكبيرة) */}
            {/* 2. تمت إزالة bg-card و shadow و rounded من هنا */}
            {/* 3. تمت إضافة md:border-l لإنشاء الفاصل */}
            <div className="md:col-span-1 p-4 md:p-6 md:border-l border-border">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                استكشف خدماتنا
              </h3>
              <nav className="space-y-4">
                {featuredServices.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service)} // ستبقى للضغط على الموبايل
                    onMouseEnter={() => setSelectedService(service)} // <<< هذا هو السطر الجديد للتفاعل عند المرور
                    className={`flex items-center gap-4 w-full p-4 rounded-md transition-colors duration-200 ease-in-out
        ${
          selectedService.id === service.id
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-background hover:bg-muted text-foreground"
        }`}
                  >
                    <service.icon className="h-6 w-6 shrink-0" />
                    <span className="text-lg font-medium">{service.title}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* الجزء الأيسر: تفاصيل الخدمة المختارة */}
            {/* 4. تمت إزالة bg-card و shadow و rounded من هنا أيضًا */}
            <div className="md:col-span-2 p-4 md:p-8 flex flex-col items-center text-center md:items-start md:text-right">
              {selectedService && (
                <>
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    width={800}
                    height={450}
                    className="w-full max-h-[450px] object-cover rounded-lg mb-6 shadow-md"
                  />
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {selectedService.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-8">
                    {selectedService.description}
                  </p>
                  <Link to={selectedService.ctaLink}>
                    <Button
                      size="lg"
                      className="px-8 py-3 text-lg font-semibold"
                    >
                      اطلب هذه الخدمة
                      <FaArrowLeft className="h-5 w-5 mr-2" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* --- القسم الثالث الجديد: شريط الأرقام --- */}
      <section className="w-full py-16 md:py-24 bg-muted/50">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              إنجازاتنا بالأرقام
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              نفخر بما حققناه من ثقة ونجاح مع عملائنا وشركائنا.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl shadow-lg flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-primary/20"
              >
                <stat.icon className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-4xl lg:text-5xl font-extrabold text-primary">
                  {/* <<< 3. استخدام CountUp هنا */}
                  <CountUp
                    end={stat.endValue}
                    duration={3} // مدة العد بالثواني
                    separator="," // فاصل الآلاف
                    suffix={stat.suffix}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </h3>
                <p className="text-md md:text-lg text-muted-foreground mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <<< الفنيين الاوائل*/}
      <TopTechnicians />
      {/* <<< قسم التطبيق الجديد */}
      <AppHeroSection />
      {/* <<< قسم الأسئلة الشائعة*/}
      <FaqSection />
      {/* <<< قسم المدونة هنا */}
      <BlogSection />
    </>
  );
}
