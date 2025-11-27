import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircledIcon,
  CircleIcon,
  SewingPinFilledIcon,
  PersonIcon,
  ChatBubbleIcon,
  MobileIcon,
  HomeIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Mock Order Status Steps
const ORDER_STEPS = [
  {
    id: 1,
    label: "تم استلام الطلب",
    description: "تم تأكيد طلبك بنجاح",
    time: "10:30 AM",
    status: "completed",
  },
  {
    id: 2,
    label: "الفني في الطريق",
    description: "الفني يتحرك نحو موقعك",
    time: "10:45 AM",
    status: "current",
  },
  {
    id: 3,
    label: "بدء العمل",
    description: "الفني وصل وبدأ العمل",
    time: null,
    status: "pending",
  },
  {
    id: 4,
    label: "اكتملت الخدمة",
    description: "تم الانتهاء من العمل بنجاح",
    time: null,
    status: "pending",
  },
];

export default function OrderTracking() {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceData, technicianData } = location.state || {};

  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Initial Data Load
    const timer = setTimeout(() => {
      setOrderData({
        id: "#ORD-2024-859",
        technician: technicianData || {
          name: "أحمد محمد",
          image: "https://i.pravatar.cc/150?u=ahmed",
          rating: 4.9,
          phone: "0501234567",
        },
        service: serviceData || {
          mainCategory: "خدمات التكييف",
          subCategory: "صيانة مكيفات سبليت",
          location: { address: "الرياض، حي الملز" },
        },
        steps: ORDER_STEPS.map((step, index) => {
          if (index === 0) return { ...step, status: "completed" };
          if (index === 1) return { ...step, status: "current" };
          return { ...step, status: "pending" };
        }),
      });
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [serviceData, technicianData]);

  // Simulation Logic
  useEffect(() => {
    if (!orderData) return;

    const interval = setInterval(() => {
      setOrderData((prev) => {
        if (!prev) return null;

        const currentStepIndex = prev.steps.findIndex(
          (s) => s.status === "current"
        );

        // If all steps completed or last step is current and done
        if (currentStepIndex === -1) {
          // Check if the last step is already completed
          if (prev.steps[prev.steps.length - 1].status === "completed") {
            clearInterval(interval);
            return prev;
          }
          return prev;
        }

        const nextSteps = [...prev.steps];

        // Mark current as completed
        nextSteps[currentStepIndex] = {
          ...nextSteps[currentStepIndex],
          status: "completed",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        // Mark next as current (if exists)
        if (currentStepIndex + 1 < nextSteps.length) {
          nextSteps[currentStepIndex + 1] = {
            ...nextSteps[currentStepIndex + 1],
            status: "current",
          };
        }

        return { ...prev, steps: nextSteps };
      });
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, [orderData]);

  // Handle Navigation when finished
  useEffect(() => {
    if (orderData?.steps) {
      const allCompleted = orderData.steps.every(
        (s) => s.status === "completed"
      );
      if (allCompleted) {
        const timer = setTimeout(() => {
          navigate("/service/completion", {
            state: {
              technicianData: orderData.technician,
              serviceData: orderData.service,
            },
          });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [orderData, navigate]);

  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100/50 dark:from-slate-950 dark:to-slate-900 p-8"
        dir="rtl"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <Skeleton className="h-12 w-64 mx-auto rounded-full" />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Skeleton className="h-64 w-full rounded-3xl" />
              <Skeleton className="h-48 w-full rounded-3xl" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-80 w-full rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100/50 dark:from-slate-950 dark:to-slate-900"
      dir="rtl"
    >
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="container max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <HomeIcon className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50">
              تتبع الطلب{" "}
              <span className="text-primary font-mono text-lg mr-2">
                {orderData.id}
              </span>
            </h1>
          </div>
          <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            جاري التنفيذ
          </div>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content - Right Side */}
          <div className="md:col-span-2 space-y-6">
            {/* Map Visualization (Placeholder) */}
            <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl overflow-hidden h-[300px] relative group">
              <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <SewingPinFilledIcon className="w-12 h-12 text-primary mx-auto animate-bounce" />
                  <p className="text-slate-500 font-medium">خريطة تتبع الفني</p>
                </div>
                {/* Simulated Map Background */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center" />
              </div>

              {/* Floating Status Card on Map */}
              <div className="absolute bottom-4 right-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                    <SewingPinFilledIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">الوجهة</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                      {orderData.service.location.address}
                    </p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-500">الوقت المتوقع</p>
                  <p className="text-sm font-bold text-primary">15 دقيقة</p>
                </div>
              </div>
            </Card>

            {/* Technician Card */}
            <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-slate-50 dark:border-slate-800 shadow-md">
                      <AvatarImage src={orderData.technician.image} />
                      <AvatarFallback>
                        {orderData.technician.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-white dark:border-slate-900" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-1">
                      {orderData.technician.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                      <StarFilledIcon className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {orderData.technician.rating}
                      </span>
                      <span>•</span>
                      <span>فني معتمد</span>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        className="rounded-xl gap-2 bg-primary hover:bg-primary/90"
                      >
                        <MobileIcon className="w-4 h-4" />
                        اتصال
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl gap-2"
                      >
                        <ChatBubbleIcon className="w-4 h-4" />
                        مراسلة
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline - Left Side */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl overflow-hidden h-full">
              <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 pb-4">
                <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  حالة الطلب
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 relative">
                {/* Timeline Line */}
                <div className="absolute top-8 bottom-8 right-[2.65rem] w-0.5 bg-slate-200 dark:bg-slate-800" />

                <div className="space-y-8 relative z-10">
                  {orderData.steps.map((step, index) => (
                    <div key={step.id} className="flex gap-4 relative">
                      {/* Icon */}
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-white dark:border-slate-900 shadow-sm transition-all duration-500",
                          step.status === "completed"
                            ? "bg-green-500 text-white"
                            : step.status === "current"
                            ? "bg-primary text-white ring-4 ring-primary/20"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                        )}
                      >
                        {step.status === "completed" ? (
                          <CheckCircledIcon className="w-6 h-6" />
                        ) : (
                          <CircleIcon className="w-5 h-5" />
                        )}
                      </div>

                      {/* Content */}
                      <div
                        className={cn(
                          "flex-1 pt-1 transition-all duration-500",
                          step.status === "pending" && "opacity-50 grayscale"
                        )}
                      >
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base mb-1">
                          {step.label}
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                          {step.description}
                        </p>
                        {step.time && (
                          <span className="text-xs font-medium text-slate-400 mt-2 block bg-slate-50 dark:bg-slate-800/50 w-fit px-2 py-1 rounded-md">
                            {step.time}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cancel Order Button */}
        <div className="mt-8 text-center">
          <Button
            variant="ghost"
            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            إلغاء الطلب
          </Button>
        </div>
      </div>
    </div>
  );
}
