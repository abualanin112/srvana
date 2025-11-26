"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DownloadIcon,
  StarIcon,
  LockClosedIcon,
  ClockIcon,
  MobileIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";
import appMockup from "@/assets/logos/mockup.webp";

const AppHeroSection = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-primary text-primary-foreground overflow-hidden relative">
      {/* خلفية زخرفية خفيفة */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* --- النص والمحتوى (يمين) --- */}
          <div className="w-full lg:w-1/2 text-right space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 px-4 py-1.5 rounded-full border border-primary-foreground/20 backdrop-blur-sm">
              <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium">
                التطبيق الأول للخدمات المنزلية
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              خدماتك المنزلية.. <br />
              <span className="text-secondary">بلمسة واحدة</span> من جوالك!
            </h2>

            <p className="text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
              حمل تطبيق سرفانا الآن واستمتع بتجربة فريدة في طلب الخدمات. سباكة،
              كهرباء، تكييف، تنظيف، والمزيد.. فنيين محترفين بانتظارك.
            </p>

            {/* مميزات التطبيق */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: LockClosedIcon, text: "ضمان على جميع الخدمات" },
                { icon: ClockIcon, text: "وصول سريع في الموعد" },
                { icon: MobileIcon, text: "سهولة في الحجز والدفع" },
                { icon: CheckCircledIcon, text: "فنيين مدربين وموثقين" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-primary-foreground/20 p-2 rounded-lg">
                    <item.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* أزرار التحميل */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 h-14 px-6 text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <DownloadIcon className="w-5 h-5" />
                حمل التطبيق الآن
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 h-14 px-6 text-lg bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all"
              >
                <MobileIcon className="w-5 h-5" />
                تصفح الخدمات
              </Button>
            </div>
          </div>

          {/* --- صورة التطبيق (يسار) --- */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
            {/* دائرة خلفية للتزيين */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-secondary/20 rounded-full blur-3xl -z-10"></div>

            <div className="relative z-10">
              <img
                src={appMockup}
                alt="تطبيق سرفانا"
                className="w-full max-w-md drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* كارد عائم للتزيين */}
              <div className="absolute top-10 -right-10 bg-card text-card-foreground p-4 rounded-xl shadow-xl animate-bounce duration-3000 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircledIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">حالة الطلب</p>
                    <p className="font-bold text-sm">تم الإنجاز بنجاح </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppHeroSection;
