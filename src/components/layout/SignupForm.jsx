"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function SignupForm({ className, ...props }) {
  const navigate = useNavigate();

  const governorates = {
    القاهرة: ["مدينة نصر", "المعادي", "مصر الجديدة", "شبرا", "حلوان"],
    الجيزة: ["الدقي", "العجوزة", "6 أكتوبر", "الهرم", "المهندسين"],
    الإسكندرية: ["سيدي جابر", "سموحة", "العجمي", "المنتزه", "محرم بك"],
    الشرقية: ["الزقازيق", "بلبيس", "العاشر من رمضان", "منيا القمح"],
    الدقهلية: ["المنصورة", "ميت غمر", "طلخا", "بلقاس"],
    الغربية: ["طنطا", "المحلة الكبرى", "زفتى", "كفر الزيات"],
    البحيرة: ["دمنهور", "كفر الدوار", "إيتاي البارود", "رشيد"],
    المنوفية: ["شبين الكوم", "منوف", "السادات", "تلا"],
    القليوبية: ["بنها", "قليوب", "شبرا الخيمة", "الخانكة"],
    بني_سويف: ["بني سويف", "الواسطى", "الفشن"],
    الفيوم: ["الفيوم", "سنورس", "طامية"],
    المنيا: ["المنيا", "مغاغة", "ملوي", "بني مزار"],
    أسيوط: ["أسيوط", "ديروط", "منفلوط"],
    سوهاج: ["سوهاج", "جرجا", "طهطا"],
    قنا: ["قنا", "نجع حمادي", "دشنا"],
    الأقصر: ["الأقصر", "البياضية", "إسنا"],
    أسوان: ["أسوان", "كوم أمبو", "إدفو"],
    البحر_الأحمر: ["الغردقة", "رأس غارب", "سفاجا"],
    شمال_سيناء: ["العريش", "بئر العبد"],
    جنوب_سيناء: ["شرم الشيخ", "دهب", "نويبع", "الطور"],
    مطروح: ["مرسى مطروح", "الحمام", "الضبعة", "سيدي براني"],
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      accountType: [],
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      governorate: "",
      area: "",
      password: "",
      confirmPassword: "",
    },
  });

  const selectedGovernorate = watch("governorate");

  const onSubmit = (data) => {
    // Signup data submitted
    toast.success("تم إنشاء الحساب بنجاح (محاكاة)");

    const nextPath = data.accountType.includes("technician")
      ? "/signup/technician-details"
      : "/clientdashboard";

    navigate(nextPath);
  };

  return (
    <div
      dir="rtl"
      className={cn("flex flex-col gap-6 w-full", className)}
      {...props}
    >
      <Card className="shadow-xs border">
        <CardHeader className="text-center space-y-1 pt-4">
          <CardTitle className="text-xl font-semibold">أنشئ حسابك</CardTitle>
          <CardDescription>أدخل بياناتك لإنشاء حسابك الجديد</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* --- نوع الحساب --- */}
            <div className="space-y-2">
              <Label>نوع الحساب</Label>
              <div className="flex items-center justify-right p-3 pr-0 gap-8">
                <div className="flex items-center gap-2">
                  <Controller
                    control={control}
                    name="accountType"
                    rules={{
                      validate: (value) =>
                        value.length > 0 ||
                        "يرجى اختيار نوع حساب واحد على الأقل",
                    }}
                    render={({ field: { value, onChange } }) => (
                      <Checkbox
                        id="account-type-client"
                        checked={value.includes("client")}
                        onCheckedChange={(checked) =>
                          onChange(
                            checked
                              ? [...value, "client"]
                              : value.filter((v) => v !== "client")
                          )
                        }
                      />
                    )}
                  />
                  <Label htmlFor="account-type-client" className="font-normal">
                    عميل
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <Controller
                    control={control}
                    name="accountType"
                    rules={{
                      validate: (value) =>
                        value.length > 0 ||
                        "يرجى اختيار نوع حساب واحد على الأقل",
                    }}
                    render={({ field: { value, onChange } }) => (
                      <Checkbox
                        id="account-type-technician"
                        checked={value.includes("technician")}
                        onCheckedChange={(checked) =>
                          onChange(
                            checked
                              ? [...value, "technician"]
                              : value.filter((v) => v !== "technician")
                          )
                        }
                      />
                    )}
                  />
                  <Label
                    htmlFor="account-type-technician"
                    className="font-normal"
                  >
                    فني
                  </Label>
                </div>
              </div>
              {errors.accountType && (
                <p className="text-sm text-destructive">
                  {errors.accountType.message}
                </p>
              )}
            </div>

            {/* --- الاسم الأول والأخير --- */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">الاسم الأول</Label>
                <Input
                  id="first-name"
                  placeholder="محمد"
                  className="text-right focus-visible:ring-primary"
                  {...register("firstName", {
                    required: "الاسم الأول مطلوب",
                    minLength: {
                      value: 2,
                      message: "الاسم الأول يجب أن يكون حرفين على الأقل",
                    },
                  })}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">الاسم الأخير</Label>
                <Input
                  id="last-name"
                  placeholder="أحمد"
                  className="text-right focus-visible:ring-primary"
                  {...register("lastName", {
                    required: "الاسم الأخير مطلوب",
                    minLength: {
                      value: 2,
                      message: "الاسم الأخير يجب أن يكون حرفين على الأقل",
                    },
                  })}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* --- رقم الجوال --- */}
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الجوال</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="01xxxxxxxxx"
                className="text-right focus-visible:ring-primary"
                {...register("phone", {
                  required: "رقم الجوال مطلوب",
                  pattern: {
                    value: /^01[0125][0-9]{8}$/,
                    message: "رقم الهاتف غير صالح",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* --- البريد الإلكتروني --- */}
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="text-right focus-visible:ring-primary"
                {...register("email", {
                  required: "البريد الإلكتروني مطلوب",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "البريد الإلكتروني غير صالح",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* --- المحافظة والمنطقة --- */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="governorate">المحافظة</Label>
                <Controller
                  control={control}
                  name="governorate"
                  rules={{ required: "يرجى اختيار المحافظة" }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onValueChange={(val) => {
                        onChange(val);
                      }}
                      dir="rtl"
                      value={value}
                    >
                      <SelectTrigger className="w-full text-right">
                        <SelectValue placeholder="اختر المحافظة" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(governorates).map((gov) => (
                          <SelectItem key={gov} value={gov}>
                            {gov.replace("_", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.governorate && (
                  <p className="text-sm text-destructive">
                    {errors.governorate.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">المنطقة</Label>
                <Controller
                  control={control}
                  name="area"
                  rules={{ required: "يرجى اختيار المنطقة" }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onValueChange={onChange}
                      disabled={!selectedGovernorate}
                      dir="rtl"
                      value={value}
                    >
                      <SelectTrigger className="w-full text-right">
                        <SelectValue
                          placeholder={
                            selectedGovernorate
                              ? "اختر المنطقة"
                              : "اختر المحافظة أولاً"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedGovernorate &&
                          governorates[selectedGovernorate]?.map((area) => (
                            <SelectItem key={area} value={area}>
                              {area}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.area && (
                  <p className="text-sm text-destructive">
                    {errors.area.message}
                  </p>
                )}
              </div>
            </div>

            {/* --- كلمة المرور وتأكيدها --- */}
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  className="text-right focus-visible:ring-primary"
                  {...register("password", {
                    required: "كلمة المرور مطلوبة",
                    minLength: {
                      value: 8,
                      message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  className="text-right focus-visible:ring-primary"
                  {...register("confirmPassword", {
                    required: "تأكيد كلمة المرور مطلوب",
                    validate: (val, formValues) =>
                      val === formValues.password || "كلمات المرور غير متطابقة",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <p className="text-xs text-muted-foreground pr-1">
              يجب أن تتكون من 8 أحرف على الأقل.
            </p>

            {/* --- زر إنشاء الحساب --- */}
            <div className="space-y-2">
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? "جاري الإنشاء..." : "إنشاء الحساب"}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                لديك حساب بالفعل؟{" "}
                <Link
                  to="/login"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      <p className="px-6 text-center text-sm text-muted-foreground">
        بالنقر على "متابعة"، فإنك توافق على{" "}
        <Link
          to="/terms"
          className="text-primary underline-offset-4 hover:underline"
        >
          شروط الخدمة
        </Link>{" "}
        و{" "}
        <Link
          to="/privacy"
          className="text-primary underline-offset-4 hover:underline"
        >
          سياسة الخصوصية
        </Link>
        .
      </p>
    </div>
  );
}
