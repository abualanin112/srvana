import { useState, useRef, useEffect, memo } from "react";
import {
  StarFilledIcon,
  CheckCircledIcon,
  SewingPinFilledIcon,
  CalendarIcon,
  TimerIcon,
  FileTextIcon,
  ImageIcon,
  PlusIcon,
  ExternalLinkIcon,
  QuoteIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LightningBoltIcon,
  GearIcon,
  RocketIcon,
  MagicWandIcon,
  DimensionsIcon,
  ReaderIcon,
  CubeIcon,
  MixerHorizontalIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// --- Mock Data (API-like Structure) ---
const TECHNICIAN_DATA = {
  name: "أحمد محمد علي",
  title: "فني تكييف وتبريد محترف",
  avatar: "https://i.pravatar.cc/300?u=ahmed_tech",
  rating: 4.9,
  reviewsCount: 156,
  location: "الرياض، المملكة العربية السعودية",
  joinDate: "مارس 2023",
  stats: {
    completedServices: 342,
    completedProjects: 28,
    completionRate: "98%",
    isVerified: true,
  },
  bio: `أنا فني متخصص في صيانة وتركيب جميع أنواع المكيفات (سبليت، مركزي، شباك) بخبرة تتجاوز 10 سنوات.
  
  أعمل بدقة عالية وألتزم بالمواعيد. هدفي هو تقديم خدمة ممتازة تضمن راحة العميل وكفاءة الجهاز. لدي شهادات معتمدة في مجال التبريد والتكييف، وأستخدم أحدث المعدات للكشف عن الأعطال وإصلاحها.
  
  سبق لي العمل مع كبرى شركات الصيانة في المنطقة، وقمت بتنفيذ مشاريع تكييف مركزية لمجمعات سكنية وتجارية. أضمن لكم جودة العمل وقطع الغيار الأصلية.`,
  skills: [
    "صيانة مكيفات سبليت",
    "تأسيس نحاس",
    "شحن فريون",
    "تنظيف مكيفات",
    "صيانة ثلاجات",
    "تركيب مكيفات مركزية",
    "كشف تسربات",
    "صيانة غسالات",
  ],
};

const SKILL_ICONS = {
  "صيانة مكيفات سبليت": <LightningBoltIcon />,
  "تأسيس نحاس": <DimensionsIcon />,
  "شحن فريون": <CubeIcon />,
  "تنظيف مكيفات": <MagicWandIcon />,
  "صيانة ثلاجات": <ReaderIcon />, // Using ReaderIcon as placeholder for fridge if needed, or maybe CubeIcon
  "تركيب مكيفات مركزية": <GearIcon />,
  "كشف تسربات": <MixerHorizontalIcon />,
  "صيانة غسالات": <RocketIcon />, // Using RocketIcon as placeholder
};

const SERVICE_IMAGES = [
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&auto=format&fit=crop&q=60",
];

const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1590986461996-849d5e54d5aa?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop&q=60",
];

