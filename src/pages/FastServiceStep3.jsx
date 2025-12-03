import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowRightIcon,
  CheckIcon,
  SewingPinFilledIcon,
  CalendarIcon,
  PersonIcon,
  FileTextIcon,
  ReaderIcon,
  IdCardIcon,
  StarFilledIcon,
  CheckCircledIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StepsIndicator from "@/components/ui/StepsIndicator";
import { cn } from "@/lib/utils";

export default function FastServiceStep3() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    serviceData: passedServiceData,
    technicianData: passedTechnicianData,
  } = location.state || {};

  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  // Fallback Mock Data (if accessed directly or state is missing)
  const serviceData = passedServiceData || {
    mainCategory: "خدمات التكييف",
    subCategory: "صيانة مكيفات سبليت",
    schedule: "scheduled",
    date: new Date(),
    time: "10:00 AM",
    location: { address: "الرياض، حي الملز، شارع الجامعة" }, // Adjusted to match structure
  };

  const technicianData = passedTechnicianData || {
    name: "أحمد محمد",
    profession: "فني تكييف وتبريد",
    rating: 4.9,
    tasksCompleted: 350,
    image: "https://i.pravatar.cc/150?u=ahmed",
  };

  const paymentData = {
    visitFee: 50,
    serviceStartPrice: 250,
    total: 300,
  };

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const validatePayment = () => {
    if (paymentMethod === "card") {
      const newErrors = {};
      if (!cardDetails.number || cardDetails.number.length < 16)
        newErrors.number = "رقم البطاقة غير صحيح";
      if (!cardDetails.expiry) newErrors.expiry = "تاريخ الانتهاء مطلوب";
      if (!cardDetails.cvv || cardDetails.cvv.length < 3)
        newErrors.cvv = "CVV مطلوب";
      if (!cardDetails.name) newErrors.name = "اسم صاحب البطاقة مطلوب";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
    return true;
  };

  const handlePayment = () => {
    if (validatePayment()) {
      console.log("Processing Payment...", { paymentMethod, cardDetails });
      // Navigate to success page or show success message
      navigate("/service/tracking", { state: { serviceData, technicianData } });
    } else {
      console.log("Payment validation failed");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        {/* Skeleton Header */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border shadow-md p-4">
          <Skeleton className="h-12 w-full max-w-3xl mx-auto rounded-full" />
        </div>

        <div className="container max-w-4xl mx-auto px-4 py-12 space-y-8">
          {/* Technician Skeleton */}
          <Card className="border-0 shadow-lg p-6">
            <div className="flex items-center gap-4">
              <Skeleton className="w-16 h-16 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </Card>

          {/* Service Summary Skeleton */}
          <Card className="border-0 shadow-lg p-6 space-y-4">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </Card>

          {/* Payment Breakdown Skeleton */}
          <Card className="border-0 shadow-lg p-6 space-y-4">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-6 w-full mt-4" />
            </div>
          </Card>

          {/* Buttons Skeleton */}
          <div className="flex gap-4">
            <Skeleton className="h-14 w-1/3 rounded-xl" />
            <Skeleton className="h-14 w-2/3 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Steps Header - Sticky */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border shadow-md transition-all duration-300">
        <StepsIndicator
          steps={[
            { label: "تفاصيل الخدمة", status: "completed" },
            { label: "اختيار الفني", status: "completed" },
            { label: "الدفع", status: "active" },
          ]}
        />
      </div>

      {/* Main Container */}
      <div className="container max-w-4xl mx-auto px-4 pb-24 pt-12 space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-4 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            مراجعة الطلب والدفع
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            راجع تفاصيل طلبك واختر طريقة الدفع المناسبة لإتمام الحجز.
          </p>
        </div>

        <div className="space-y-8">
          {/* Summary Section */}
          <div className="space-y-6">
            {/* 1. Technician Summary */}
            <Card className="border-0 shadow-lg shadow-black/5 bg-card/80 backdrop-blur-sm rounded-3xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
              <CardHeader className="bg-muted/50 border-b border-border pb-4">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <PersonIcon className="w-6 h-6 text-primary" /> الفني المختار
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center gap-5">
                  <Avatar className="w-20 h-20 border-4 border-background shadow-md">
                    <AvatarImage
                      src={technicianData.image}
                      alt={technicianData.name}
                    />
                    <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                      {technicianData.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-1">
                      {technicianData.name}
                    </h3>
                    <p className="text-primary font-medium text-base mb-2">
                      {technicianData.profession}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1 bg-muted px-2 py-1 rounded-lg">
                        <StarFilledIcon className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold text-foreground">
                          {technicianData.rating}
                        </span>
                      </span>
                      <span className="flex items-center gap-1 bg-muted px-2 py-1 rounded-lg">
                        <CheckCircledIcon className="w-4 h-4 text-green-500" />
                        {technicianData.tasksCompleted} مهمة
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Service Summary */}
            <Card className="border-0 shadow-lg shadow-black/5 bg-card/80 backdrop-blur-sm rounded-3xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500 delay-100">
              <CardHeader className="bg-muted/50 border-b border-border pb-4">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <FileTextIcon className="w-6 h-6 text-primary" /> ملخص خدمتك
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 p-4 bg-muted/50 rounded-2xl border border-border">
                    <span className="text-sm text-muted-foreground">
                      الخدمة الأساسية
                    </span>
                    <span className="text-lg font-bold text-foreground">
                      {serviceData.mainCategory}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 p-4 bg-muted/50 rounded-2xl border border-border">
                    <span className="text-sm text-muted-foreground">
                      الخدمة الفرعية
                    </span>
                    <span className="text-lg font-bold text-foreground">
                      {serviceData.subCategory === "other"
                        ? serviceData.customSubCategory
                        : serviceData.subCategory}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" /> الموعد المحدد
                  </span>
                  <div className="flex items-center gap-3 text-lg font-bold text-foreground bg-primary/5 p-4 rounded-2xl border border-primary/10">
                    {serviceData.schedule === "now" ? (
                      <span className="text-primary">الآن (مستعجل)</span>
                    ) : (
                      <span>
                        {serviceData.date
                          ? new Date(serviceData.date).toLocaleDateString(
                              "ar-EG"
                            )
                          : "غير محدد"}{" "}
                        - {serviceData.time}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <SewingPinFilledIcon className="w-4 h-4" /> الموقع
                  </span>
                  <div className="text-base font-medium text-muted-foreground bg-muted/50 p-4 rounded-2xl border border-border leading-relaxed">
                    {serviceData.location?.address ||
                      "تم تحديد الموقع على الخريطة"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Left Column: Payment */}
          <div className="space-y-6">
            {/* 3. Payment Breakdown */}
            <Card className="border-0 shadow-lg shadow-black/5 bg-card/80 backdrop-blur-sm rounded-3xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500 delay-200 h-fit">
              <CardHeader className="bg-muted/50 border-b border-border pb-4">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <ReaderIcon className="w-6 h-6 text-primary" /> تفاصيل الدفع
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>رسوم الزيارة</span>
                  <span className="font-semibold">
                    {paymentData.visitFee} ج.م
                  </span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>تكلفة الخدمة (تبدأ من)</span>
                  <span className="font-semibold">
                    {paymentData.serviceStartPrice} ج.م
                  </span>
                </div>
                <Separator className="my-2 bg-border" />
                <div className="flex justify-between items-center text-primary text-xl font-extrabold bg-primary/5 p-4 rounded-xl -mx-2">
                  <span>الإجمالي المتوقع</span>
                  <span>{paymentData.total} ج.م</span>
                </div>
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  * السعر النهائي يحدده الفني بعد المعاينة، وسيتم خصم رسوم
                  الزيارة من الإجمالي في حال الاتفاق.
                </p>
              </CardContent>
            </Card>

            {/* 4. Payment Methods */}
            <Card className="border-0 shadow-lg shadow-black/5 bg-card/80 backdrop-blur-sm rounded-3xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500 delay-300">
              <CardHeader className="bg-muted/50 border-b border-border pb-4">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <IdCardIcon className="w-6 h-6 text-primary" /> طريقة الدفع
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
                  {/* Wallet */}
                  <div
                    className={cn(
                      "flex items-center space-x-4 space-x-reverse p-4 rounded-2xl border-2 transition-all cursor-pointer hover:bg-muted",
                      paymentMethod === "wallet"
                        ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                        : "border-border"
                    )}
                  >
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Label
                      htmlFor="wallet"
                      className="flex-1 cursor-pointer font-bold text-base flex items-center justify-between text-foreground"
                    >
                      <span>محفظة الموقع</span>
                      <span className="text-primary font-extrabold bg-card px-2 py-1 rounded-lg shadow-sm">
                        500 ج.م
                      </span>
                    </Label>
                  </div>

                  {/* Card */}
                  <div
                    className={cn(
                      "flex flex-col space-y-4 p-4 rounded-2xl border-2 transition-all cursor-pointer hover:bg-muted",
                      paymentMethod === "card"
                        ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                        : "border-border"
                    )}
                  >
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <RadioGroupItem value="card" id="card" />
                      <Label
                        htmlFor="card"
                        className="flex-1 cursor-pointer font-bold text-base flex items-center gap-2 text-foreground"
                      >
                        بطاقة بنكية
                        <div className="flex gap-1 mr-auto">
                          <IdCardIcon className="w-6 h-6 text-muted-foreground" />
                        </div>
                      </Label>
                    </div>

                    {/* Card Form */}
                    {paymentMethod === "card" && (
                      <div
                        className="pt-4 space-y-4 animate-in slide-in-from-top-2 fade-in duration-300 cursor-default border-t border-primary/10 mt-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            رقم البطاقة
                          </Label>
                          <div className="relative">
                            <Input
                              placeholder="0000 0000 0000 0000"
                              value={cardDetails.number}
                              onChange={(e) => {
                                setCardDetails({
                                  ...cardDetails,
                                  number: e.target.value,
                                });
                                if (errors.number)
                                  setErrors((prev) => ({
                                    ...prev,
                                    number: null,
                                  }));
                              }}
                              className={cn(
                                "bg-card h-11 border-border focus:ring-2 focus:ring-primary/20",
                                errors.number && "border-red-500"
                              )}
                              dir="ltr"
                            />
                            <LockClosedIcon className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                          </div>
                          {errors.number && (
                            <p className="text-xs text-red-500 font-bold">
                              {errors.number}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                              تاريخ الانتهاء
                            </Label>
                            <Input
                              placeholder="MM/YY"
                              value={cardDetails.expiry}
                              onChange={(e) => {
                                setCardDetails({
                                  ...cardDetails,
                                  expiry: e.target.value,
                                });
                                if (errors.expiry)
                                  setErrors((prev) => ({
                                    ...prev,
                                    expiry: null,
                                  }));
                              }}
                              className={cn(
                                "bg-card h-11 border-border focus:ring-2 focus:ring-primary/20",
                                errors.expiry && "border-red-500"
                              )}
                              dir="ltr"
                            />
                            {errors.expiry && (
                              <p className="text-xs text-red-500 font-bold">
                                {errors.expiry}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                              CVV
                            </Label>
                            <Input
                              placeholder="123"
                              value={cardDetails.cvv}
                              onChange={(e) => {
                                setCardDetails({
                                  ...cardDetails,
                                  cvv: e.target.value,
                                });
                                if (errors.cvv)
                                  setErrors((prev) => ({ ...prev, cvv: null }));
                              }}
                              className={cn(
                                "bg-card h-11 border-border focus:ring-2 focus:ring-primary/20",
                                errors.cvv && "border-red-500"
                              )}
                              dir="ltr"
                            />
                            {errors.cvv && (
                              <p className="text-xs text-red-500 font-bold">
                                {errors.cvv}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            اسم صاحب البطاقة
                          </Label>
                          <Input
                            placeholder="Name on Card"
                            value={cardDetails.name}
                            onChange={(e) => {
                              setCardDetails({
                                ...cardDetails,
                                name: e.target.value,
                              });
                              if (errors.name)
                                setErrors((prev) => ({ ...prev, name: null }));
                            }}
                            className={cn(
                              "bg-card h-11 border-border focus:ring-2 focus:ring-primary/20",
                              errors.name && "border-red-500"
                            )}
                          />
                          {errors.name && (
                            <p className="text-xs text-red-500 font-bold">
                              {errors.name}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cash */}
                  <div
                    className={cn(
                      "flex items-center space-x-4 space-x-reverse p-4 rounded-2xl border-2 transition-all cursor-pointer hover:bg-muted",
                      paymentMethod === "cash"
                        ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                        : "border-border"
                    )}
                  >
                    <RadioGroupItem value="cash" id="cash" />
                    <Label
                      htmlFor="cash"
                      className="flex-1 cursor-pointer font-bold text-base text-foreground"
                    >
                      الدفع عند الاستلام
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Navigation Buttons - Normal Flow */}
      <div className="container max-w-4xl mx-auto px-4 pb-12">
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-full md:w-auto min-w-[160px] h-14 text-lg font-medium gap-2 rounded-xl border-2 hover:bg-muted transition-all"
          >
            <ArrowRightIcon className="w-5 h-5" />
            السابق
          </Button>
          <Button
            onClick={handlePayment}
            disabled={!paymentMethod}
            className="w-full md:flex-1 h-14 text-lg font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all gap-2 rounded-xl"
          >
            {paymentMethod === "cash" ? "تأكيد الحجز" : "تأكيد الدفع"}
            <CheckIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
