// src/components/ui/StepsIndicator.jsx
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

/**
 * Steps Indicator Component
 * عرض تقدم المستخدم خلال خطوات متعددة
 *
 * @param {Array} steps - مصفوفة الخطوات [{label, status}]
 *   status: 'completed' | 'active' | 'disabled'
 */
export default function StepsIndicator({ steps = [] }) {
  return (
    <div className="w-full py-2" dir="rtl">
      <div className="relative flex items-center justify-between max-w-3xl mx-auto px-4">
        {/* Background Line */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800 rounded-full -z-10 mx-12" />

        {/* Active Line Progress */}
        <div
          className="absolute top-6 right-0 h-1 bg-primary rounded-full -z-10 mx-12 transition-all duration-500 ease-in-out"
          style={{
            width: `${
              (steps.findIndex((s) => s.status === "active") /
                (steps.length - 1)) *
                100 -
              (steps.length > 2 ? 5 : 0) // Adjustment for spacing
            }%`,
            left: "auto",
          }}
        />

        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative z-10">
            {/* Step Circle */}
            <div
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-full border-4 transition-all duration-300 shadow-sm",
                step.status === "completed" &&
                  "bg-primary border-primary text-primary-foreground scale-105",
                step.status === "active" &&
                  "bg-background border-primary text-primary shadow-lg shadow-primary/20 scale-110 ring-4 ring-primary/10",
                step.status === "disabled" &&
                  "bg-background border-muted text-muted-foreground"
              )}
            >
              {step.status === "completed" ? (
                <CheckIcon className="w-6 h-6" />
              ) : (
                <span className="text-base font-bold">{index + 1}</span>
              )}
            </div>

            {/* Step Label */}
            <span
              className={cn(
                "mt-4 text-sm font-medium text-center whitespace-nowrap transition-colors duration-300",
                step.status === "active" && "text-primary font-bold",
                step.status === "completed" && "text-foreground",
                step.status === "disabled" && "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
