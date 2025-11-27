import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  ClockIcon,
  TargetIcon,
  SewingPinFilledIcon,
  MixerHorizontalIcon,
  StarFilledIcon,
  CheckIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

// Mock Data for Offers
const MOCK_OFFERS = [
  {
    id: 1,
    technician: {
      name: "أحمد محمد",
      avatar: "https://i.pravatar.cc/150?u=1",
      rating: 4.8,
      reviews: 120,
      completedProjects: 45,
    },
    price: 45000,
    duration: 5,
    durationUnit: "days",
    description:
      "السلام عليكم، قرأت تفاصيل مشروعك وأنا جاهز للتنفيذ. لدي خبرة 10 سنوات في التشطيبات ويمكنني تسليم الشقة في الوقت المحدد وبأعلى جودة.",
    createdAt: "منذ ساعتين",
  },
  {
    id: 2,
    technician: {
      name: "شركة البناء الحديث",
      avatar: "https://i.pravatar.cc/150?u=2",
      rating: 4.5,
      reviews: 85,
      completedProjects: 200,
      isCompany: true,
    },
    price: 52000,
    duration: 4,
    durationUnit: "days",
    description:
      "نحن شركة متخصصة ولدينا طاقم عمل متكامل. العرض يشمل التوريد والتركيب مع ضمان لمدة سنة على الأعمال.",
    createdAt: "منذ 5 ساعات",
  },
  {
    id: 3,
    technician: {
      name: "محمود علي",
      avatar: "https://i.pravatar.cc/150?u=3",
      rating: 4.9,
      reviews: 50,
      completedProjects: 30,
    },
    price: 42000,
    duration: 7,
    durationUnit: "days",
    description:
      "مهندس ديكور وتشطيبات. يمكنني مساعدتك في اختيار الخامات والألوان المناسبة. السعر قابل للتفاوض البسيط.",
    createdAt: "منذ يوم",
  },
];

