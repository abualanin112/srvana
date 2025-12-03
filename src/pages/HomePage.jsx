import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GearIcon, BoxIcon } from "@radix-ui/react-icons";
import { Spinner } from "@/components/ui/spinner";

import headerBg from "@/assets/header-bg.webp";

// Lazy load heavy sections
const TopTechnicians = React.lazy(() =>
  import("@/components/layout/TopTechnicians")
);
const AppHeroSection = React.lazy(() =>
  import("@/components/layout/AppHeroSection")
);
const FaqSection = React.lazy(() => import("@/components/layout/FaqSection"));
const FeaturedQuickServices = React.lazy(() =>
  import("@/components/layout/FeaturedQuickServices")
);
const LegacyOfTrustSection = React.lazy(() =>
  import("@/components/layout/LegacyOfTrustSection")
);
const ComplexServicesSection = React.lazy(() =>
  import("@/components/layout/ComplexServicesSection")
);
const TestimonialsSection = React.lazy(() =>
  import("@/components/layout/TestimonialsSection")
);

export default function HomePage() {
  return (
    <>
      <section className="relative w-full h-screen overflow-hidden -mt-16">
        {/* Gradient Overlay  */}
        <div
          className="absolute inset-0 bg-background bg-cover bg-no-repeat z-0"
          style={{ backgroundImage: `url(${headerBg})` }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-background/90 via-background/70 to-background/40"></div>
        </div>

        {/* المحتوى الرئيسي */}
        <div
          className="relative z-20 container max-w-8xl px-6 md:px-8 lg:px-12 flex flex-col items-start justify-center h-full text-right mx-auto"
          dir="rtl"
        >
          {/* العنوان الرئيسي - محسّن */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] my-6 drop-shadow-2xl animate-slide-up">
            كل{" "}
            <span className="text-primary drop-shadow-[0_0_30px_rgba(var(--primary),0.5)]">
              خدماتك
            </span>
            <br />
            في مكان واحد
          </h1>

          {/* الوصف - محسّن */}
          <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-muted-foreground mb-10 max-w-3xl drop-shadow-lg animate-slide-up animation-delay-100">
            من صيانة الأجهزة المنزلية إلى مشاريعك الكبيرة، نحن نوفر كل شيء في
            سرفانا
          </p>

          {/* الأزرار - محسّنة */}
          <div className="flex flex-wrap items-center gap-4 mb-6 animate-slide-up animation-delay-200">
            <Button
              size="lg"
              className="h-14 px-8 text-base font-bold shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300 gap-2"
              asChild
            >
              <Link to="/services/book">
                <GearIcon className="w-5 h-5" />
                خدمة سريعة
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 text-base font-bold bg-background/10 backdrop-blur-sm border-2 border-foreground/30 text-foreground hover:bg-background hover:text-primary hover:scale-105 transition-all duration-300 gap-2"
              asChild
            >
              <Link to="/projects-services">
                <BoxIcon className="w-5 h-5" />
                خدمة مخصصة
              </Link>
            </Button>
          </div>

          {/* Trust Indicators - جديد */}
          <div className="flex flex-wrap items-center gap-6 mb-6 text-muted-foreground animate-fade-in animation-delay-300">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold">+5000 عميل سعيد</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-semibold">فنيين معتمدين</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-semibold">خدمة 24/7</span>
            </div>
          </div>

          {/* دعوة للعمل (CTA) للفنيين - محسّنة */}
          <p className="text-base font-medium text-muted-foreground backdrop-blur-sm bg-background/5 px-4 py-2 rounded-lg inline-block animate-fade-in animation-delay-400">
            هل أنت فني؟{" "}
            <Link
              to="/join-as-technician"
              className="text-primary font-bold underline underline-offset-4 hover:no-underline hover:text-primary/80 transition-colors"
            >
              انضم إلينا الآن
            </Link>
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="w-full py-20 flex justify-center">
            <Spinner className="size-10" />
          </div>
        }
      >
        {/* القسم الثاني: خدمات شائعة */}
        <FeaturedQuickServices />

        {/* --- القسم الثالث : شريط الأرقام --- */}
        <LegacyOfTrustSection />

        {/* <<< قسم المشاريع  */}
        <ComplexServicesSection />

        {/* <<< قسم التطبيق  */}
        <AppHeroSection />

        {/* <<< الفنيين الاوائل*/}
        <TopTechnicians />

        {/* سكشن اراء العملاء*/}
        <TestimonialsSection />

        {/* <<< قسم الأسئلة الشائعة*/}
        <FaqSection />
      </Suspense>
    </>
  );
}
