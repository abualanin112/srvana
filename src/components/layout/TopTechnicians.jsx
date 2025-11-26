// src/components/TopTechnicians.jsx

import React, { memo } from "react";
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

// Radix Icons
import { StarIcon, StarFilledIcon, ArrowLeftIcon } from "@radix-ui/react-icons";

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
const RatingStars = memo(({ rating }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }, (_, i) => {
      const isFilled = i < Math.floor(rating);
      return isFilled ? (
        <StarFilledIcon
          key={i}
          className="w-4 h-4"
          style={{ color: "#FFD700" }}
        />
      ) : (
        <StarIcon key={i} className="w-4 h-4" style={{ color: "#FFD700" }} />
      );
    })}
  </div>
));

RatingStars.displayName = "RatingStars";

const rankColors = {
  1: "#FFD700", // ذهبي - Gold
  2: "#C0C0C0", // فضي - Silver
  3: "#CD7F32", // برونزي - Bronze
};

const defaultRankColor = "#9CA3AF"; // رمادي موحد للباقي - Neutral gray

// --- مكون فرعي لبطاقة الفني ---
const TechnicianCard = memo(({ technician }) => (
  <Card
    className="relative bg-chart-3 border pt-0 rounded overflow-hidden group 
    transition-all duration-500 select-none shadow-xs"
  >
    {/* الصورة (3/4 ) */}
    <div className=" overflow-hidden">
      <img
        src={technician.image}
        alt={technician.name}
        className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>

    {/* المحتوى) */}
    <CardContent className="p-2 pt-0 text-right flex flex-col justify-center relative">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-primary-foreground mb-1 truncate">
          {technician.name}
        </h3>

        {technician.id <= 10 && (
          <div className="absolute top-0.5 left-6 z-10">
            <Icon
              color={rankColors[technician.id] || defaultRankColor}
              size={45}
              rank={technician.id}
            />
          </div>
        )}
      </div>

      <p className="text-sm text-primary-foreground/80 font-medium truncate">
        {technician.specialty}
      </p>

      <div className="flex items-center justify-start gap-2 mt-3">
        <RatingStars rating={technician.rating} />
        <p className="text-xs text-primary-foreground/70">
          ({technician.reviewCount} تقييمًا)
        </p>
      </div>
    </CardContent>
    <div className="absolute inset-0" />
  </Card>
));

TechnicianCard.displayName = "TechnicianCard";

// --- مكون فرعي للشريط السفلي) ---
const SectionFooter = memo(() => (
  <div className="mt-4 bg-chart-3 border rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-6">
    <div className="flex items-center gap-4">
      <div className="flex -space-x-2 rtl:space-x-reverse pr-1">
        {partnersData.map((partner) => (
          <Avatar key={partner.name} className="ring-2 ring-primary">
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

      <p className="text-sm font-medium text-primary-foreground/80">
        كن جزء من مجتمع الفنيين المحترفين في سرفانا — وابدء استقبال المهام
      </p>
    </div>
    <div>
      <Link to="/join-as-technician">
        <Button size="lg" variant="secondary">
          انضم الآن
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
        </Button>
      </Link>
    </div>
  </div>
));

SectionFooter.displayName = "SectionFooter";

// --- المكون الرئيسي ---
export default function TopTechnicians() {
  return (
    <section className="w-full py-16 md:py-24 bg-background text-foreground overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4">
        <Carousel
          opts={{ align: "start", loop: true, direction: "rtl" }}
          className="w-full"
        >
          <div className="flex justify-between items-end mb-6">
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
              <CarouselNext className="relative translate-y-0 left-0 right-0 top-0 bg-secondary hover:bg-secondary/80 text-secondary-foreground size-10 rounded-lg border-border" />
              <CarouselPrevious className="relative translate-y-0 left-0 right-0 top-0 bg-secondary hover:bg-secondary/80 text-secondary-foreground size-10 rounded-lg border-border" />
            </div>
          </div>
          <CarouselContent className="mr-0 ">
            {topTechniciansData.map((tech) => (
              <CarouselItem
                key={tech.id}
                className="p-0 md:basis-1/2 !md:pr-4 lg:basis-1/4  "
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
