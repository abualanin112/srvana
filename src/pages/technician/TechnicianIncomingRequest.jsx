import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  SewingPinFilledIcon,
  TimerIcon,
  CheckIcon,
  Cross1Icon,
  CalendarIcon,
  FileTextIcon,
  ImageIcon,
  PersonIcon,
  DashboardIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Mock Request Data
const MOCK_REQUEST = {
  id: "REQ-9876",
  customer: {
    name: "محمد علي",
    image: "https://i.pravatar.cc/150?u=mohamed",
    rating: 4.8,
    type: "عميل مميز",
  },
  service: {
    category: "صيانة تكييف",
    subCategory: "صيانة مكيف سبليت",
    description:
      "المكيف لا يبرد بشكل جيد، ويصدر صوتاً غريباً عند التشغيل. تم تنظيف الفلاتر ولكن المشكلة مستمرة.",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop",
    attachments: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?w=150&h=150&fit=crop",
    ],
  },
  location: {
    address: "الرياض، حي العليا، شارع التحلية",
    details: "بجوار مكتبة جرير، عمارة 15، الطابق الثالث، شقة 12",
    coordinates: { lat: 24.7136, lng: 46.6753 },
    distance: "3.5 كم",
    duration: "10 دقائق",
  },
  schedule: {
    type: "now",
    time: "الآن (مستعجل)",
    date: "2024-11-26",
  },
  price: "250 - 300 ج.م",
};

export default function TechnicianIncomingRequest() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(60);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleReject("timeout");
          return 0;
        }
        return prev - 1;
      });
      setProgress((prev) => prev - 100 / 60);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAccept = () => {
    navigate("/technician/task-tracking", { state: { request: MOCK_REQUEST } });
  };

  const handleReject = (reason = "manual") => {
    navigate("/technician/reject-reason", {
      state: { request: MOCK_REQUEST, autoReject: reason === "timeout" },
    });
  };

  return (
    <div
      className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 flex items-center justify-center"
      dir="rtl"
    >
      <Card className="w-full max-w-2xl border-0 shadow-2xl bg-white dark:bg-slate-900 overflow-hidden relative animate-in fade-in zoom-in-95 duration-500 ring-1 ring-slate-200 dark:ring-slate-800">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 dark:bg-slate-800 z-20">
          <div
            className={cn(
              "h-full transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(var(--primary),0.5)]",
              timeLeft > 30
                ? "bg-green-500"
                : timeLeft > 10
                ? "bg-amber-500"
                : "bg-red-500"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>

        <CardHeader className="text-center pt-8 pb-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between mb-2">
            <Badge
              variant="outline"
              className={cn(
                "gap-1.5 px-3 py-1.5 text-sm font-bold border-2",
                timeLeft > 30
                  ? "border-green-100 text-green-600 bg-green-50"
                  : timeLeft > 10
                  ? "border-amber-100 text-amber-600 bg-amber-50"
                  : "border-red-100 text-red-600 bg-red-50 animate-pulse"
              )}
            >
              <TimerIcon className="w-4 h-4" />
              {timeLeft} ثانية متبقية
            </Badge>
            <Badge
              variant="secondary"
              className="text-sm font-mono bg-slate-200 dark:bg-slate-800"
            >
              {MOCK_REQUEST.id}
            </Badge>
          </div>
          <CardTitle className="text-2xl font-black text-slate-900 dark:text-white">
            طلب خدمة جديد
          </CardTitle>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
            يرجى مراجعة التفاصيل والرد قبل انتهاء الوقت
          </p>
        </CardHeader>

        <CardContent className="p-0">
          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
            <div className="p-6 space-y-8">
              {/* 1. Customer Info */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <Avatar className="w-16 h-16 border-4 border-white dark:border-slate-700 shadow-sm">
                  <AvatarImage src={MOCK_REQUEST.customer.image} />
                  <AvatarFallback>
                    {MOCK_REQUEST.customer.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    {MOCK_REQUEST.customer.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm mt-1">
                    <span className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-md">
                      ★ {MOCK_REQUEST.customer.rating}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <PersonIcon className="w-3.5 h-3.5" />
                      {MOCK_REQUEST.customer.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Service Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <DashboardIcon className="w-5 h-5" />
                  </div>
                  تفاصيل الخدمة
                </div>

                <div className="grid gap-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="text-sm py-1.5 px-4 bg-primary hover:bg-primary/90 shadow-sm">
                      {MOCK_REQUEST.service.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-sm py-1.5 px-4 border-slate-200 dark:border-slate-700 font-medium"
                    >
                      {MOCK_REQUEST.service.subCategory}
                    </Badge>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {MOCK_REQUEST.service.description}
                    </p>
                  </div>

                  {/* Attachments */}
                  {MOCK_REQUEST.service.attachments.length > 0 && (
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-primary" /> المرفقات
                      </label>
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {MOCK_REQUEST.service.attachments.map((src, i) => (
                          <div
                            key={i}
                            className="w-24 h-24 shrink-0 rounded-xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 relative group cursor-pointer"
                          >
                            <img
                              src={src}
                              alt="Attachment"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* 3. Location & Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary font-bold text-lg">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <SewingPinFilledIcon className="w-5 h-5" />
                    </div>
                    الموقع
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                    <p className="font-bold text-slate-900 dark:text-white">
                      {MOCK_REQUEST.location.address}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {MOCK_REQUEST.location.details}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/5 w-fit px-3 py-1 rounded-full">
                      <span>يبعد {MOCK_REQUEST.location.distance}</span>
                      <span>•</span>
                      <span>{MOCK_REQUEST.location.duration} قيادة</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary font-bold text-lg">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <CalendarIcon className="w-5 h-5" />
                    </div>
                    التوقيت
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400 text-sm">
                        الموعد
                      </span>
                      <span className="font-bold text-red-500 flex items-center gap-1">
                        <TimerIcon className="w-4 h-4" />
                        {MOCK_REQUEST.schedule.time}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400 text-sm">
                        التاريخ
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {MOCK_REQUEST.schedule.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Footer */}
          <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-10 relative">
            <Button
              onClick={() => handleReject("manual")}
              variant="outline"
              className="h-14 text-lg font-bold border-2 border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-950/30 rounded-2xl gap-2 transition-all duration-300"
            >
              <Cross1Icon className="w-5 h-5" /> رفض الطلب
            </Button>
            <Button
              onClick={handleAccept}
              className="h-14 text-lg font-bold bg-green-600 hover:bg-green-700 text-white rounded-2xl gap-2 shadow-lg shadow-green-600/20 hover:shadow-green-600/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <CheckIcon className="w-6 h-6" /> قبول المهمة
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
