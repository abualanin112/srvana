import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  StarFilledIcon,
  SewingPinFilledIcon,
  TimerIcon,
  CheckCircledIcon,
  QuoteIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StepsIndicator from "@/components/ui/StepsIndicator";
import { cn } from "@/lib/utils";

// Mock Data for Technicians
const MOCK_TECHNICIANS = [
  {
    id: 1,
    name: "أحمد محمد",
    profession: "فني تكييف وتبريد",
    tasksCompleted: 350,
    rating: 4.9,
    location: "الرياض، حي الملز",
    distance: 15, // minutes
    bio: "فني تكييف محترف خبرة 10 سنوات في صيانة جميع أنواع المكيفات الاسبليت والمركزي.",
    image: "https://i.pravatar.cc/150?u=ahmed",
  },
  {
    id: 2,
    name: "خالد العتيبي",
    profession: "سباك محترف",
    tasksCompleted: 210,
    rating: 4.8,
    location: "الرياض، حي العليا",
    distance: 25, // minutes
    bio: "سباك ماهر متخصص في كشف التسربات وإصلاح الأعطال الطارئة بدقة عالية.",
    image: "https://i.pravatar.cc/150?u=khaled",
  },
  {
    id: 3,
    name: "محمود حسن",
    profession: "كهربائي منازل",
    tasksCompleted: 420,
    rating: 4.9,
    location: "الرياض، حي النسيم",
    distance: 10, // minutes
    bio: "كهربائي منازل خبرة طويلة، متخصص في التمديدات والإنارة الذكية.",
    image: "https://i.pravatar.cc/150?u=mahmoud",
  },
];

export default function FastServiceStep2() {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceData = location.state?.serviceData; // Get data from previous step

  const [selectedTech, setSelectedTech] = useState(MOCK_TECHNICIANS[0]);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate finding a technician on mount (optional, but good for effect)
  useEffect(() => {
    // Initial load could be instant or simulated
    if (!serviceData) {
      // Optional: Redirect back if no data (for safety)
      // navigate("/service/request");
    }
  }, [serviceData, navigate]);

  const handleChangeTechnician = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      // Pick a random technician different from current
      let newTech;
      do {
        newTech =
          MOCK_TECHNICIANS[Math.floor(Math.random() * MOCK_TECHNICIANS.length)];
      } while (newTech.id === selectedTech.id);

      setSelectedTech(newTech);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Steps Header - Sticky */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border shadow-md transition-all duration-300">
        <StepsIndicator
          steps={[
            { label: "تفاصيل الخدمة", status: "completed" },
            { label: "اختيار الفني", status: "active" },
            { label: "الدفع", status: "disabled" },
          ]}
        />
      </div>

      {/* Main Container */}
      <div className="container max-w-5xl mx-auto px-4 pb-20 pt-12">
        {/* Page Header */}
        <div className="mb-12 text-center space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
            اختر الفني المناسب
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            تم اختيار أفضل فني متاح لطلبك بناءً على تقييمات العملاء وخبرته.
          </p>
        </div>

        {/* Technician Card Area */}
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            // Skeleton Placeholder
            <Card className="border-0 shadow-xl shadow-black/5 bg-card/80 backdrop-blur-sm rounded-3xl overflow-hidden p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-full" />
                <div className="flex-1 space-y-6 w-full text-center md:text-right">
                  <Skeleton className="h-10 w-3/4 mx-auto md:mx-0" />
                  <Skeleton className="h-6 w-1/2 mx-auto md:mx-0" />
                  <div className="space-y-3 pt-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3 mx-auto md:mx-0" />
                  </div>
                  <div className="flex gap-4 pt-6 justify-center md:justify-start">
                    <Skeleton className="h-14 w-40 rounded-xl" />
                    <Skeleton className="h-14 w-40 rounded-xl" />
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            // Technician Card
            <Card className="border-0 shadow-2xl shadow-primary/5 bg-card/90 backdrop-blur-md rounded-[2.5rem] overflow-hidden transition-all duration-500 animate-in fade-in zoom-in-95 ring-1 ring-border">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
                  {/* Avatar Section */}
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
                    <Avatar className="w-32 h-32 md:w-48 md:h-48 border-[6px] border-background shadow-2xl relative z-10">
                      <AvatarImage
                        src={selectedTech.image}
                        alt={selectedTech.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-5xl font-bold bg-primary/10 text-primary">
                        {selectedTech.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-3 -right-3 bg-background p-1.5 rounded-full shadow-lg z-20">
                      <div className="bg-green-500 text-white text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                        <StarFilledIcon className="w-4 h-4" />
                        {selectedTech.rating}
                      </div>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="flex-1 text-center md:text-right space-y-6 w-full">
                    <div>
                      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-2 mb-2">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
                          {selectedTech.name}
                        </h2>
                        <span className="bg-primary/10 text-primary text-sm font-bold px-4 py-1.5 rounded-full border border-primary/20">
                          فني معتمد
                        </span>
                      </div>
                      <p className="text-xl font-medium text-muted-foreground mb-4">
                        {selectedTech.profession}
                      </p>

                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm font-medium text-muted-foreground">
                        <span className="flex items-center gap-2 bg-muted px-4 py-2 rounded-xl border border-border">
                          <CheckCircledIcon className="w-5 h-5 text-green-500" />
                          +{selectedTech.tasksCompleted} مهمة مكتملة
                        </span>
                        <span className="flex items-center gap-2 bg-muted px-4 py-2 rounded-xl border border-border">
                          <SewingPinFilledIcon className="w-5 h-5 text-blue-500" />
                          يخدم {selectedTech.location}
                        </span>
                        <span className="flex items-center gap-2 bg-muted px-4 py-2 rounded-xl border border-border">
                          <TimerIcon className="w-5 h-5 text-orange-500" />
                          يبعد {selectedTech.distance} دقيقة
                        </span>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-6 rounded-2xl border border-border text-right relative">
                      <div className="absolute -top-3 right-6 bg-card px-2 text-primary">
                        <QuoteIcon className="w-6 h-6 rotate-180" />
                      </div>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        {selectedTech.bio}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                      <Button
                        variant="secondary"
                        className="h-14 px-8 text-base font-bold rounded-xl hover:bg-muted transition-colors shadow-sm"
                      >
                        شاهد الملف الشخصي
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={handleChangeTechnician}
                        className="h-14 px-8 text-base font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all border-2 border-transparent hover:border-primary/10"
                      >
                        <ReloadIcon className="w-4 h-4 ml-2" />
                        تغيير الفني
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="max-w-4xl mx-auto flex flex-col-reverse md:flex-row gap-4 justify-between mt-12 pt-8 border-t border-border">
          <Button
            variant="outline"
            onClick={() =>
              navigate("/service/request", { state: { serviceData } })
            }
            className="w-full md:w-auto min-w-[160px] h-14 text-lg font-medium gap-2 rounded-xl border-2 hover:bg-muted transition-all"
          >
            <ArrowRightIcon className="w-5 h-5" />
            السابق
          </Button>
          <Button
            disabled={!selectedTech || isLoading}
            onClick={() =>
              navigate("/service/payment", {
                state: { serviceData, technicianData: selectedTech },
              })
            }
            className="w-full md:w-auto min-w-[240px] h-14 text-lg font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all gap-2 rounded-xl"
          >
            التالي: الدفع
            <ArrowLeftIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
