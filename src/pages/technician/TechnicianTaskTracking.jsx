import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  SewingPinFilledIcon,
  CheckCircledIcon,
  CameraIcon,
  Pencil2Icon,
  PlayIcon,
  StopIcon,
  PaperPlaneIcon,
  TimerIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "way", label: "في الطريق", icon: SewingPinFilledIcon },
  { id: "arrived", label: "وصلت للموقع", icon: CheckCircledIcon },
  { id: "working", label: "جاري العمل", icon: PlayIcon },
  { id: "completed", label: "تم الإنجاز", icon: CheckCircledIcon },
];

export default function TechnicianTaskTracking() {
  const navigate = useNavigate();
  const location = useLocation();
  const { request } = location.state || {};

  const [currentStep, setCurrentStep] = useState("way"); // way | arrived | working | completed
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Price Modification
  const [isPriceDialogOpen, setIsPriceDialogOpen] = useState(false);
  const [newPrice, setNewPrice] = useState("");
  const [priceReason, setPriceReason] = useState("");

  // Completion
  const [proofImages, setProofImages] = useState([]);

  // Timer Logic
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStepChange = (nextStep) => {
    if (nextStep === "working") {
      setIsTimerRunning(true);
    } else if (nextStep === "completed") {
      setIsTimerRunning(false);
    }
    setCurrentStep(nextStep);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, upload these to server/cloud
    const newImages = files.map((file) => URL.createObjectURL(file));
    setProofImages([...proofImages, ...newImages]);
  };

  const handleFinishTask = () => {
    navigate("/technician/payment-confirmation", {
      state: {
        request,
        duration: formatTime(timer),
        finalPrice: newPrice || request?.price,
      },
    });
  };

  if (!request) return null;

  return (
    <div
      className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100/50 dark:from-slate-950 dark:to-slate-900 pb-24"
      dir="rtl"
    >
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 p-4">
        <div className="container max-w-md mx-auto flex items-center justify-between">
          <h1 className="font-bold text-lg">متابعة المهمة</h1>
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-sm font-mono">
            <TimerIcon className="w-4 h-4 text-primary" />
            {formatTime(timer)}
          </div>
        </div>
      </div>

      <div className="container max-w-md mx-auto p-4 space-y-6">
        {/* Customer Card */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={request.customer.image} />
              <AvatarFallback>{request.customer.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-bold">{request.customer.name}</h3>
              <p className="text-sm text-slate-500">
                {request.location.address}
              </p>
            </div>
            <Button
              size="icon"
              className="rounded-full bg-green-500 hover:bg-green-600"
            >
              <SewingPinFilledIcon className="w-5 h-5 text-white" />
            </Button>
          </CardContent>
        </Card>

        {/* Steps Visualization */}
        <div className="flex justify-between relative px-4">
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-200 dark:bg-slate-800 -z-10 -translate-y-1/2" />
          {STEPS.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted =
              STEPS.findIndex((s) => s.id === currentStep) >= index;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center gap-2 bg-white dark:bg-slate-950 p-2 rounded-xl"
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all",
                    isActive
                      ? "bg-primary border-primary text-white scale-110"
                      : isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : "bg-slate-100 border-slate-200 text-slate-400"
                  )}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span
                  className={cn(
                    "text-xs font-bold",
                    isActive ? "text-primary" : "text-slate-500"
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Dynamic Content Based on Step */}
        <div className="space-y-4">
          {currentStep === "way" && (
            <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
                <p className="text-slate-500">خريطة التوجه للعميل</p>
              </div>
              <Button
                onClick={() => handleStepChange("arrived")}
                className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20"
              >
                وصلت للموقع
              </Button>
            </div>
          )}

          {currentStep === "arrived" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-xl border border-blue-100 dark:border-blue-900 text-blue-800 dark:text-blue-200 text-sm">
                يرجى فحص المشكلة وتحديد ما إذا كان السعر المتفق عليه مناسباً أم
                يحتاج لتعديل.
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Dialog
                  open={isPriceDialogOpen}
                  onOpenChange={setIsPriceDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-14 font-bold rounded-xl border-2"
                    >
                      <Pencil2Icon className="w-5 h-5 ml-2" /> تعديل السعر
                    </Button>
                  </DialogTrigger>
                  <DialogContent dir="rtl">
                    <DialogHeader>
                      <DialogTitle>تعديل سعر الخدمة</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>السعر الجديد</Label>
                        <Input
                          type="number"
                          placeholder="مثال: 350"
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>سبب التعديل</Label>
                        <Textarea
                          placeholder="اشرح سبب زيادة السعر..."
                          value={priceReason}
                          onChange={(e) => setPriceReason(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => setIsPriceDialogOpen(false)}>
                        حفظ التعديلات
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button
                  onClick={() => handleStepChange("working")}
                  className="h-14 font-bold rounded-xl shadow-lg shadow-primary/20"
                >
                  <PlayIcon className="w-5 h-5 ml-2" /> بدء العمل
                </Button>
              </div>
            </div>
          )}

          {currentStep === "working" && (
            <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="w-40 h-40 mx-auto rounded-full border-8 border-primary/20 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border-t-8 border-primary animate-spin" />
                <div className="text-3xl font-mono font-bold text-primary">
                  {formatTime(timer)}
                </div>
              </div>
              <p className="text-slate-500">جاري تنفيذ المهمة...</p>
              <Button
                onClick={() => handleStepChange("completed")}
                variant="destructive"
                className="w-full h-14 text-lg font-bold rounded-xl"
              >
                <StopIcon className="w-5 h-5 ml-2" /> إنهاء العمل
              </Button>
            </div>
          )}

          {currentStep === "completed" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="space-y-4">
                <Label className="text-base">إثبات الإنجاز (صور)</Label>
                <div className="grid grid-cols-3 gap-2">
                  {proofImages.map((src, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl overflow-hidden border border-slate-200"
                    >
                      <img
                        src={src}
                        alt="Proof"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <label className="aspect-square rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <CameraIcon className="w-8 h-8 text-slate-400" />
                    <span className="text-xs text-slate-500 mt-2">
                      أضف صورة
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>

              <Button
                onClick={handleFinishTask}
                className="w-full h-14 text-lg font-bold rounded-xl bg-green-600 hover:bg-green-700 shadow-lg shadow-green-900/20"
              >
                <PaperPlaneIcon className="w-5 h-5 ml-2" /> إرسال وتأكيد
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
