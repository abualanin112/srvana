// src/components/layout/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// React Icons
import {
  FaApple,
  FaGooglePlay,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

// بيانات الروابط المحدثة (قائمتان فقط)
const footerLinks1 = [
  { href: "/help", text: "Help Centre" },
  { href: "/contact", text: "Contact Us" },
  { href: "/about", text: "About Us" },
  { href: "/blog", text: "Our Blog" },
  { href: "/careers", text: "Careers" },
  { href: "/vouchers", text: "Buy a Voucher" },
];

const footerLinks2 = [
  { href: "/refer", text: "Refer a Friend" },
  { href: "/join-as-technician", text: "Apply as a Worker" },
  { href: "/services", text: "Our Services" },
  { href: "/locations", text: "Our Locations" },
  { href: "/privacy", text: "Privacy Policy" },
  { href: "/terms", text: "Terms & Conditions" },
];

const socialLinks = [
  { href: "#", icon: FaFacebookF, label: "Facebook" },
  { href: "#", icon: FaTwitter, label: "Twitter" },
  { href: "#", icon: FaInstagram, label: "Instagram" },
  { href: "#", icon: FaLinkedinIn, label: "LinkedIn" },
];

export default function Footer() {
  return (
    // 1. تغيير الخلفية إلى bg-primary والنص إلى text-primary-foreground
    <footer className="w-full bg-primary text-primary-foreground">
      <div className="container max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-5">
          {/* القسم الأول: الشعار والوصف */}
          <div className="md:col-span-3 lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              {/* قد تحتاج لشعار نسخة فاتحة إذا كان الأصلي داكنًا */}
              <img
                src="/assets/images/logo-light.svg"
                alt="Srvana Logo"
                className="h-10"
              />
            </Link>
            <p className="max-w-xs text-primary-foreground/80">
              {" "}
              {/* استخدام شفافية طفيفة للوصف */}
              سرفانا – منصتك الموثوقة للخدمات والفنيين في مدينتك.
            </p>
          </div>

          {/* القسم الثاني: القوائم (قائمتان فقط) */}
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
          <div className="md:col-span-1 lg:col-span-1">
            <h3 className="font-bold text-primary-foreground mb-4">
              حمّل تطبيق سرفانا
            </h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              وابدأ الوصول للخدمات والفنيين بسهولة.
            </p>
            <div className="flex flex-col gap-4">
              {" "}
              {/* زيادة الفجوة بين الأزرار قليلاً إلى gap-4 */}
              {/* زر App Store - الأكثر بروزًا */}
              <Button
                variant="secondary" // خلفية فاتحة (عادة أبيض أو رمادي فاتح جدًا)
                className="w-full py-8 transform transition hover:scale-105 justify-start text-primary"
              >
                <FaApple className="ml-4 h-8 w-8" />{" "}
                {/* زيادة حجم الأيقونة قليلاً */}
                <div className="text-right">
                  <p className="text-xs opacity-80">Download on the</p>
                  <p className="text-xl font-bold leading-none mt-0.5">
                    App Store
                  </p>{" "}
                  {/* زيادة حجم الخط وجعله bold */}
                </div>
              </Button>
              {/* زر Google Play - مميز بإطار (Outline) */}
              <Button
                variant="outline" // خلفية شفافة مع إطار
                className="w-full py-8 transform transition hover:scale-105 hover:bg-primary-foreground/10 justify-start border-primary-foreground/30 text-primary"
              >
                <FaGooglePlay className="ml-4 h-7 w-7" />{" "}
                {/* Google Play أيقونته تبدو أكبر بصريًا، لذا نصغرها قليلاً للموازنة */}
                <div className="text-right">
                  <p className="text-xs opacity-80">GET IT ON</p>
                  <p className="text-xl font-bold leading-none mt-0.5">
                    Google Play
                  </p>
                </div>
              </Button>
            </div>
          </div>
        </div>
        {/* 2. إضافة خط فاصل */}
        <Separator className="my-8 bg-primary-foreground/20" />{" "}
        {/* لون فاتح للخط */}
        {/* القسم الأخير: السطر السفلي */}
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
