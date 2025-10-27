// src/components/AppHeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaApple, FaGooglePlay, FaCheckCircle } from "react-icons/fa";
import Iphone15Pro from "@/assets/logos/mockup.png";

// بيانات الميزات الصغيرة
const appFeatures = [
  { icon: FaCheckCircle, text: "فنيون معتمدون" },
  { icon: FaCheckCircle, text: "أسعار شفافة" },
  { icon: FaCheckCircle, text: "دعم 24/7" },
];

export default function AppHeroSection() {
  return (
    <section className="relative w-full bg-secondary py-10 md:py-5 text-foreground overflow-hidden">
      <div className="container relative z-10 max-w-screen-xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12 lg:justify-between">
        {/* الجانب الأيمن: النص والأزرار */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-right lg:order-1">
          <h4 className="text-lg text-primary font-semibold mb-2">
            تطبيق الهاتف
          </h4>
          <h2 className="text-xl font-extrabold tracking-tight leading-snug text-foreground mb-4 sm:text-2xl md:text-4xl">
            سرفانا – تطبيقك الموثوق للخدمات والفنيين
          </h2>

          <p className="text-lg text-secondary-foreground md:text-xl mb-2">
            احصل على الفنيين المميزين بسهولة وسرعة.
          </p>

          {/* أزرار التحميل */}
          <div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
            dir="rtl"
          >
            {/* زر App Store */}
            <Link to="/download/apple">
              <Button
                size="lg"
                className="
                  w-50 h-16 !px-3 flex items-center justify-center gap-3
                  rounded-radius
                  bg-primary text-primary-foreground
                  shadow-md transition-colors duration-300
                  hover:brightness-110
                "
              >
                <FaApple className="!h-9 !w-9" />
                <div className="text-right leading-tight">
                  <p className="text-xs opacity-80">حمّله من</p>
                  <p className="text-lg font-semibold tracking-wide">
                    App Store
                  </p>
                </div>
              </Button>
            </Link>

            {/* زر Google Play */}
            <Link to="/download/google">
              <Button
                size="lg"
                className="
                  w-50 h-16 !px-3 flex items-center justify-center gap-3
                  rounded-radius
                  !bg-primary-foreground !text-primary
                  transition-colors duration-300
                  hover:brightness-110
                "
              >
                <FaGooglePlay className="!h-7 !w-7" />
                <div className="text-right leading-tight">
                  <p className="text-xs opacity-80">احصل عليه من</p>
                  <p className="text-lg font-semibold tracking-wide">
                    Google Play
                  </p>
                </div>
              </Button>
            </Link>
          </div>

          {/* الميزات الصغيرة */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 lg:justify-start">
            {appFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <feature.icon className="h-3 w-3 text-primary" />
                <span className="font-semibold text-muted-foreground">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* الجانب الأيسر: صورة الموبايل (هنا التعديل) */}
        <div className="flex items-center justify-center lg:order-2">
          <motion.img
            src={Iphone15Pro}
            alt="Srvana App Mockup"
            className="w-full max-w-lg transform translate-y-20 drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)]"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          />
        </div>
      </div>
    </section>
  );
}
