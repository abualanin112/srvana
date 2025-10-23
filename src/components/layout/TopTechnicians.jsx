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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// React Icons
import { FaStar, FaArrowLeft } from "react-icons/fa";

// بيانات وهمية لـ 10 فنيين
const topTechniciansData = [
  {
    id: 1,
    rank: 1,
    name: "علي محمد",
    specialty: "خبير تكييف وتبريد",
    quote: "الدقة في العمل هي سر النجاح.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    rank: 2,
    name: "فاطمة الزهراء",
    specialty: "مهندسة كهرباء",
    quote: "الأمان أولاً في كل توصيلة.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    rank: 3,
    name: "خالد عبد الله",
    specialty: "فني سباكة معتمد",
    quote: "حلول مبتكرة لكل مشاكل المياه.",
    rating: 4.9,
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    rank: 4,
    name: "سارة إبراهيم",
    specialty: "تصميم وتنفيذ إضاءة",
    quote: "أضيف لمسة من النور لحياتك.",
    rating: 4.9,
    image: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    rank: 5,
    name: "يوسف أحمد",
    specialty: "صيانة عامة وتركيبات",
    quote: "لا توجد مشكلة صغيرة أو كبيرة.",
    rating: 4.8,
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    rank: 6,
    name: "نور حسين",
    specialty: "فني نجارة",
    quote: "أحوّل الخشب إلى تحفة فنية.",
    rating: 4.8,
    image: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 7,
    rank: 7,
    name: "محمد مصطفى",
    specialty: "تركيب أنظمة أمان",
    quote: "راحتك وأمانك مسؤوليتي.",
    rating: 4.7,
    image: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 8,
    rank: 8,
    name: "هند رضا",
    specialty: "دهانات وديكور",
    quote: "الألوان هي لغة الروح.",
    rating: 4.7,
    image: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 9,
    rank: 9,
    name: "أحمد حسن",
    specialty: "تركيب أطباق الدش",
    quote: "إشارة قوية في كل مكان.",
    rating: 4.6,
    image: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 10,
    rank: 10,
    name: "مريم محمود",
    specialty: "تنظيف وصيانة مسابح",
    quote: "مياه نقية ومنعشة دائمًا.",
    rating: 4.6,
    image: "https://i.pravatar.cc/150?img=10",
  },
];
// مكون لعرض نجوم التقييم
const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  return (
    <div className="flex gap-1 text-yellow-400">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} />
      ))}
    </div>
  );
};

export default function TopTechnicians() {
  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="container max-w-7xl mx-auto px-4">
        {/* عنوان القسم */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            أفضل الفنيين لهذا الشهر
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            الفنيون الأكثر تميّزًا وفق تقييمات عملائنا
          </p>
        </div>

        {/* Carousel للفنيين */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {topTechniciansData.map((tech) => (
              <CarouselItem
                key={tech.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <CardContent className="relative flex flex-col items-center justify-center p-6 text-center">
                      <Badge className="absolute top-4 right-4 text-lg font-bold bg-primary text-primary-foreground">
                        #{tech.rank}
                      </Badge>
                      <img
                        src={tech.image}
                        alt={tech.name}
                        className="w-28 h-28 rounded-full mb-4 border-4 border-muted group-hover:border-primary transition-colors"
                      />
                      <h3 className="text-2xl font-bold text-foreground mb-1">
                        {tech.name}
                      </h3>
                      <p className="text-md text-primary font-semibold mb-3">
                        {tech.specialty}
                      </p>
                      <RatingStars rating={tech.rating} />
                      <p className="text-muted-foreground mt-4 italic">
                        "{tech.quote}"
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        {/* === قسم دعوة الانضمام كفني (CTA) المعدل === */}
        <div className="mt-8 bg-card p-8 rounded-lg shadow-lg max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
            {/* الجزء الأيمن: النص */}
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                هل تريد أن تصبح أحد أفضل الفنيين؟
              </h3>
              <p className="mt-2 text-lg text-muted-foreground">
                انضم إلى شبكتنا من المحترفين وابدأ في استقبال الطلبات اليوم.
              </p>
            </div>

            {/* الجزء الأيسر: الزر */}
            <div className="flex-shrink-0">
              <Link to="/join-as-technician">
                <Button
                  size="lg"
                  className="px-8 py-3 text-lg font-semibold transform transition hover:scale-105"
                >
                  انضم إلينا الآن!
                  <FaArrowLeft className="h-5 w-5 mr-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
