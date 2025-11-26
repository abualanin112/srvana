// src/components/layout/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// logo
import CustomLogo from "@/components/ui/CustomLogo";

// Radix Icons
import {
  LaptopIcon,
  PlayIcon,
  GlobeIcon,
  TwitterLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

// بيانات الروابط
const footerLinks1 = [
  { href: "/help", text: "مركز المساعدة" },
  { href: "/contact", text: "تواصل معنا" },
  { href: "/about", text: "من نحن" },
  { href: "/blog", text: "مدونتنا" },
  { href: "/careers", text: "انضم إلى فريقنا" },
  { href: "/vouchers", text: "شراء قسيمة" },
  { href: "/faq", text: "الأسئلة الشائعة" },
];

const footerLinks2 = [
  { href: "/refer", text: "ادعُ صديقك" },
  { href: "/join-as-technician", text: "سجّل كفني" },
  { href: "/services", text: "خدماتنا" },
  { href: "/locations", text: "مواقعنا" },
  { href: "/privacy", text: "سياسة الخصوصية" },
  { href: "/terms", text: "الشروط والأحكام" },
  { href: "/partners", text: "شركاؤنا" },
];

const socialLinks = [
  { href: "#", icon: GlobeIcon, label: "Facebook" },
  { href: "#", icon: TwitterLogoIcon, label: "Twitter" },
  { href: "#", icon: InstagramLogoIcon, label: "Instagram" },
  { href: "#", icon: LinkedInLogoIcon, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-foreground" dir="rtl">
      <div className="container max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-5">
          {/* القسم الأول: الشعار والوصف */}
          <div className="md:col-span-3 lg:col-span-2">
            <Link to="/" className="inline-block mb-2 ">
              <CustomLogo className="w-75 drop-shadow-xl text-primary-foreground" />
            </Link>
            <p className="max-w-xs text-primary-foreground/80 text-justify">
              سرفانا – منصتك الموثوقة للخدمات والفنيين في مدينتك. نوفر لك تجربة
              سلسة وآمنة للعثور على أفضل الفنيين المعتمدين في مختلف المجالات.مع
              متابعة دقيقة لكل خطوة من طلبك حتى إنجاز.
            </p>
          </div>

          {/* القسم الثاني: القوائم */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="grid grid-cols-2 gap-8">
              <div>
                {footerLinks1.map((link) => (
                  <Link
                    key={link.text}
                    to={link.href}
                    className="block mb-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
              <div>
                {footerLinks2.map((link) => (
                  <Link
                    key={link.text}
                    to={link.href}
                    className="block mb-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* القسم الثالث: تحميل التطبيق */}
          {/* أزرار التحميل */}
          <div>
            <h3 className="font-bold text-primary-foreground mb-4">
              حمّل تطبيق سرفانا
            </h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              وابدأ في الوصول إلى الخدمات والفنيين بسهولة.
            </p>
            <div className="flex flex-col items-right gap-4" dir="rtl">
              {/* زر App Store */}
              <Link to="/download/apple">
                <Button
                  size="md"
                  variant="secondary"
                  className="
                            w-50 h-16 !px-3 flex items-center justify-center gap-3
                            rounded-radius
                            !text-primary
                            !transition-colors !duration-300
                            hover:!brightness-110
                          "
                >
                  <LaptopIcon className="!h-9 !w-9" />
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
                  size="md"
                  className="
                            w-50 h-16 !px-3 flex items-center justify-center gap-3
                            rounded-radius
                            !bg-primary-foreground !text-primary
                            hover:!bg-primary-foreground/90
                          "
                >
                  <PlayIcon className="!h-7 !w-7" />
                  <div className="text-right leading-tight">
                    <p className="text-xs opacity-80">احصل عليه من</p>
                    <p className="text-lg font-semibold tracking-wide">
                      Google Play
                    </p>
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        <div className="flex flex-col-reverse items-center gap-4 md:flex-row md:justify-between">
          <p className="text-sm text-primary-foreground/80">
            © 2025 سرفانا. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
