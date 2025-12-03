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
  TargetIcon,
  ClockIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StepsIndicator from "@/components/ui/StepsIndicator"; // Assuming this component exists and is reusable
import { cn } from "@/lib/utils";

export default function ProjectReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectData, offerData } = location.state || {};

  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  // Fallback Mock Data
  const project = projectData || {
    title: "تشطيب شقة سكنية 150 متر",
    location: { address: "الرياض، حي العليا" },
    duration: "7",
    budget: "50000",
  };

  const offer = offerData || {
    price: "4500",
    duration: "5",
    technician: {
      name: "أحمد محمد",
      profession: "مقاول عام",
      rating: 4.8,
      tasksCompleted: 15,
      image: "https://i.pravatar.cc/150?u=1",
    },
  };

  const technician = offer.technician || {
    name: "أحمد محمد",
    profession: "مقاول عام",
    rating: 4.8,
    tasksCompleted: 15,
    image: "https://i.pravatar.cc/150?u=1",
  };

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
      // Navigate to tracking page
      // Mapping project data to serviceData structure for the generic tracking page
      const serviceDataForTracking = {
        mainCategory: "المشاريع",
        subCategory: project.title,
        location: project.location,
        date: new Date(),
        time: "09:00 AM",
      };

      navigate("/order/tracking", {
        state: {
          serviceData: serviceDataForTracking,
          technicianData: technician,
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <div className="container max-w-4xl mx-auto px-4 py-12 space-y-8">
          <Skeleton className="h-12 w-full max-w-md mx-auto rounded-full" />
          <Skeleton className="h-64 w-full rounded-3xl" />
          <Skeleton className="h-48 w-full rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Steps Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border shadow-md transition-all duration-300">
        {/* Reusing StepsIndicator but manually for now if needed, or just a simple header */}
        <div className="container mx-auto px-4 py-4">
          <h2 className="text-center font-bold text-lg">
            مراجعة المشروع والدفع
          </h2>
        </div>
      </div>

      {/* Main Container */}
      <div className="container max-w-4xl mx-auto px-4 pb-24 pt-8 space-y-8">
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
                    <AvatarImage src={technician.image} alt={technician.name} />
                    <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                      {technician.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-1">
                      {technician.name}
                    </h3>
                    <p className="text-primary font-medium text-base mb-2">
                      {technician.profession}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1 bg-muted px-2 py-1 rounded-lg">
                        <StarFilledIcon className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold text-foreground">
                          {technician.rating}
                        </span>
                      </span>
                      <span className="flex items-center gap-1 bg-muted px-2 py-1 rounded-lg">
                        <CheckCircledIcon className="w-4 h-4 text-green-500" />
                        {technician.tasksCompleted} مهمة
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Project Summary */}
            <Card className="border-0 shadow-lg shadow-black/5 bg-card/80 backdrop-blur-sm rounded-3xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500 delay-100">
              <CardHeader className="bg-muted/50 border-b border-border pb-4">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <FileTextIcon className="w-6 h-6 text-primary" /> تفاصيل
                  المشروع
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex flex-col gap-2 p-4 bg-muted/50 rounded-2xl border border-border">
                  <span className="text-sm text-muted-foreground">
                    عنوان المشروع
                  </span>
                  <span className="text-lg font-bold text-foreground">
                    {project.title}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <ClockIcon className="w-4 h-4" /> مدة التنفيذ
                    </span>
                    <div className="text-base font-bold text-foreground">
                      {offer.duration} أيام
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <TargetIcon className="w-4 h-4" /> الميزانية المقدرة
                    </span>
                    <div className="text-base font-bold text-foreground">
                      {parseInt(project.budget).toLocaleString()} ر.س
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <SewingPinFilledIcon className="w-4 h-4" /> الموقع
                  </span>
                  <div className="text-base font-medium text-foreground bg-muted/50 p-4 rounded-2xl border border-border leading-relaxed">
                    {project.location?.address}
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
                  <span>قيمة العرض المتفق عليه</span>
                  <span className="font-semibold">
                    {parseInt(offer.price).toLocaleString()} ر.س
                  </span>
                </div>
                <Separator className="my-2 bg-border" />
                <div className="flex justify-between items-center text-primary text-xl font-extrabold bg-primary/5 p-4 rounded-xl -mx-2">
                  <span>الإجمالي المطلوب</span>
                  <span>{parseInt(offer.price).toLocaleString()} ر.س</span>
                </div>
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  * سيتم حجز المبلغ في الموقع ولن يتم تسليمه للفني إلا بعد
                  تأكيدك لاستلام المشروع.
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
                      <span className="text-primary font-extrabold bg-background px-2 py-1 rounded-lg shadow-sm">
                        50,000 ر.س
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
                        {/* Simplified Card Form for brevity */}
                        <div className="space-y-2">
                          <Label>رقم البطاقة</Label>
                          <Input
                            placeholder="0000 0000 0000 0000"
                            className="bg-background"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="container max-w-4xl mx-auto px-4 pb-12">
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-full md:w-auto min-w-[160px] h-14 text-lg font-medium gap-2 rounded-xl border-2 hover:bg-accent transition-all"
          >
            <ArrowRightIcon className="w-5 h-5" />
            السابق
          </Button>
          <Button
            onClick={handlePayment}
            className="w-full md:flex-1 h-14 text-lg font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all gap-2 rounded-xl"
          >
            تأكيد الدفع وبدء المشروع
            <CheckIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
