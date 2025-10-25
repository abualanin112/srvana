import React from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import TopTechnicians from "@/components/layout/TopTechnicians";
import AppHeroSection from "@/components/layout/AppHeroSection";
import FaqSection from "@/components/layout/FaqSection";
import BlogSection from "@/components/layout/BlogSection";
import FeaturedQuickServices from "@/components/layout/FeaturedQuickServices";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import BubbleBackground from "@/components/ui/BubbleBackground";

import {
  FaUsers,
  FaHardHat,
  FaClipboardCheck,
  FaMapMarkerAlt,
  FaWrench,
  FaBox,
  // FaArrowLeft,
  // FaLightbulb,
  // FaFaucet,
  // FaFan,
  // FaHammer,
} from "react-icons/fa";

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
  return (
    <>
      <section className="relative w-full h-screen overflow-hidden bg-transparent -mt-16">
        {/* الخلفية المتحركة */}
        <BubbleBackground interactive className="absolute inset-0 z-0 ">
          {/* المحتوى فوق الخلفية */}
          <div className="relative z-20 container max-w-6xl px-4 md:px-6 flex flex-col items-center justify-center h-full text-center mx-auto">
            {/* العنوان الرئيسي */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-primary leading-tight my-6">
              كل <span className="text-secondary"> خدماتك </span>في مكان واحد
            </h1>

            {/* الوصف */}
            <p className="text-xl md:text-2xl text-primary-foreground mb-18 max-w-2xl mx-auto">
              من صيانة الأجهزة المنزلية إلى مشاريعك الكبيرة، نحن نوفر كل شيء
              بسهولة واحترافية
            </p>

            {/* الأزرار */}
            <div className="flex flex-col sm:grid sm:grid-cols-2 items-center justify-center gap-4 mb-12">
              <Button size="lg" className="w-full py-6" asChild>
                <Link to="/services/book">
                  <FaWrench className="h-5 w-5" />
                  احجز خدمة سريعة
                </Link>
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="w-full py-6"
                asChild
              >
                <Link to="/projects-services">
                  <FaBox className="h-5 w-5" />
                  اطلب خدمة مخصصة
                </Link>
              </Button>
            </div>

            {/* دعوة للعمل (CTA) للفنيين */}
            <p className="text-lg font-medium text-primary ">
              هل أنت فني؟{" "}
              <Link
                to="/join-as-technician"
                className="text-primary-foreground underline underline-offset-4 hover:no-underline"
              >
                انضم إلينا
              </Link>
            </p>
          </div>
        </BubbleBackground>
      </section>

      {/* القسم الثاني: خدمات شائعة */}
      <FeaturedQuickServices />

      {/* --- القسم الثالث : شريط الأرقام --- */}
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
