import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircledIcon,
  Pencil1Icon,
  EyeOpenIcon,
  CalendarIcon,
  ClockIcon,
  TargetIcon,
  FileTextIcon,
  SewingPinFilledIcon,
  ArrowLeftIcon,
  ImageIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function ProjectSummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { projectData } = location.state || {};

  if (!projectData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>لا توجد بيانات للمشروع</p>
        <Button onClick={() => navigate("/")}>العودة للرئيسية</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20" dir="rtl">
      {/* Header / Success Banner */}
      <div className="bg-primary/5 border-b border-primary/10 py-12 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 mb-4 shadow-sm animate-in zoom-in duration-500">
          <CheckCircledIcon className="w-10 h-10" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
          تم تقديم المشروع بنجاح!
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          تم استلام تفاصيل مشروعك وسيتم نشره للفنيين والشركات لتقديم عروضهم.
        </p>
      </div>

      <div className="container max-w-4xl mx-auto px-4 -mt-8">
        <Card className="border-0 shadow-xl shadow-black/5 overflow-hidden bg-card/80 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Project Header Info */}
          <div className="p-6 md:p-8 border-b border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                {projectData.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {projectData.categories.map((cat, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="hover:bg-secondary/80"
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="text-left">
              <span className="text-sm text-muted-foreground block mb-1">
                رقم المشروع
              </span>
              <span className="font-mono font-bold text-lg text-foreground">
                #PRJ-{Math.floor(Math.random() * 10000)}
              </span>
            </div>
          </div>

          <CardContent className="p-6 md:p-8 space-y-8">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-muted/30 border border-border flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <TargetIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm text-muted-foreground block">
                    الميزانية
                  </span>
                  <span className="font-bold text-lg text-foreground">
                    {projectData.budget} ج.م
                  </span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/20 text-secondary-foreground flex items-center justify-center shrink-0">
                  <ClockIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm text-muted-foreground block">
                    المدة المتوقعة
                  </span>
                  <span className="font-bold text-lg text-foreground">
                    {projectData.duration}{" "}
                    {projectData.durationUnit === "days"
                      ? "أيام"
                      : projectData.durationUnit === "weeks"
                      ? "أسابيع"
                      : "أشهر"}
                  </span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center shrink-0">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm text-muted-foreground block">
                    تاريخ النشر
                  </span>
                  <span className="font-bold text-lg text-foreground">
                    {new Date().toLocaleDateString("ar-EG")}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileTextIcon className="w-5 h-5 text-primary" />
                تفاصيل المشروع
              </h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line bg-muted/50 p-4 rounded-xl border border-border">
                {projectData.description}
              </p>
            </div>

            {/* Questions */}
            {projectData.questions && projectData.questions.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <CheckCircledIcon className="w-5 h-5 text-primary" />
                  أسئلة للمتقدمين
                </h3>
                <ul className="space-y-2">
                  {projectData.questions.map((q, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-foreground">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Files */}
            {projectData.files && projectData.files.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileTextIcon className="w-5 h-5 text-primary" />
                  المرفقات ({projectData.files.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projectData.files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border"
                    >
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                        {file.type.startsWith("image/") ? (
                          <ImageIcon className="w-5 h-5" />
                        ) : (
                          <FileTextIcon className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-foreground">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            {projectData.location && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <SewingPinFilledIcon className="w-5 h-5 text-primary" />
                  الموقع
                </h3>
                <div className="bg-muted/50 p-4 rounded-xl border border-border space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="font-medium">الإحداثيات:</span>
                    <span
                      dir="ltr"
                      className="font-mono text-sm bg-card px-2 py-1 rounded border"
                    >
                      {projectData.location.lat?.toFixed(6)},{" "}
                      {projectData.location.lng?.toFixed(6)}
                    </span>
                  </div>

                  {projectData.location.address && (
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <span className="font-medium shrink-0">العنوان:</span>
                      <span>{projectData.location.address}</span>
                    </div>
                  )}

                  {projectData.location.details &&
                    Object.values(projectData.location.details).some(
                      Boolean
                    ) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border mt-2">
                        {projectData.location.details.city && (
                          <div>
                            <span className="text-xs text-muted-foreground block">
                              المدينة
                            </span>
                            <span className="font-medium">
                              {projectData.location.details.city}
                            </span>
                          </div>
                        )}
                        {projectData.location.details.district && (
                          <div>
                            <span className="text-xs text-muted-foreground block">
                              الحي
                            </span>
                            <span className="font-medium">
                              {projectData.location.details.district}
                            </span>
                          </div>
                        )}
                        {projectData.location.details.street && (
                          <div>
                            <span className="text-xs text-muted-foreground block">
                              الشارع
                            </span>
                            <span className="font-medium">
                              {projectData.location.details.street}
                            </span>
                          </div>
                        )}
                        {projectData.location.details.building && (
                          <div>
                            <span className="text-xs text-muted-foreground block">
                              رقم المبنى
                            </span>
                            <span className="font-medium">
                              {projectData.location.details.building}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                </div>
              </div>
            )}
          </CardContent>

          {/* Actions Footer */}
          <div className="bg-muted/80 p-6 md:p-8 border-t border-border flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() =>
                navigate("/projects-services", {
                  state: { serviceData: projectData },
                })
              } // Pass data back to edit
            >
              <Pencil1Icon className="w-4 h-4" />
              تعديل المشروع
            </Button>
            <Button
              size="lg"
              className="gap-2 shadow-lg shadow-primary/20"
              onClick={() =>
                navigate("/project/offers", {
                  state: { projectData },
                })
              }
            >
              <EyeOpenIcon className="w-4 h-4" />
              عرض العروض المقدمة
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
