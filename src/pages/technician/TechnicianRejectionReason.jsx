import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRightIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const REASONS = [
  { id: "distance", label: "المسافة بعيدة جداً" },
  { id: "price", label: "السعر غير مناسب" },
  { id: "busy", label: "مشغول حالياً / لدي عمل آخر" },
  { id: "tools", label: "لا تتوفر لدي المعدات اللازمة" },
  { id: "other", label: "سبب آخر" },
];

export default function TechnicianRejectionReason() {
  const navigate = useNavigate();
  const location = useLocation();
  const { autoReject } = location.state || {};

  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  const handleSubmit = () => {
    console.log("Rejection Reason:", {
      reason: selectedReason,
      details: otherReason,
    });
    navigate("/"); // Navigate back to home or dashboard
  };

  return (
    <div
      className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100/50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4"
      dir="rtl"
    >
      <Card className="w-full max-w-md border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <ArrowRightIcon className="w-5 h-5" />
            </Button>
            <CardTitle className="text-xl font-bold">سبب الرفض</CardTitle>
          </div>
          <CardDescription>
            {autoReject
              ? "انتهى الوقت المحدد لقبول الطلب. يرجى توضيح سبب عدم القبول."
              : "يرجى اختيار سبب رفض الطلب لمساعدتنا في تحسين الخدمة."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {autoReject && (
            <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 p-4 rounded-xl flex items-start gap-3 text-orange-800 dark:text-orange-200">
              <ExclamationTriangleIcon className="w-5 h-5 mt-0.5 shrink-0" />
              <p className="text-sm">
                تم رفض الطلب تلقائياً لعدم الاستجابة في الوقت المحدد.
              </p>
            </div>
          )}

          <RadioGroup
            value={selectedReason}
            onValueChange={setSelectedReason}
            className="space-y-3"
          >
            {REASONS.map((reason) => (
              <div
                key={reason.id}
                className={`flex items-center space-x-3 space-x-reverse p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedReason === reason.id
                    ? "border-primary bg-primary/5"
                    : "border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
                onClick={() => setSelectedReason(reason.id)}
              >
                <RadioGroupItem value={reason.id} id={reason.id} />
                <Label
                  htmlFor={reason.id}
                  className="flex-1 cursor-pointer font-medium"
                >
                  {reason.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {selectedReason === "other" && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
              <Label>توضيح السبب</Label>
              <Textarea
                placeholder="اكتب سبب الرفض هنا..."
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                className="resize-none min-h-[100px]"
              />
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={
              !selectedReason || (selectedReason === "other" && !otherReason)
            }
            className="w-full h-12 text-lg font-bold rounded-xl"
          >
            إرسال
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