const GENERATE_ITEMS = (type, count) => {
  return Array.from({ length: count }).map((_, i) => {
    const baseImages = type === "service" ? SERVICE_IMAGES : PROJECT_IMAGES;
    // Create a unique set of images for each item by cycling through the base array
    // starting from a different index based on 'i'
    const itemImages = Array.from({ length: 5 }).map((_, imgIndex) => {
      const imageIndex = (i + imgIndex) % baseImages.length;
      return baseImages[imageIndex];
    });

    return {
      id: `${type}-${i}`,
      title:
        type === "service"
          ? `صيانة دورية - ${i % 2 === 0 ? "فيلا سكنية" : "مكتب تجاري"} ${
              i + 1
            }`
          : `مشروع تكييف مركزي - ${i % 2 === 0 ? "مجمع سكني" : "برج إداري"} ${
              i + 1
            }`,
      date: `2023-${10 - (i % 10)}-${15 + (i % 10)}`,
      description:
        type === "service"
          ? "تم تنفيذ صيانة شاملة تشمل تنظيف الوحدات الداخلية والخارجية، فحص ضغط الفريون، وتنظيف مجاري الصرف. تم استخدام مواد تعقيم خاصة لضمان جودة الهواء. العمل تم إنجازه في وقت قياسي مع الحفاظ على نظافة المكان."
          : "تنفيذ مشروع تكييف مركزي متكامل (VRF) يشمل التخطيط، التوريد، والتركيب. تم تصميم شبكة الدكتات لضمان توزيع مثالي للهواء وتقليل الضوضاء. المشروع شمل أيضاً تركيب وحدات التحكم الذكية وربطها بنظام إدارة المبنى.",
      image: itemImages[0], // Main image is the first one
      images: itemImages,
      rating: 4 + (i % 2),
      clientName: i % 2 === 0 ? "سعد القحطاني" : "عبدالله العمران",
      clientAvatar: `https://i.pravatar.cc/150?u=${type}${i}`,
      clientReview:
        i % 2 === 0
          ? "شغل ممتاز جداً وأخلاق عالية. الفني وصل في الموعد المحدد وكان حريص جداً على نظافة المكان."
          : "احترافية عالية في التنفيذ والتزام تام بالمخططات والمواصفات. أنصح بالتعامل معه للمشاريع الكبيرة.",
      category: type === "service" ? "صيانة وتشغيل" : "مشاريع وتأسيس",
      subCategory: type === "service" ? "تكييف سبليت" : "تكييف مركزي (VRF)",
      skills:
        type === "service"
          ? ["تنظيف", "فحص فريون", "تعقيم"]
          : ["تصميم دكت", "تركيب وحدات", "موازنة هوائية", "أنظمة تحكم"],
    };
  });
};

const PORTFOLIO_ITEMS = {
  services: GENERATE_ITEMS("service", 12),
  projects: GENERATE_ITEMS("project", 12),
};

// --- Sub-Components ---

const StatItem = memo(function StatItem({ icon, label, value }) {
  return (
    <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
          {label}
        </span>
      </div>
      <span className="font-bold text-slate-900 dark:text-white">{value}</span>
    </div>
  );
});

