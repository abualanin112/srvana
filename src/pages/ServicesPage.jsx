import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  StarFilledIcon,
  StarIcon,
  HomeIcon,
  OpacityIcon,
  LightningBoltIcon,
  MixerHorizontalIcon,
  Pencil2Icon,
  RocketIcon,
  LayersIcon,
  ViewGridIcon,
  BoxModelIcon,
  SunIcon,
  ScissorsIcon,
  DesktopIcon,
  ArrowLeftIcon,
} from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { servicesData } from "@/data/servicesData";

// --- Custom Icons for Metadata (Lucide Style) ---
const WrenchIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const ShieldCheckIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const AlarmIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2 2" />
    <path d="M5 3 2 6" />
    <path d="m22 6-3-3" />
    <path d="M6.38 18.7 4 21" />
    <path d="M17.64 18.67 20 21" />
  </svg>
);

const HardHatIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
    <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
    <path d="M4 15v-3a6 6 0 0 1 6-6h0" />
    <path d="M14 6h0a6 6 0 0 1 6 6v3" />
  </svg>
);

// --- RatingStars Component (Matches TopTechnicians) ---
const RatingStars = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }, (_, i) => {
      const isFilled = i < Math.floor(rating);
      return isFilled ? (
        <StarFilledIcon
          key={i}
          className="w-3.5 h-3.5"
          style={{ color: "#FFD700" }}
        />
      ) : (
        <StarIcon key={i} className="w-3.5 h-3.5 text-muted-foreground/30" />
      );
    })}
  </div>
);

