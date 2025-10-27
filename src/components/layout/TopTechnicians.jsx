// src/components/TopTechnicians.jsx

import React from "react";
import { Link } from "react-router-dom";

// Shadcn UI Components
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Lucide React Icons
import { Star, ArrowLeft } from "lucide-react";

import { Icon } from "@/components/ui/BageIcons";

// --- بيانات الفنيين ---
const topTechniciansData = [
  {
    id: 1,
    name: "علي محمد",
    specialty: "خبير تكييف وتبريد",
    rating: 5,
    reviewCount: 312,
    image: "https://i.pravatar.cc/300?img=1",
  },
  {
    id: 2,
    name: "فاطمة الزهراء",
    specialty: "مهندسة كهرباء",
    rating: 5,
    reviewCount: 289,
    image: "https://i.pravatar.cc/300?img=2",
  },
  {
    id: 3,
    name: "خالد عبد الله",
    specialty: "فني سباكة معتمد",
    rating: 4.9,
    reviewCount: 255,
    image: "https://i.pravatar.cc/300?img=3",
  },
  {
    id: 4,
    name: "سارة إبراهيم",
    specialty: "تصميم وتنفيذ إضاءة",
    rating: 4.9,
    reviewCount: 241,
    image: "https://i.pravatar.cc/300?img=4",
  },
  {
    id: 5,
    name: "يوسف أحمد",
    specialty: "صيانة عامة وتركيبات",
    rating: 4.8,
    reviewCount: 217,
    image: "https://i.pravatar.cc/300?img=5",
  },
  {
    id: 6,
    name: "نور حسين",
    specialty: "فني نجارة",
    rating: 4.8,
    reviewCount: 198,
    image: "https://i.pravatar.cc/300?img=6",
  },
  {
    id: 7,
    name: "محمد مصطفى",
    specialty: "تركيب أنظمة أمان",
    rating: 4.7,
    reviewCount: 185,
    image: "https://i.pravatar.cc/300?img=7",
  },
  {
    id: 8,
    name: "هند رضا",
    specialty: "دهانات وديكور",
    rating: 4.7,
    reviewCount: 172,
    image: "https://i.pravatar.cc/300?img=8",
  },
  {
    id: 9,
    name: "أحمد حسن",
    specialty: "تركيب أطباق الدش",
    rating: 4.6,
    reviewCount: 154,
    image: "https://i.pravatar.cc/300?img=9",
  },
  {
    id: 10,
    name: "مريم محمود",
    specialty: "تنظيف وصيانة مسابح",
    rating: 4.6,
    reviewCount: 140,
    image: "https://i.pravatar.cc/300?img=10",
  },
];

// --- بيانات الشريط السفلي ---
const partnersData = [
  { name: "Sara Dane", image: "https://i.pravatar.cc/150?img=11" },
  { name: "John Doe", image: "https://i.pravatar.cc/150?img=12" },
  { name: "Lana Rhoades", image: "https://i.pravatar.cc/150?img=13" },
  { name: "Emily Carter", image: "https://i.pravatar.cc/150?img=17" },
  { name: "Mike Shinoda", image: "https://i.pravatar.cc/150?img=14" },
];

// --- مكون فرعي لعرض النجوم ---
const RatingStars = ({ rating }) => (
  <div className="flex items-center gap-1 text-accent">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className="w-4 h-4"
        fill={rating > i ? "currentColor" : "none"}
        stroke={rating > i ? "currentColor" : "oklch(0.7 0.02 270)"}
      />
    ))}
  </div>
);

const rankColors = {
  1: "oklch(0.75 0.15 80)",
  2: "oklch(0.75 0.05 260)",
  3: "oklch(0.7 0.15 40)",
};

const defaultRankColor = "oklch(0.65 0.02 240)";

// --- مكون فرعي لبطاقة الفني ---
const TechnicianCard = ({ technician }) => (
  <Card
    className="relative bg-card border pt-0 rounded overflow-hidden group 
    transition-all duration-500 select-none"
  >
    {/* الصورة (3/4 ) */}
    <div className="h-[75%] overflow-hidden">
      <img
        src={technician.image}
        alt={technician.name}
        className="w-full h-65 object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    {/* المحتوى) */}
    <CardContent className="h-[25%] p-2 pt-0 text-right flex flex-col justify-center relative">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-card-foreground mb-1 truncate">
          {technician.name}
        </h3>

        {technician.id <= 10 && (
          <div className="absolute top-1 left-6 z-10">
            <Icon
              color={rankColors[technician.id] || defaultRankColor}
              size={45}
              rank={technician.id}
            />
          </div>
        )}
      </div>

      <p className="text-sm text-primary font-medium truncate">
        {technician.specialty}
      </p>

      <div className="flex items-center justify-start gap-2 mt-3">
        <RatingStars rating={technician.rating} />
        <p className="text-xs text-muted-foreground">
          ({technician.reviewCount} تقييمًا)
        </p>
      </div>
    </CardContent>
    <div className="absolute inset-0" />
  </Card>
);

// --- مكون فرعي للشريط السفلي) ---
const SectionFooter = () => (
  <div className="mt-6 bg-card border rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-6">
    <div className="flex items-center gap-4">
      <div className="flex -space-x-2 rtl:space-x-reverse pr-1">
        {partnersData.map((partner) => (
          <Avatar key={partner.name} className="ring-2 ring-card">
            <AvatarImage src={partner.image} alt={partner.name} />
            <AvatarFallback>
              {partner.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>

      <p className="text-sm font-medium text-muted-foreground">
        كن جزء من مجتمع الفنيين المحترفين في سرفانا — وابدء استقبال المهام
      </p>
    </div>
    <div>
      <Link to="/join-as-technician">
        <Button size="lg" variant="secondary">
          انضم الآن
          <ArrowLeft className="h-5 w-5 mr-2" />
        </Button>
      </Link>
    </div>
  </div>
);

// --- المكون الرئيسي ---
export default function TopTechnicians() {
  return (
    <section className="w-full py-16 md:py-24 bg-background text-foreground overflow-hidden">
      <div className="container max-w-screen-xl mx-auto px-4">
        <Carousel
          opts={{ align: "start", loop: true, direction: "rtl" }}
          className="w-full"
        >
          <div className="flex justify-between items-end mb-10">
            <div className="text-right">
              <h4 className="text-lg text-primary font-semibold mb-2">
                الفنيين
              </h4>
              <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 text-foreground leading-tight">
                أفضل الفنيين لهذا الشهر
              </h2>
              <p className="mb-2 text-lg text-muted-foreground">
                الفنيين الأكثر تميزًا وفق تقييمات عملائنا.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <CarouselNext className="relative translate-y-0 left-0 right-0 top-0 bg-muted/50 hover:bg-muted/70 text-foreground size-10 rounded-lg border-border" />
              <CarouselPrevious className="relative translate-y-0 left-0 right-0 top-0 bg-muted/50 hover:bg-muted/70 text-foreground size-10 rounded-lg border-border" />
            </div>
          </div>
          <CarouselContent className="-mr-2">
            {topTechniciansData.map((tech) => (
              <CarouselItem
                key={tech.id}
                className="pr-2 md:basis-1/2 lg:basis-1/4"
              >
                <TechnicianCard technician={tech} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <SectionFooter />
      </div>
    </section>
  );
}
