import React from "react";
import { Link } from "react-router-dom";
import TopTechnicians from "@/components/layout/TopTechnicians";
import AppHeroSection from "@/components/layout/AppHeroSection";
import FaqSection from "@/components/layout/FaqSection";
// import BlogSection from "@/components/layout/BlogSection";
import FeaturedQuickServices from "@/components/layout/FeaturedQuickServices";
import LegacyOfTrustSection from "@/components/layout/LegacyOfTrustSection";
import ComplexServicesSection from "@/components/layout/ComplexServicesSection";
import TestimonialsSection from "@/components/layout/TestimonialsSection";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import BubbleBackground from "@/components/ui/BubbleBackground";

import { Wrench, Package } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <section className="relative w-full h-screen overflow-hidden bg-transparent -mt-16">
        {/* الخلفية المتحركة */}
        <BubbleBackground interactive className="absolute inset-0 z-0 ">
          {/* المحتوى فوق الخلفية */}
          <div className="relative z-20 container max-w-6xl px-4 md:px-6 flex flex-col items-center justify-center h-full text-center mx-auto">
            {/* العنوان الرئيسي */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary leading-tight my-6">
              كل <span className="text-secondary"> خدماتك </span>في مكان واحد
            </h1>

            {/* الوصف */}
            <p className="text-lg  md:text-2xl leading-10 text-primary-foreground mb-14 max-w-2xl mx-auto">
              من صيانة الأجهزة المنزلية إلى مشاريعك الكبيرة، نحن نوفر كل شيء في
              سرفانا — المكان الذي يجمع بين الراحة والثقة.
            </p>

            {/* الأزرار */}
            <div className="flex flex-col sm:grid sm:grid-cols-2 items-center justify-center gap-4 mb-8">
              <Button size="md" className="!p-3 !text-sm !font-medium" asChild>
                <Link to="/services/book">
                  <Wrench />
                  خدمة سريعة
                </Link>
              </Button>

              <Button
                variant="secondary"
                size="md"
                className="!p-3 !text-sm !font-medium"
                asChild
              >
                <Link to="/projects-services">
                  <Package />
                  خدمة مخصصة
                </Link>
              </Button>
            </div>

            {/* دعوة للعمل (CTA) للفنيين */}
            <p className="text-sm font-medium text-primary text-shadow-2xl ">
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

      {/* <<< قسم المدونة  */}
      {/* <BlogSection /> */}
    </>
  );
}
