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
  Upload,
  MessagesSquare,
  Wrench,
  CreditCard,
  CheckCircle,
} from "lucide-react";

const timelineSteps = [
  {
    icon: Upload,
    title: "إرسال الطلب",
    description: "صف مشروعك بالتفصيل مع رفع الصور أو المخططات.",
  },
  {
    icon: MessagesSquare,
    title: "استلام العروض",
    description: "استقبل عروض أسعار تنافسية من أفضل الفنيين لدينا.",
  },
  {
    icon: Wrench,
    title: "اختيار الفني",
    description: "قارن بين العروض والتقييمات لاختيار الفني الأنسب.",
  },
  {
    icon: CreditCard,
    title: "الدفع الآمن",
    description: "ادفع دفعة مقدمة بشكل آمن عبر المنصة لبدء العمل.",
  },
  {
    icon: CheckCircle,
    title: "إنجاز المشروع",
    description: "تابع سير العمل حتى إنجاز مشروعك بالكامل ورضاك التام.",
  },
];

// --- المكون الرئيسي للسكشن ---
export default function ComplexServicesSection() {
  return (
    <section className="w-full bg-background text-foreground py-16 md:py-24 overflow-hidden">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* --- العمود الأيمن: المحتوى والخطوات --- */}
          <div className="space-y-8 text-right" dir="rtl">
            <div>
              <h4 className="text-sm font-semibold text-secondary-foreground tracking-wider uppercase mb-3">
                الخدمات المخصصة
              </h4>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground leading-tight">
                هل لديك مشروع معقد يحتاج لأكثر من زيارة؟
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                بعض المشاريع لا تُنجز في ساعة. هنا يمكنك وصف مشروعك بالتفصيل،
                رفع الصور، وتلقي عروض دقيقة من فنيين مختصين لاختيار الأنسب لك.
              </p>
            </div>

            {/* --- الخطوات (Timeline) --- */}
            <div className="relative">
              {/* الخط الرأسي الذي يربط الأيقونات */}
              <div className="absolute top-0 bottom-0 right-6 w-0.5 bg-border -translate-x-1/2" />

              <ul className="space-y-10">
                {timelineSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-6">
                    {/* الأيقونة الدائرية */}
                    <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    {/* عنوان ووصف الخطوة */}
                    <div className="pt-2">
                      <h3 className="font-bold text-card-foreground text-md">
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

          {/* --- العمود الأيسر: الكارد ونموذج الطلب --- */}
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md shadow-lg" dir="rtl">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold">
                  أرسل تفاصيل مشروعك
                </CardTitle>
                <CardDescription>
                  لنصلك بأفضل العروض من الفنيين المحترفين
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل</Label>
                      <Input id="name" placeholder="مثال: علي محمد" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الجوال</Label>
                      <Input id="phone" placeholder="9665xxxxxxx" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-type">نوع المشروع</Label>
                    <Select>
                      <SelectTrigger id="project-type">
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
                  <div className="space-y-2">
                    <Label htmlFor="description">وصف مختصر للمشروع</Label>
                    <Textarea
                      id="description"
                      placeholder="مثال: أحتاج لتجديد دورة مياه بالكامل..."
                      rows={3}
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full mt-4">
                    أرسل الطلب الآن
                  </Button>
                  <p className="text-xs text-muted-foreground text-center pt-2">
                    سيتم نقلك إلى نموذج تفصيلي لإكمال بيانات المشروع ورفع الصور.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
