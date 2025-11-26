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
  UploadIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock Request Data
const MOCK_REQUEST = {
  id: "REQ-9876",
  customer: {
    name: "محمد علي",
    image: "https://i.pravatar.cc/150?u=mohamed",
    rating: 4.8,
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
      className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100/50 dark:from-slate-950 dark:to-slate-900 py-8 px-4"
      dir="rtl"
    >
      <Card className="w-full max-w-2xl mx-auto border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm overflow-hidden relative animate-in fade-in zoom-in-95 duration-500">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 dark:bg-slate-800 z-10">
          <div
            className="h-full bg-primary transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(var(--primary),0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <CardHeader className="text-center pt-8 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <Badge
              variant="outline"
              className="gap-1 px-3 py-1 text-sm font-medium border-primary/20 text-primary bg-primary/5"
            >
              <TimerIcon className="w-4 h-4" />
              ينتهي العرض خلال {timeLeft} ثانية
            </Badge>
            <Badge variant="secondary" className="text-sm">
              {MOCK_REQUEST.id}
            </Badge>
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            طلب خدمة جديد
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8 p-6">
          {/* Customer Info */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <Avatar className="w-16 h-16 border-2 border-white dark:border-slate-700 shadow-sm">
              <AvatarImage src={MOCK_REQUEST.customer.image} />
              <AvatarFallback>{MOCK_REQUEST.customer.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-50">
                {MOCK_REQUEST.customer.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 text-yellow-500 font-bold">
                  ★ {MOCK_REQUEST.customer.rating}
                </span>
                <span>• عميل مميز</span>
              </div>
            </div>
          </div>

          {/* Service Details Summary */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2 text-slate-900 dark:text-slate-50">
              <FileTextIcon className="text-primary w-5 h-5" />
              تفاصيل الخدمة
            </h3>

            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  الفئة الأساسية
                </label>
                <div className="flex flex-wrap gap-2">
                  <Badge className="text-sm py-1 px-3 bg-primary hover:bg-primary/90">
                    {MOCK_REQUEST.service.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-sm py-1 px-3 border-slate-300 dark:border-slate-700"
                  >
                    {MOCK_REQUEST.service.subCategory}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  وصف المشكلة
                </label>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed">
                  {MOCK_REQUEST.service.description}
                </div>
              </div>

              {/* Attachments */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> مرفقات (صور/فيديو)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {MOCK_REQUEST.service.attachments.map((src, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 group relative cursor-pointer"
                    >
                      <img
                        src={src}
                        alt="Attachment"
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>
                  ))}
                  <div className="aspect-square rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 bg-slate-50 dark:bg-slate-800/30">
                    <span className="text-xs text-center px-1">
                      لا توجد المزيد من المرفقات
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Location */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2 text-slate-900 dark:text-slate-50">
              <SewingPinFilledIcon className="text-primary w-5 h-5" />
              موقع الخدمة
            </h3>

            <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
              {/* Placeholder Map Image */}
              <img
                src="https://static-maps.yandex.ru/1.x/?lang=en-US&ll=46.6753,24.7136&z=13&l=map&size=600,300"
                alt="Map Location"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-slate-900 p-2 rounded-full shadow-lg animate-bounce">
                  <SewingPinFilledIcon className="w-8 h-8 text-red-500" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-mono shadow-sm">
                {MOCK_REQUEST.location.coordinates.lat},{" "}
                {MOCK_REQUEST.location.coordinates.lng}
              </div>
            </div>

            <div className="grid gap-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="font-bold min-w-[60px]">العنوان:</span>
                <span className="text-slate-600 dark:text-slate-400">
                  {MOCK_REQUEST.location.address}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold min-w-[60px]">تفاصيل:</span>
                <span className="text-slate-600 dark:text-slate-400">
                  {MOCK_REQUEST.location.details}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold min-w-[60px]">المسافة:</span>
                <span className="text-slate-600 dark:text-slate-400">
                  {MOCK_REQUEST.location.distance} (
                  {MOCK_REQUEST.location.duration})
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Timing */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2 text-slate-900 dark:text-slate-50">
              <CalendarIcon className="text-primary w-5 h-5" />
              توقيت الخدمة
            </h3>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  الموعد المطلوب
                </p>
                <p className="text-lg font-bold text-primary">
                  {MOCK_REQUEST.schedule.time}
                </p>
              </div>
              <div className="text-left">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  التاريخ
                </p>
                <p className="font-medium">{MOCK_REQUEST.schedule.date}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="sticky bottom-0 -mx-6 -mb-6 p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4">
            <Button
              onClick={() => handleReject("manual")}
              variant="outline"
              className="h-14 text-lg font-bold border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/50 rounded-xl gap-2"
            >
              <Cross1Icon className="w-5 h-5" /> رفض
            </Button>
            <Button
              onClick={handleAccept}
              className="h-14 text-lg font-bold bg-green-600 hover:bg-green-700 text-white rounded-xl gap-2 shadow-lg shadow-green-900/20"
            >
              <CheckIcon className="w-5 h-5" /> قبول
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
