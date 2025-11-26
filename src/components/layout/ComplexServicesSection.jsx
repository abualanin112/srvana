import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  UploadIcon,
  ChatBubbleIcon,
  GearIcon,
  IdCardIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";

const timelineSteps = [
  {
    icon: UploadIcon,
    title: "إرسال الطلب",
    description: "صف مشروعك بالتفصيل مع رفع الصور أو المخططات.",
  },
  {
    icon: ChatBubbleIcon,
    title: "استلام العروض",
    description: "استقبل عروض أسعار تنافسية من أفضل الفنيين لدينا.",
  },
  {
    icon: GearIcon,
    title: "اختيار الفني",
    description: "قارن بين العروض والتقييمات لاختيار الفني الأنسب.",
  },
  // {
  //   icon: IdCardIcon,
  //   title: "الدفع الآمن",
  //   description: "ادفع دفعة مقدمة بشكل آمن عبر المنصة لبدء العمل.",
  // },
  {
    icon: CheckCircledIcon,
    title: "إنجاز المشروع",
    description: "تابع سير العمل حتى إنجاز مشروعك بالكامل ورضاك التام.",
  },
];

// --- المكون الرئيسي للسكشن ---
export default function ComplexServicesSection() {
  return (
    <section className="w-full bg-background text-foreground py-16 md:py-24 overflow-hidden">
      <div className="container max-w-screen-xl mx-auto px-4 h-full lg:h-auto flex">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-stretch min-h-full">
          {/* --- العمود الأيمن: المحتوى والخطوات (3/5) --- */}
          <div
            className="w-full lg:w-7/12 space-y-8 text-right flex flex-col flex-grow"
            dir="rtl"
          >
            <div>
              <h4 className="text-lg text-primary font-semibold mb-2 tracking-wider">
                الخدمات المخصصة
              </h4>
              <h2 className="text-3xl lg:text-4xl font-extrabold  mb-4 text-foreground leading-tight">
                هل لديك مشروع معقد أو مهمة مخصصة؟
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                هنا يمكنك وصف مشروعك بالتفصيل، رفع الصور، وتلقي عروض دقيقة من
                فنيين مختصين لاختيار الأنسب لك.
              </p>
            </div>

            <div className="relative">
              <div className="absolute top-0 bottom-23 right-6 w-0.5 bg-border -translate-x-1/2" />
              <ul className="space-y-9 mb-8">
                {timelineSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-4 pr-0.5">
                    <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="pt-2">
                      <h3 className="font-bold text-primary text-md">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- العمود الأيسر: الكارد ونموذج الطلب (2/5) --- */}
          <div className="w-full lg:w-5/12 flex flex-col">
            <Card
              className="w-full flex-1 shadow-xs flex flex-col p-6 "
              dir="rtl"
            >
              <CardHeader className="text-center pt-4">
                <CardTitle className="text-xl font-bold">
                  أرسل تفاصيل مشروعك
                </CardTitle>
                <CardDescription>
                  لنصلك بأفضل العروض من الفنيين المحترفين
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow flex flex-col !p-0 py-4">
                <form className="space-y-4 flex flex-col flex-grow">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="lg:mb-3">
                        الاسم الكامل
                      </Label>
                      <Input id="name" placeholder="مثال: علي محمد" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="lg:mb-3">
                        رقم الهاتف
                      </Label>
                      <Input id="phone" placeholder="01xxxxxxxxx" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-type" className="lg:mb-3">
                      نوع المشروع
                    </Label>
                    <Select dir="rtl" className="trxt-right">
                      <SelectTrigger id="project-type" className="w-full">
                        <SelectValue placeholder="اختر نوع الخدمة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="renovation">تجديد شامل</SelectItem>
                        <SelectItem value="construction">بناء جديد</SelectItem>
                        <SelectItem value="electrical">تأسيس كهرباء</SelectItem>
                        <SelectItem value="plumbing">تأسيس سباكة</SelectItem>
                        <SelectItem value="other">مشروع آخر</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3 flex flex-col flex-grow">
                    <Label htmlFor="description" className="lg:mb-3">
                      وصف مختصر للمشروع
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="مثال: أحتاج لتجديد دورة مياه بالكامل..."
                      className="resize-none flex-grow"
                    />
                  </div>
                  <div className="mt-auto pt-2 pb-3">
                    <Button type="submit" size="lg" className="w-full">
                      أرسل الطلب الآن
                    </Button>
                    <p className="text-xs text-muted-foreground text-center pt-3">
                      سيتم نقلك إلى نموذج تفصيلي لإكمال بيانات المشروع ورفع
                      الصور.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