// --- مكون لإبراز النص المطابق للبحث ---
const HighlightedText = ({ text, highlight }) => {
  if (!highlight || !text) return <span>{text}</span>;

  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span
            key={i}
            className="font-bold text-primary bg-primary/10 rounded-xs px-0.5"
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

// --- مكون بطاقة الخدمة (Redesigned - Overlay Style) ---
const ServiceCard = ({ service, searchQuery }) => {
  return (
    <Card className="group relative flex flex-col rounded-2xl border-0 bg-card shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden p-0! gap-4!">
      {/* Image Container - Taller & Overlay Content */}
      <div className="relative h-72 w-full shrink-0 bg-muted">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Strong Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/40 to-transparent z-10" />

        {/* Overlay Content (Title, Desc, Rating) */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-20 flex flex-col justify-end h-full">
          {/* Icon Badge (Above Title - Square) */}
          <div className="mb-4 inline-flex w-fit">
            <div className="flex  items-center justify-center rounded-lg text-foreground transition-transform duration-300 group-hover:scale-105">
              <service.icon className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white tracking-tight mb-1 drop-shadow-md">
            <HighlightedText text={service.title} highlight={searchQuery} />
          </h3>

          {/* Description */}
          <p className="text-sm text-white/90 leading-relaxed line-clamp-2 drop-shadow-sm">
            <HighlightedText
              text={service.description}
              highlight={searchQuery}
            />
          </p>
        </div>
      </div>

      {/* Content Container (Metadata & Actions) */}
      <div className="flex flex-col grow px-5 pt-5 pb-5">
        {/* Metadata List (Sub-services - Styled as Badges) */}
        <div className="flex flex-wrap justify-start gap-2 mb-auto">
          {service.subServices.map((sub, idx) => (
            <Badge
              key={idx}
              variant="outline"
              className={cn(
                "cursor-pointer rounded-md bg-primary/5 text-primary border-primary/50 transition-colors duration-200 px-2 py-1 text-xs font-medium",
                "hover:bg-primary/10 hover:border-primary",
                "dark:bg-primary/20 dark:text-primary-foreground"
              )}
            >
              <HighlightedText text={sub} highlight={searchQuery} />
            </Badge>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-border/40 mb-5 mt-6" />

        {/* Footer Action & Price (Flex: Price Right, Button Left) */}
        <div className="pb-2 flex items-center justify-between gap-4">
          {/* Price (Right/Start) */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm text-muted-foreground font-medium">
              تبدأ من
            </span>
            <span className="text-2xl font-bold text-primary">
              {service.price}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              ج.م
            </span>
          </div>

          {/* Button (Left/End) */}
          <Link to="/service/request">
            <Button
              variant="secondary"
              className="rounded-lg px-6 py-2 shadow-sm hover:shadow-md transition-all gap-2"
              size="default"
            >
              طلب الخدمة
              <ArrowLeftIcon className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

// --- Custom Project Card (Special Card for Custom Services) ---
const CustomProjectCard = () => {
  return (
    <Card className="group relative flex flex-col rounded-2xl border-2 border-primary/10 bg-primary shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden p-0! gap-4!">
      {/* Image Container with Overlay */}
      <div className="relative h-72 w-full shrink-0 bg-muted">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=60"
          alt="مشاريع مخصصة"
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-primary/95 via-primary/60 to-primary/10 z-10" />

        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-20 flex flex-col justify-end h-full">
          {/* Special Badge */}
          <div className="mb-3 inline-flex w-fit">
            <Badge className="bg-background/90 text-primary! border-0 shadow-lg px-3 py-1.5 text-xs font-bold backdrop-blur-sm">
              ⭐ خدمة مميزة
            </Badge>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white tracking-tight mb-2 drop-shadow-md">
            الخدمات المخصصة
          </h3>

          {/* Description */}
          <p className="text-sm text-white/90 leading-relaxed drop-shadow-sm">
            هل لديك مشروع معقد أو مهمة مخصصة؟
          </p>
        </div>
      </div>

      {/* Content Container - Steps */}
      <div className="flex flex-col justify-between grow px-5 pt-5 pb-5 bg-primary">
        {/* Steps - With Full Descriptions */}
        <div className="grid gap-3.5 mb-5">
          {/* Step 1 */}
          <div className="flex items-start gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-background/20 text-primary-foreground font-bold text-xs border border-background/30">
              1
            </div>
            <div>
              <h4 className="font-semibold text-primary-foreground text-xs mb-0.5">
                إرسال الطلب
              </h4>
              <p className="text-[11px] text-primary-foreground/80 leading-relaxed">
                صف مشروعك بالتفصيل مع رفع الصور أو المخططات.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-background/20 text-primary-foreground font-bold text-xs border border-background/30">
              2
            </div>
            <div>
              <h4 className="font-semibold text-primary-foreground text-xs mb-0.5">
                استلام العروض
              </h4>
              <p className="text-[11px] text-primary-foreground/80 leading-relaxed">
                استقبل عروض أسعار تنافسية من أفضل الفنيين لدينا.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-background/20 text-primary-foreground font-bold text-xs border border-background/30">
              3
            </div>
            <div>
              <h4 className="font-semibold text-primary-foreground text-xs mb-0.5">
                اختيار الفني
              </h4>
              <p className="text-[11px] text-primary-foreground/80 leading-relaxed">
                قارن بين العروض والتقييمات لاختيار الفني الأنسب.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-background/20 text-primary-foreground font-bold text-xs border border-background/30">
              4
            </div>
            <div>
              <h4 className="font-semibold text-primary-foreground text-xs mb-0.5">
                إنجاز المشروع
              </h4>
              <p className="text-[11px] text-primary-foreground/80 leading-relaxed">
                تابع سير العمل حتى إنجاز مشروعك بالكامل ورضاك التام.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-background/20 mb-5" />

        {/* Footer Action & Price */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm text-primary-foreground/80 font-medium">
              تبدأ من
            </span>
            <span className="text-lg font-bold text-primary-foreground">
              حسب الاتفاق
            </span>
          </div>

          <Link to="/projects-services">
            <Button
              variant="secondary"
              className="rounded-lg px-4 py-2 text-primary shadow-md hover:shadow-lg transition-all gap-2 font-bold h-10 text-sm"
              size="default"
            >
              اطلب مشروع
              <ArrowLeftIcon className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // --- منطق البحث الذكي (نفس المنطق) ---
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return servicesData;

    const query = searchQuery.toLowerCase();

    return servicesData
      .filter((service) => {
        const inTitle = service.title.toLowerCase().includes(query);
        const inDesc = service.description.toLowerCase().includes(query);
        const inSubServices = service.subServices.some((sub) =>
          sub.toLowerCase().includes(query)
        );

        return inTitle || inDesc || inSubServices;
      })
      .sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(query);
        const bTitle = b.title.toLowerCase().includes(query);
        if (aTitle && !bTitle) return -1;
        if (!aTitle && bTitle) return 1;
        return 0;
      });
  }, [searchQuery]);

  return (
    <div
      className="min-h-screen bg-background font-sans selection:bg-primary/20"
      dir="rtl"
    >
      {/* --- Hero Section (Clean & Modern) --- */}
      <section className="relative py-16 md:py-20 w-full bg-linear-to-b from-primary/5 to-background flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-30 -z-10" />

        <Badge
          variant="outline"
          className="mb-4 px-4 py-1.5 text-sm border-primary/20 bg-background/50 backdrop-blur-sm text-primary rounded-full shadow-sm"
        >
          خدمات احترافية لمنزلك
        </Badge>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-4 drop-shadow-sm">
          دليل <span className="text-primary">خدماتنا</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          تصفح مجموعتنا الشاملة من الخدمات المنزلية. جودة عالية، فنيين محترفين،
          وضمان شامل.
        </p>
      </section>

      {/* --- Sticky Search Bar (Fixed Top) --- */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm py-4 mb-8">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="relative group">
            <div className="relative bg-background border border-input shadow-sm rounded-xl flex items-center p-1 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50">
              <MagnifyingGlassIcon className="w-6 h-6 text-muted-foreground mr-3 ml-2" />
              <Input
                type="text"
                placeholder="ابحث عن خدمة... (مثال: سباكة، تكييف، دهانات)"
                className="border-0 shadow-none focus-visible:ring-0 text-lg h-12 bg-transparent placeholder:text-muted-foreground/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="hidden md:flex items-center px-4 py-1.5 bg-secondary/50 rounded-lg text-sm font-medium text-secondary-foreground whitespace-nowrap ml-1">
                {filteredServices.length > 0
                  ? `${filteredServices.length} نتيجة`
                  : "لا توجد نتائج"}
              </div>
            </div>
          </div>

          {/* Mobile Counter */}
          <div className="md:hidden text-center mt-2 text-xs text-muted-foreground font-medium">
            {filteredServices.length > 0
              ? `تم العثور على ${filteredServices.length} خدمة`
              : "لا توجد خدمات مطابقة"}
          </div>
        </div>
      </div>

      {/* --- Services Grid --- */}
      <section className="pb-24 pt-4">
        <div className="container max-w-7xl mx-auto px-4">
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  searchQuery={searchQuery}
                />
              ))}

              {/* Custom Project Card - only show when no search query */}
              {!searchQuery && <CustomProjectCard />}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in zoom-in duration-500">
              <div className="bg-muted/30 w-24 h-24 rounded-full flex items-center justify-center mb-6 ring-1 ring-border">
                <MagnifyingGlassIcon className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                لا توجد نتائج مطابقة
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                لم نتمكن من العثور على خدمة تطابق بحثك. جرب كلمات مفتاحية مختلفة
                أو تصفح القائمة الكاملة.
              </p>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setSearchQuery("")}
                className="rounded-full px-8 border-primary/20 hover:bg-primary/5 hover:text-primary hover:border-primary/50"
              >
                عرض جميع الخدمات
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
