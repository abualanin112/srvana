import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export default function ProjectProcessingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectData } = location.state || {};

  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("جاري استلام البيانات...");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // If no data, redirect back (safety)
    if (!projectData) {
      const timer = setTimeout(() => navigate("/projects-services"), 2000);
      return () => clearTimeout(timer);
    }

    // Simulation Sequence
    const sequence = async () => {
      // 0% - Start
      await new Promise((r) => setTimeout(r, 800));
      setProgress(30);
      setStatusText("جاري مراجعة تفاصيل المشروع...");

      // 30%
      await new Promise((r) => setTimeout(r, 1200));
      setProgress(65);
      setStatusText("يتم الآن تجهيز ملف المشروع...");

      // 65%
      await new Promise((r) => setTimeout(r, 1000));
      setProgress(90);
      setStatusText("جاري البحث عن أفضل الفنيين...");

      // 90%
      await new Promise((r) => setTimeout(r, 800));
      setProgress(100);
      setStatusText("جاري مراجعة المشروع وسيتم إعلامك فور الانتهاء");
      setIsCompleted(true);

      // Redirect
      setTimeout(() => {
        navigate("/project/summary", { state: { projectData } });
      }, 2500);
    };

    sequence();
  }, [navigate, projectData]);

  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden"
      dir="rtl"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center space-y-12">
        {/* Logo or Icon Animation */}
        <div className="relative">
          {/* Outer Ring */}
          <div className="w-32 h-32 rounded-full border-4 border-muted flex items-center justify-center relative">
            {/* Spinning Ring */}
            {!isCompleted && (
              <div className="absolute inset-0 rounded-full border-4 border-primary/30 border-t-primary animate-spin duration-1000" />
            )}

            {/* Center Icon */}
            <div
              className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500",
                isCompleted
                  ? "bg-green-500 text-white scale-110 shadow-lg shadow-green-500/30"
                  : "bg-muted text-primary"
              )}
            >
              {isCompleted ? (
                <CheckIcon className="w-12 h-12 animate-in zoom-in duration-300" />
              ) : (
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Text & Progress */}
        <div className="space-y-6 w-full">
          <div className="space-y-2 h-16">
            <h2 className="text-2xl font-bold text-foreground animate-in fade-in slide-in-from-bottom-2 duration-500 key={statusText}">
              {statusText}
            </h2>
            <p className="text-muted-foreground text-sm">
              يرجى الانتظار قليلاً، لا تغلق الصفحة
            </p>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-700 ease-out rounded-full relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite] skew-x-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
