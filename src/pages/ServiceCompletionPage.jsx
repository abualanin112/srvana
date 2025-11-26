import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CheckCircledIcon,
  StarFilledIcon,
  StarIcon,
  ExclamationTriangleIcon,
  ChatBubbleIcon,
  MobileIcon,
  FileTextIcon,
  SewingPinFilledIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// Mock Data
const MOCK_ORDER_DATA = {
  orderId: "ORD-12345",
  technician: {
    id: 1,
    name: "أحمد محمد",
    profession: "فني تكييف وتبريد",
    rating: 4.9,
    completedJobs: 120,
    image: "https://i.pravatar.cc/150?u=ahmed",
  },
  service: {
    mainCategory: "خدمات التكييف",
    subCategory: "صيانة مكيفات سبليت",
    schedule: "now",
    time: "10:00 AM",
    location: "الرياض، حي الملز، شارع الجامعة",
  },
};

export default function ServiceCompletionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceData, technicianData } = location.state || {};

  const [isLoading, setIsLoading] = useState(true);
  const [orderData] = useState({
    ...MOCK_ORDER_DATA,
    technician: technicianData
      ? { ...MOCK_ORDER_DATA.technician, ...technicianData }
      : MOCK_ORDER_DATA.technician,
    service: serviceData
      ? { ...MOCK_ORDER_DATA.service, ...serviceData }
      : MOCK_ORDER_DATA.service,
  });

  // Task confirmation state
  const [taskConfirmed, setTaskConfirmed] = useState(null); // null | true | false

  // Rating state
  const [rating, setRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");

  // Report issue state
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState("");
  const [otherIssueText, setOtherIssueText] = useState("");

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleTaskConfirmation = (confirmed) => {
    setTaskConfirmed(confirmed);
    if (!confirmed) {
      setReportDialogOpen(true);
    }
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleCompleteOrder = () => {
    // Save rating and complete order
    console.log({
      rating,
      comment: ratingComment,
      taskConfirmed,
    });
    // Navigate to services page
    navigate("/");
  };

  const canCompleteOrder = taskConfirmed === true && rating > 0;

  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100/50 dark:from-slate-950 dark:to-slate-900"
        dir="rtl"
      >
        <div className="container max-w-2xl mx-auto px-4 py-8 space-y-6">
          {/* Success Banner Skeleton */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center space-y-4">
              <Skeleton className="w-24 h-24 rounded-full mx-auto" />
              <Skeleton className="h-8 w-64 mx-auto" />
              <Skeleton className="h-4 w-96 mx-auto" />
            </CardContent>
          </Card>

          {/* Technician Card Skeleton */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 flex items-center gap-4">
              <Skeleton className="w-16 h-16 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-40" />
              </div>
            </CardContent>
          </Card>

          {/* Service Summary Skeleton */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 space-y-3">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>

          {/* Buttons Skeleton */}
          <div className="flex gap-4">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
          </div>

          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100/50 dark:from-slate-950 dark:to-slate-900"
      dir="rtl"
    >
      <div className="container max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Success Banner */}
        <Card className="border-0 shadow-lg bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900 animate-in fade-in slide-in-from-top-4 duration-500">
          <CardContent className="p-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircledIcon className="w-16 h-16 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-green-900 dark:text-green-100">
              تم إنهاء المهمة بنجاح
            </h1>
            <p className="text-green-700 dark:text-green-300 text-lg">
              من فضلك أكّد إذا تمت المهمة كما هو متفق عليه.
            </p>
          </CardContent>
        </Card>

        {/* Mini Technician Card */}
        <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500 delay-100">
          <CardContent className="p-6 flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-white dark:border-slate-700 shadow-md">
              <AvatarImage
                src={orderData.technician.image}
                alt={orderData.technician.name}
              />
              <AvatarFallback>{orderData.technician.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                {orderData.technician.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {orderData.technician.profession}
              </p>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                <span className="flex items-center gap-1 text-yellow-500 font-bold">
                  <StarFilledIcon /> {orderData.technician.rating}
                </span>
                <span>({orderData.technician.completedJobs} مهمة)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Summary */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-slate-100 dark:border-slate-800 space-y-2 animate-in fade-in slide-in-from-top-4 duration-500 delay-150">
          <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
            <FileTextIcon className="text-primary" /> ملخص الخدمة
          </h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                الخدمة:
              </span>{" "}
              {orderData.service.mainCategory} - {orderData.service.subCategory}
            </p>
            <p>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                الموعد:
              </span>{" "}
              {orderData.service.schedule === "now"
                ? "الآن (مستعجل)"
                : orderData.service.time}
            </p>
            <p className="flex items-start gap-1">
              <SewingPinFilledIcon className="w-4 h-4 mt-0.5 shrink-0" />{" "}
              {typeof orderData.service.location === "object"
                ? orderData.service.location.address
                : orderData.service.location}
            </p>
          </div>
        </div>

        {/* Task Confirmation Section */}
        {taskConfirmed === null && (
          <Card className="border-0 shadow-lg animate-in fade-in slide-in-from-top-4 duration-500 delay-200">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                هل تمت المهمة؟
              </h2>
              <div className="flex gap-4">
                <Button
                  onClick={() => handleTaskConfirmation(true)}
                  className="flex-1 h-14 text-lg font-bold gap-2 rounded-xl bg-green-600 hover:bg-green-700"
                >
                  <CheckCircledIcon className="w-5 h-5" /> نعم، تمت بنجاح
                </Button>
                <Button
                  onClick={() => handleTaskConfirmation(false)}
                  variant="outline"
                  className="flex-1 h-14 text-lg font-bold gap-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border-2 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900"
                >
                  <ExclamationTriangleIcon className="w-5 h-5" /> لا، هناك مشكلة
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Task Confirmed Banner */}
        {taskConfirmed === true && (
          <Card className="border-0 shadow-sm bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900 animate-in fade-in slide-in-from-top-4 duration-300">
            <CardContent className="p-4 flex items-center gap-3">
              <CheckCircledIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
              <p className="text-green-900 dark:text-green-100 font-medium">
                شكراً لك! تم تأكيد إتمام المهمة بنجاح.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Task Not Confirmed Banner */}
        {taskConfirmed === false && (
          <Card className="border-0 shadow-sm bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900 animate-in fade-in slide-in-from-top-4 duration-300">
            <CardContent className="p-4 flex items-center gap-3">
              <ExclamationTriangleIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              <p className="text-orange-900 dark:text-orange-100 font-medium">
                تم تسجيل وجود مشكلة. سيتم التواصل معك قريباً.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Rating System - Only show if task is confirmed */}
        {taskConfirmed === true && (
          <Card className="border-0 shadow-lg animate-in fade-in slide-in-from-top-4 duration-500 delay-300">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                كيف تقيّم الفني؟
              </h2>

              {/* Star Rating */}
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingClick(star)}
                    className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  >
                    {star <= rating ? (
                      <StarFilledIcon className="w-12 h-12 text-yellow-500" />
                    ) : (
                      <StarIcon className="w-12 h-12 text-slate-300 dark:text-slate-600" />
                    )}
                  </button>
                ))}
              </div>

              {/* Rating Text */}
              {rating > 0 && (
                <div className="text-center text-lg font-medium text-slate-700 dark:text-slate-300 animate-in fade-in duration-300">
                  {rating === 1 && "سيء جداً"}
                  {rating === 2 && "سيء"}
                  {rating === 3 && "مقبول"}
                  {rating === 4 && "جيد"}
                  {rating === 5 && "ممتاز"}
                </div>
              )}

              {/* Comment Input - Only show if rating is selected */}
              {rating > 0 && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    رأيك (اختياري)
                  </label>
                  <Textarea
                    value={ratingComment}
                    onChange={(e) => setRatingComment(e.target.value)}
                    placeholder="شاركنا تجربتك مع الفني..."
                    className="min-h-[100px] resize-none"
                    dir="rtl"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Separator className="my-6" />

        {/* Additional Action Buttons */}
        <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
          <Button
            variant="outline"
            className="flex-1 h-14 text-lg font-bold gap-2 rounded-xl"
          >
            <MobileIcon className="w-5 h-5" /> تواصل مع الفني
          </Button>

          <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="h-14 px-6 text-lg font-bold gap-2 rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-100 border-2 border-orange-300 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-900"
              >
                <ExclamationTriangleIcon className="w-5 h-5" /> الإبلاغ عن مشكلة
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" dir="rtl">
              <DialogHeader>
                <DialogTitle className="text-right">
                  الإبلاغ عن مشكلة
                </DialogTitle>
                <DialogDescription className="text-right">
                  يرجى تحديد نوع المشكلة التي واجهتها
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-3 py-4">
                <Button
                  variant={
                    selectedIssue === "not_fixed" ? "default" : "outline"
                  }
                  className="justify-start h-12"
                  onClick={() => setSelectedIssue("not_fixed")}
                >
                  لم يتم إصلاح المشكلة
                </Button>
                <Button
                  variant={selectedIssue === "delayed" ? "default" : "outline"}
                  className="justify-start h-12"
                  onClick={() => setSelectedIssue("delayed")}
                >
                  الفني تأخر
                </Button>
                <Button
                  variant={selectedIssue === "behavior" ? "default" : "outline"}
                  className="justify-start h-12"
                  onClick={() => setSelectedIssue("behavior")}
                >
                  سلوك غير لائق
                </Button>
                <Button
                  variant={selectedIssue === "price" ? "default" : "outline"}
                  className="justify-start h-12"
                  onClick={() => setSelectedIssue("price")}
                >
                  سعر غير صحيح
                </Button>
                <Button
                  variant={selectedIssue === "other" ? "default" : "outline"}
                  className="justify-start h-12"
                  onClick={() => setSelectedIssue("other")}
                >
                  أخرى
                </Button>

                {selectedIssue === "other" && (
                  <Textarea
                    value={otherIssueText}
                    onChange={(e) => setOtherIssueText(e.target.value)}
                    placeholder="اكتب المشكلة..."
                    className="min-h-[80px] resize-none mt-2 animate-in fade-in duration-200"
                    dir="rtl"
                  />
                )}

                <Button
                  onClick={() => {
                    console.log({ issue: selectedIssue, otherIssueText });
                    setReportDialogOpen(false);
                    setTaskConfirmed(false);
                  }}
                  className="mt-4"
                  disabled={
                    !selectedIssue ||
                    (selectedIssue === "other" && !otherIssueText)
                  }
                >
                  إرسال البلاغ
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Complete Order Button - Only visible after confirmation and rating */}
        {canCompleteOrder && (
          <Button
            onClick={handleCompleteOrder}
            className="w-full h-16 text-xl font-bold gap-2 rounded-xl shadow-lg shadow-primary/30 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <CheckCircledIcon className="w-6 h-6" /> إنهاء الطلب
          </Button>
        )}
      </div>
    </div>
  );
}
