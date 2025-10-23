// src/components/AppHeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaApple, FaGooglePlay, FaCheckCircle } from "react-icons/fa";

// بيانات الميزات الصغيرة
const appFeatures = [
  { icon: FaCheckCircle, text: "فنيون معتمدون" },
  { icon: FaCheckCircle, text: "أسعار شفافة" },
  { icon: FaCheckCircle, text: "دعم 24/7" },
];

export default function AppHeroSection() {
  return (
    <section className="relative w-full bg-background overflow-hidden py-16 md:py-24">
      {/* خلفية مع Overlay */}
      <div className="absolute inset-0 bg-[url('/assets/images/app-bg.svg')] bg-cover bg-center opacity-5"></div>
      <div className="absolute inset-0 bg-gradientq-to-t from-card via-card/90 to-card/70"></div>

      <div className="container relative z-10 mx-auto px-4 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* الجانب الأيمن: النص والأزرار */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-right">
          <h1 className="text-xl font-extrabold tracking-tight leading-snug text-foreground sm:text-3xl md:text-5xl">
            سرفانا – تطبيقك الموثوق للخدمات والفنيين
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            احصل على الفنيين المميزين بسهولة وسرعة – طلبك يصل في دقائق معدودة.
          </p>

          {/* أزرار التحميل */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link to="/download/apple">
              <Button
                size="lg"
                className="w-48 transform transition hover:scale-105 py-7"
              >
                <FaApple className="ml-3 h-7 w-7" />
                <div>
                  <p className="text-xs">Download on the</p>
                  <p className="text-xl font-semibold">App Store</p>
                </div>
              </Button>
            </Link>
            <Link to="/download/google">
              <Button
                size="lg"
                variant="outline"
                className="w-48 transform transition hover:scale-105 hover:bg-accent py-7" // <<< تمت إضافة py-7 هنا
              >
                <FaGooglePlay className="ml-3 h-7 w-7" />
                <div>
                  <p className="text-xs">GET IT ON</p>
                  <p className="text-xl font-semibold">Google Play</p>
                </div>
              </Button>
            </Link>
          </div>

          {/* الميزات الصغيرة */}
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 lg:justify-start">
            {appFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <feature.icon className="h-5 w-5 text-primary" />
                <span className="font-semibold text-muted-foreground">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* الجانب الأيسر: صورة الموبايل */}
        <div className="flex items-center justify-center">
          <img
            src="/assets/images/app-mockup.png"
            alt="Srvana App Mockup"
            className="w-full max-w-sm drop-shadow-[0_25px_25px_rgba(76,79,207,0.15)]"
          />
        </div>
      </div>
    </section>
  );
}