export default function ProjectOffersPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // Use passed state or fallback to mock project data
  const projectData = location.state?.projectData || {
    title: "تشطيب شقة سكنية 150 متر",
    status: "open", // open, closed, in_progress
    createdAt: new Date().toISOString(),
    budget: "50000",
    duration: "7",
    durationUnit: "days",
    categories: ["تشطيب", "سباكة", "كهرباء", "دهانات"],
    location: { address: "الرياض، حي العليا" },
  };

  const [offers, setOffers] = useState(MOCK_OFFERS);
  const [filteredOffers, setFilteredOffers] = useState(MOCK_OFFERS);

  // Filter States
  const [sortOption, setSortOption] = useState("recommended");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [minRating, setMinRating] = useState(0);
  const [maxDuration, setMaxDuration] = useState(30); // days

  // Apply Filters
  useEffect(() => {
    let result = [...offers];

    // 1. Price Filter
    result = result.filter(
      (o) => o.price >= priceRange[0] && o.price <= priceRange[1]
    );

    // 2. Rating Filter
    if (minRating > 0) {
      result = result.filter((o) => o.technician.rating >= minRating);
    }

    // 3. Duration Filter
    if (maxDuration < 30) {
      result = result.filter((o) => {
        const days =
          o.durationUnit === "weeks"
            ? o.duration * 7
            : o.durationUnit === "months"
            ? o.duration * 30
            : o.duration;
        return days <= maxDuration;
      });
    }

    // 4. Sorting
    if (sortOption === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      result.sort((a, b) => b.technician.rating - a.technician.rating);
    }

    setFilteredOffers(result);
  }, [offers, sortOption, priceRange, minRating, maxDuration]);

  return (
    <div
      className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100/50 dark:from-slate-950 dark:to-slate-900 pb-20"
      dir="rtl"
    >
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              عروض المشروع
            </h1>
            <p className="text-muted-foreground">
              تصفح العروض المقدمة واختر الأنسب لك
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() =>
              navigate("/project/summary", { state: { projectData } })
            }
          >
            عودة لتفاصيل المشروع
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar: Project Details */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-lg shadow-slate-200/40 dark:shadow-none sticky top-24">
              <CardHeader className="bg-primary/5 pb-4">
                <CardTitle className="text-lg text-primary">
                  بطاقة المشروع
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-5">
                {/* Status */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    حالة المشروع
                  </span>
                  <Badge
                    variant={
                      projectData.status === "open" ? "default" : "secondary"
                    }
                    className="bg-green-500 hover:bg-green-600"
                  >
                    {projectData.status === "open" ? "مفتوح للتقديم" : "مغلق"}
                  </Badge>
                </div>
                <Separator />

                {/* Date */}
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <CalendarIcon className="w-3 h-3" /> تاريخ النشر
                  </span>
                  <p className="font-medium text-sm">
                    منذ {Math.floor(Math.random() * 5) + 1} أيام
                  </p>
                </div>

                {/* Budget */}
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <TargetIcon className="w-3 h-3" /> الميزانية
                  </span>
                  <p className="font-bold text-lg">
                    {parseInt(projectData.budget).toLocaleString()} ج.م
                  </p>
                </div>

                {/* Duration */}
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <ClockIcon className="w-3 h-3" /> مدة التنفيذ
                  </span>
                  <p className="font-medium text-sm">
                    {projectData.duration}{" "}
                    {projectData.durationUnit === "days"
                      ? "أيام"
                      : projectData.durationUnit === "weeks"
                      ? "أسابيع"
                      : "أشهر"}
                  </p>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <span className="text-xs text-muted-foreground block">
                    الفئات
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {projectData.categories.map((cat, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content: Offers List */}
          <div className="lg:col-span-3 space-y-6">
            {/* Advanced Filter Bar */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                  <MixerHorizontalIcon className="w-5 h-5 text-primary" />
                  <span>تصفية العروض ({filteredOffers.length})</span>
                </div>

                <Select
                  value={sortOption}
                  onValueChange={setSortOption}
                  dir="rtl"
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="ترتيب حسب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">الأكثر تطابقاً</SelectItem>
                    <SelectItem value="price_asc">الأقل سعراً</SelectItem>
                    <SelectItem value="price_desc">الأعلى سعراً</SelectItem>
                    <SelectItem value="rating">الأعلى تقييماً</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* Price Filter */}
                <div className="space-y-3">
                  <Label className="text-xs text-muted-foreground">
                    نطاق السعر (ج.م)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="h-8 text-xs"
                      placeholder="من"
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="h-8 text-xs"
                      placeholder="إلى"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="space-y-3">
                  <Label className="text-xs text-muted-foreground">
                    التقييم (الحد الأدنى)
                  </Label>
                  <Select
                    value={minRating.toString()}
                    onValueChange={(v) => setMinRating(Number(v))}
                    dir="rtl"
                  >
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue placeholder="الكل" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">الكل</SelectItem>
                      <SelectItem value="3">3 نجوم وأكثر</SelectItem>
                      <SelectItem value="4">4 نجوم وأكثر</SelectItem>
                      <SelectItem value="4.5">4.5 وأكثر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration Filter */}
                <div className="space-y-3">
                  <Label className="text-xs text-muted-foreground">
                    مدة التنفيذ (الحد الأقصى)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[maxDuration]}
                      onValueChange={(v) => setMaxDuration(v[0])}
                      max={60}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-xs font-mono w-12 text-center">
                      {maxDuration} يوم
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Offers List */}
            <div className="space-y-4">
              {filteredOffers.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                  <p className="text-muted-foreground">
                    لا توجد عروض تطابق معايير البحث
                  </p>
                  <Button
                    variant="link"
                    onClick={() => {
                      setPriceRange([0, 100000]);
                      setMinRating(0);
                      setMaxDuration(30);
                    }}
                  >
                    إعادة تعيين الفلاتر
                  </Button>
                </div>
              ) : (
                filteredOffers.map((offer) => (
                  <Card
                    key={offer.id}
                    className="border-0 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Technician Info Side */}
                        <div className="p-6 md:w-1/3 bg-slate-50/50 dark:bg-slate-900/50 border-b md:border-b-0 md:border-l border-slate-100 dark:border-slate-800 flex flex-col items-center text-center justify-center gap-3">
                          <Avatar className="w-20 h-20 border-4 border-white dark:border-slate-800 shadow-sm">
                            <AvatarImage src={offer.technician.avatar} />
                            <AvatarFallback>
                              {offer.technician.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-bold text-lg flex items-center gap-1 justify-center">
                              {offer.technician.name}
                              {offer.technician.isCompany && (
                                <Badge
                                  variant="secondary"
                                  className="text-[10px] px-1 h-5"
                                >
                                  شركة
                                </Badge>
                              )}
                            </h3>
                            <div className="flex items-center justify-center gap-1 text-amber-500 mt-1">
                              <StarFilledIcon className="w-4 h-4" />
                              <span className="font-bold text-slate-900 dark:text-white">
                                {offer.technician.rating}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                ({offer.technician.reviews} تقييم)
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground bg-white dark:bg-slate-800 px-3 py-1 rounded-full border">
                            أنجز {offer.technician.completedProjects} مشروع
                          </div>
                        </div>

                        {/* Offer Details Side */}
                        <div className="p-6 md:w-2/3 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <span className="text-xs text-muted-foreground block mb-1">
                                  قيمة العرض
                                </span>
                                <span className="text-2xl font-bold text-primary">
                                  {offer.price.toLocaleString()} ج.م
                                </span>
                              </div>
                              <div className="text-left">
                                <span className="text-xs text-muted-foreground block mb-1">
                                  مدة التنفيذ
                                </span>
                                <span className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                  {offer.duration}{" "}
                                  {offer.durationUnit === "days"
                                    ? "أيام"
                                    : "أسابيع"}
                                </span>
                              </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 mb-4">
                              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {offer.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <span className="text-xs text-muted-foreground">
                              {offer.createdAt}
                            </span>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                                onClick={() =>
                                  navigate("/project/chat", {
                                    state: {
                                      projectData,
                                      selectedOffer: offer,
                                    },
                                  })
                                }
                              >
                                <ChatBubbleIcon className="w-4 h-4" />
                                تفاوض
                              </Button>
                              <Button
                                size="sm"
                                className="gap-2 bg-green-600 hover:bg-green-700 text-white"
                              >
                                <CheckIcon className="w-4 h-4" />
                                قبول العرض
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