function PortfolioItemDialogContent({ item }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = item.images || [item.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  return (
    <div className="w-full h-full flex flex-col relative animate-in fade-in duration-300">
      {/* Header / Close Area */}
      <div className="absolute top-0 left-0 right-0 p-6 z-50 flex justify-between items-start bg-linear-to-b from-black/90 via-black/50 to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <h2 className="text-white/90 text-xl font-bold drop-shadow-lg tracking-wide">
            {item.title}
          </h2>
          <p className="text-white/70 text-sm font-medium drop-shadow-md mt-1">
            {currentImageIndex + 1} / {images.length}
          </p>
        </div>
        <DialogClose
          className="pointer-events-auto text-secondary hover:text-secondary-foreground 
             bg-black/40 hover:bg-secondary 
             rounded-full p-2 transition-colors 
             backdrop-blur-sm border border-secondary/20"
        >
          <Cross2Icon className="w-6 h-6" />
        </DialogClose>
      </div>

      {/* Main Image Area */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-black/50 pt-12">
        <div className="relative w-full h-full flex items-center justify-center p-3 md:p-6 gap-12">
          {/* Prev Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-secondary hover:text-secondary-foreground 
               bg-black/40 hover:bg-secondary 
               rounded-full w-12 h-12 md:w-14 md:h-14 
               shrink-0 z-40 transition-all duration-300 
               backdrop-blur-sm border border-secondary/20"
            onClick={prevImage}
          >
            <ChevronRightIcon className="w-6 h-6 md:w-8 md:h-8" />
          </Button>

          {/* Image Container */}
          <div className="relative w-full max-w-4xl aspect-video bg-black/20 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center shrink-0">
            <img
              src={images[currentImageIndex]}
              alt={`${item.title} - ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-500 ease-out select-none"
            />
          </div>

          {/* Next Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-secondary hover:text-secondary-foreground 
               bg-black/40 hover:bg-secondary 
               rounded-full w-12 h-12 md:w-14 md:h-14 
               shrink-0 z-40 transition-all duration-300 
               backdrop-blur-sm border border-secondary/20"
            onClick={nextImage}
          >
            <ChevronLeftIcon className="w-6 h-6 md:w-8 md:h-8" />
          </Button>
        </div>
      </div>

      {/* Thumbnails Strip - Sleek & Compact */}
      <div className="h-24 md:h-28 bg-black/85 backdrop-blur-md border-t border-white/10 flex items-center justify-center gap-4 md:gap-6 px-8 py-4 overflow-x-auto z-50 shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImageIndex(idx)}
            className={cn(
              "relative h-14 w-14 md:h-16 md:w-16 rounded-lg overflow-hidden transition-all duration-300 ease-out shrink-0 group",
              currentImageIndex === idx
                ? "ring-2 ring-secondary ring-offset-2 ring-offset-black scale-110 opacity-100 z-10"
                : "opacity-40 hover:opacity-100 hover:scale-105 grayscale hover:grayscale-0"
            )}
          >
            <img
              src={img}
              alt={`thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Active Indicator Overlay */}
            {currentImageIndex !== idx && (
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

const PortfolioItemCard = memo(function PortfolioItemCard({ item }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150; // Character limit for truncation

  const shouldTruncate = item.description.length > maxLength;
  const displayDescription =
    isExpanded || !shouldTruncate
      ? item.description
      : `${item.description.substring(0, maxLength)}...`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          dir="rtl"
          className="flex gap-6 items-start py-8 border-b border-slate-200 dark:border-slate-700 last:border-0 group hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer p-4 -mx-4 transition-all duration-300"
        >
          {/* Image (Right) */}
          <div className="w-28 h-28 sm:w-40 sm:h-40 shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-sm group-hover:shadow-md transition-all duration-300 relative">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="flex items-center gap-2 text-secondary-foreground font-bold text-sm bg-secondary hover:bg-secondary/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <ExternalLinkIcon className="w-4 h-4" />
                المزيد
              </span>
            </div>
          </div>

          {/* Content (Left) */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Header */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <span className="text-xs font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap mr-4 bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded-full">
                  {item.date}
                </span>
              </div>

              {/* Badges Section */}
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="text-primary border-primary/20 bg-primary/5"
                >
                  {item.category}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                >
                  {item.subCategory}
                </Badge>
                {item.skills.map((skill, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Description with Inline Read More */}
            <div className="text-sm leading-7 text-slate-600 dark:text-slate-300">
              {displayDescription}
              {shouldTruncate && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                  }}
                  className="text-primary font-bold hover:underline mr-2 inline-flex items-center gap-1 group"
                >
                  {isExpanded ? "عرض أقل" : "رؤية المزيد"}
                  <ChevronLeftIcon
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isExpanded ? "rotate-90" : "group-hover:-translate-x-1"
                    }`}
                  />
                </button>
              )}
            </div>

            {/* Distinct Rating & Review Section */}
            <div className="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-xl p-4 mt-2 transition-colors hover:bg-amber-50 dark:hover:bg-amber-900/20">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-10 h-10 border-2 border-white dark:border-slate-950 shadow-sm">
                  <AvatarImage src={item.clientAvatar} alt={item.clientName} />
                  <AvatarFallback>{item.clientName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-none mb-1">
                    {item.clientName}
                  </p>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarFilledIcon
                        key={i}
                        className={cn(
                          "w-3 h-3",
                          i < item.rating
                            ? "text-amber-500"
                            : "text-slate-300 dark:text-slate-700"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative pr-2">
                <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  "{item.clientReview}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>

      {/* Detailed Dialog Content */}
      <DialogContent className="!max-w-screen !w-screen h-screen !p-0 m-0 border-0 rounded-none bg-black/85 backdrop-blur-xl shadow-none flex flex-col overflow-hidden focus:outline-none">
        <PortfolioItemDialogContent item={item} />
      </DialogContent>
    </Dialog>
  );
});

export default function TechnicianPortfolio() {
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const galleryRef = useRef(null);

  // Pagination State
  const [itemsPerPage] = useState(5);
  const [servicePage, setServicePage] = useState(1);
  const [projectPage, setProjectPage] = useState(1);

  // Pagination Logic
  const paginate = (items, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalServicePages = Math.ceil(
    PORTFOLIO_ITEMS.services.length / itemsPerPage
  );
  const totalProjectPages = Math.ceil(
    PORTFOLIO_ITEMS.projects.length / itemsPerPage
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20" dir="rtl">
      {/* --- New Hero Header Section --- */}
      <div className="relative bg-primary overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 py-12 md:py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-right">
            {/* Avatar */}
            <div className="relative shrink-0 group">
              <div className="absolute -inset-1 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-white/20 shadow-2xl relative">
                <AvatarImage
                  src={TECHNICIAN_DATA.avatar}
                  alt={TECHNICIAN_DATA.name}
                  className="object-cover"
                />
                <AvatarFallback className="text-4xl bg-primary-foreground text-primary">
                  {TECHNICIAN_DATA.name[0]}
                </AvatarFallback>
              </Avatar>
              {TECHNICIAN_DATA.stats.isVerified && (
                <div
                  className="absolute bottom-2 right-2 bg-green-500 text-white p-1.5 rounded-full border-4 border-primary shadow-sm z-20"
                  title="موثق"
                >
                  <CheckCircledIcon className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-4 flex-1 text-primary-foreground">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                  {TECHNICIAN_DATA.name}
                </h1>
                <p className="text-xl md:text-2xl font-medium text-primary-foreground/90">
                  {TECHNICIAN_DATA.title}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium text-primary-foreground/80">
                <div className="flex items-center gap-1.5 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
                  <SewingPinFilledIcon className="w-4 h-4" />
                  {TECHNICIAN_DATA.location}
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
                  <CalendarIcon className="w-4 h-4" />
                  انضم {TECHNICIAN_DATA.joinDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* --- Right Column: Main Content (lg:col-span-8) --- */}
          <div className="lg:col-span-8 space-y-16 order-2 lg:order-1">
            {/* 1. About Section - Enhanced (Now First) */}
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <QuoteIcon className="w-8 h-8 text-primary rotate-180" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  نبذة عني
                </h2>
              </div>

              <div className="relative pr-6 border-r-4 border-primary pl-4 py-2">
                <p className="text-lg leading-8 text-slate-700 dark:text-slate-300 font-medium transition-all duration-300">
                  {isBioExpanded
                    ? TECHNICIAN_DATA.bio
                    : `${TECHNICIAN_DATA.bio.substring(0, 200)}...`}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-primary rounded-full"></span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    أعمل بدقة عالية وألتزم بالمواعيد. هدفي هو تقديم خدمة ممتازة
                    تضمن راحة العميل وكفاءة الجهاز.
                    <button
                      onClick={() => setIsBioExpanded(!isBioExpanded)}
                      className="text-primary font-bold hover:underline mr-2 inline-flex items-center gap-1 group"
                    >
                      {isBioExpanded ? "عرض أقل" : "رؤية المزيد"}
                      <ChevronLeftIcon
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isBioExpanded
                            ? "rotate-90"
                            : "group-hover:-translate-x-1"
                        }`}
                      />
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Skills Section - Enhanced */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                <CheckCircledIcon className="w-6 h-6 text-primary" />
                المهارات والتخصصات
              </h2>

              <div className="flex flex-wrap gap-3">
                {TECHNICIAN_DATA.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-300 cursor-default group"
                  >
                    <span className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors">
                      {SKILL_ICONS[skill] || <StarFilledIcon />}
                    </span>
                    <span className="font-medium text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Portfolio Gallery */}
            <div className="space-y-10" ref={galleryRef}>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <ImageIcon className="w-6 h-6 text-primary" />
                معرض الأعمال
              </h2>

              <Tabs defaultValue="services" className="w-full">
                <TabsList className="w-full justify-start h-12 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 mb-6">
                  <TabsTrigger
                    value="services"
                    className="flex-1 h-full rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-bold"
                  >
                    الخدمات ({PORTFOLIO_ITEMS.services.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="projects"
                    className="flex-1 h-full rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-bold"
                  >
                    المشاريع ({PORTFOLIO_ITEMS.projects.length})
                  </TabsTrigger>
                </TabsList>

                {/* Services Tab */}
                <TabsContent value="services" className="space-y-6">
                  <div className="flex flex-col">
                    {paginate(PORTFOLIO_ITEMS.services, servicePage).map(
                      (item) => (
                        <PortfolioItemCard key={item.id} item={item} />
                      )
                    )}
                  </div>
                  {/* Pagination Controls */}
                  <div className="flex justify-center items-center gap-4 pt-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setServicePage((p) =>
                          Math.min(totalServicePages, p + 1)
                        );
                        galleryRef.current?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                      disabled={servicePage === totalServicePages}
                      className="rounded-full w-10 h-10"
                    >
                      <ChevronLeftIcon className="w-5 h-5" />
                    </Button>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      صفحة {servicePage} من {totalServicePages}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setServicePage((p) => Math.max(1, p - 1));
                        galleryRef.current?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                      disabled={servicePage === 1}
                      className="rounded-full w-10 h-10"
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </TabsContent>

                {/* Projects Tab */}
                <TabsContent value="projects" className="space-y-6">
                  <div className="flex flex-col">
                    {paginate(PORTFOLIO_ITEMS.projects, projectPage).map(
                      (item) => (
                        <PortfolioItemCard key={item.id} item={item} />
                      )
                    )}
                  </div>
                  {/* Pagination Controls */}
                  <div className="flex justify-center items-center gap-4 pt-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setProjectPage((p) =>
                          Math.min(totalProjectPages, p + 1)
                        );
                        galleryRef.current?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                      disabled={projectPage === totalProjectPages}
                      className="rounded-full w-10 h-10"
                    >
                      <ChevronLeftIcon className="w-5 h-5" />
                    </Button>

                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      صفحة {projectPage} من {totalProjectPages}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setProjectPage((p) => Math.max(1, p - 1));
                        galleryRef.current?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                      disabled={projectPage === 1}
                      className="rounded-full w-10 h-10"
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* --- Left Column: Stats Sidebar (lg:col-span-4) --- */}
          <div className="lg:col-span-4 space-y-6 order-1 lg:order-2">
            <Card className="border-0 shadow-sm sticky top-24">
              <CardHeader className="bg-card dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <CardTitle className="text-lg">إحصائيات الفني</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <StarFilledIcon className="w-5 h-5 text-amber-500" />
                      </div>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        التقييم العام
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {TECHNICIAN_DATA.rating}
                      </span>
                      <span className="text-xs text-slate-500">
                        ({TECHNICIAN_DATA.reviewsCount})
                      </span>
                    </div>
                  </div>
                  <StatItem
                    icon={
                      <CheckCircledIcon className="w-5 h-5 text-green-500" />
                    }
                    label="الخدمات المكتملة"
                    value={TECHNICIAN_DATA.stats.completedServices}
                  />
                  <StatItem
                    icon={<FileTextIcon className="w-5 h-5 text-blue-500" />}
                    label="المشاريع المكتملة"
                    value={TECHNICIAN_DATA.stats.completedProjects}
                  />
                  <StatItem
                    icon={<TimerIcon className="w-5 h-5 text-orange-500" />}
                    label="معدل إكمال المهام"
                    value={TECHNICIAN_DATA.stats.completionRate}
                  />
                  <div className="p-4 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      حالة التوثيق
                    </span>
                    <Badge
                      variant={
                        TECHNICIAN_DATA.stats.isVerified
                          ? "default"
                          : "secondary"
                      }
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      {TECHNICIAN_DATA.stats.isVerified
                        ? "هوية موثقة"
                        : "غير موثق"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
