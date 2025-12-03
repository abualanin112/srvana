import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusIcon,
  Cross2Icon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import FileUpload from "@/components/ui/FileUpload";
import MapPicker from "@/components/ui/MapPicker";
import { servicesData } from "@/data/servicesData";
import { cn } from "@/lib/utils";

export default function ProjectSubmissionPage() {
  const navigate = useNavigate();

  // --- State ---
  const [formData, setFormData] = useState({
    title: "",
    categories: [], // Array of strings
    budget: "",
    duration: "",
    durationUnit: "days", // days, weeks, months
    description: "",
    questions: [], // Array of strings
    files: [],
    location: { lat: null, lng: null, address: "", details: {} },
  });

  const [customCategory, setCustomCategory] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Handlers ---

  // Categories
  const handleCategorySelect = (value) => {
    if (value === "other") return; // Handled by UI state if needed, but here we just use the input

    if (!formData.categories.includes(value)) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, value],
      }));
    }
  };

  const handleAddCustomCategory = () => {
    if (
      customCategory.trim() &&
      !formData.categories.includes(customCategory.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, customCategory.trim()],
      }));
      setCustomCategory("");
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== categoryToRemove),
    }));
  };

  // Questions
  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setFormData((prev) => ({
        ...prev,
        questions: [...prev.questions, newQuestion.trim()],
      }));
      setNewQuestion("");
    }
  };

  const handleRemoveQuestion = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, index) => index !== indexToRemove),
    }));
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "يرجى إدخال عنوان المشروع";
    if (formData.categories.length === 0)
      newErrors.categories = "يرجى اختيار فئة واحدة على الأقل";
    if (!formData.budget.trim())
      newErrors.budget = "يرجى تحديد الميزانية المتوقعة";
    if (!formData.duration.trim())
      newErrors.duration = "يرجى تحديد المدة المتوقعة";
    if (!formData.description.trim())
      newErrors.description = "يرجى وصف المشروع";
    // Location is optional? Let's make it optional for now as per "Plus items" usually implies optional unless stated.
    // But usually projects need location. Let's keep it optional to avoid blocking if not needed.

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log("Project Submitted:", formData);
        setIsSubmitting(false);
        // Navigate to processing page
        navigate("/project/processing", { state: { projectData: formData } });
      }, 1500);
    } else {
      // Scroll to top error
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20" dir="rtl">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="container max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <ArrowRightIcon className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">
              تقديم مشروع جديد
            </h1>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Intro */}
        <div className="text-center space-y-2 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            ابدأ مشروعك الآن
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            املأ التفاصيل التالية لنقوم بربطك بأفضل الفنيين والشركات المتخصصة
            لتنفيذ مشروعك باحترافية.
          </p>
        </div>

        {/* 1. Basic Info */}
        <Card className="border-0 shadow-lg shadow-black/5 overflow-hidden animate-in fade-in slide-in-from-top-8 duration-700 delay-100">
          <CardHeader className="bg-muted/50 border-b border-border">
            <CardTitle className="text-xl text-primary">
              بيانات المشروع الأساسية
            </CardTitle>
            <CardDescription>عنوان المشروع وتصنيفه</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Title */}
            <div className="space-y-3">
              <Label htmlFor="title" className="text-base">
                عنوان المشروع <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="مثال: تشطيب شقة سكنية 150 متر"
                value={formData.title}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, title: e.target.value }));
                  if (errors.title)
                    setErrors((prev) => ({ ...prev, title: null }));
                }}
                className={cn(
                  "h-12 text-lg",
                  errors.title && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <Label className="text-base">
                فئات المشروع <span className="text-red-500">*</span>
              </Label>

              <div className="flex gap-2">
                <Select onValueChange={handleCategorySelect} dir="rtl">
                  <SelectTrigger
                    className={cn(
                      "h-12 w-full md:w-1/2",
                      errors.categories && "border-red-500"
                    )}
                  >
                    <SelectValue placeholder="اختر من الخدمات السريعة" />
                  </SelectTrigger>
                  <SelectContent>
                    {servicesData.map((service) => (
                      <SelectItem key={service.id} value={service.title}>
                        {service.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex flex-1 gap-2">
                  <Input
                    placeholder="أو أضف تخصص آخر..."
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCustomCategory();
                      }
                    }}
                    className="h-12"
                  />
                  <Button
                    type="button"
                    onClick={handleAddCustomCategory}
                    variant="secondary"
                    className="h-12 px-4"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Selected Tags */}
              <div className="flex flex-wrap gap-2 mt-3 min-h-[40px] p-4 bg-muted/50 rounded-xl border border-dashed border-border">
                {formData.categories.length === 0 && (
                  <span className="text-muted-foreground text-sm self-center">
                    لم يتم اختيار فئات بعد
                  </span>
                )}
                {formData.categories.map((cat, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="px-3 py-1.5 text-sm gap-2 hover:bg-secondary/80 transition-colors"
                  >
                    {cat}
                    <button
                      onClick={() => handleRemoveCategory(cat)}
                      className="hover:bg-red-100 hover:text-red-600 rounded-full p-0.5 transition-colors"
                    >
                      <Cross2Icon className="w-3.5 h-3.5" />
                    </button>
                  </Badge>
                ))}
              </div>

              {/* Suggested Tags */}
              <div className="mt-4">
                <Label className="text-sm text-muted-foreground mb-2 block">
                  اقتراحات سريعة:
                </Label>
                <div className="flex flex-wrap gap-2">
                  {servicesData.map((service) => {
                    const isSelected = formData.categories.includes(
                      service.title
                    );
                    if (isSelected) return null; // Don't show if already selected
                    return (
                      <Badge
                        key={service.id}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/10 hover:border-primary transition-all py-1.5 px-3"
                        onClick={() => handleCategorySelect(service.title)}
                      >
                        <PlusIcon className="w-3 h-3 mr-1" />
                        {service.title}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              {errors.categories && (
                <p className="text-sm text-red-500 mt-2">{errors.categories}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 2. Budget & Duration */}
        <Card className="border-0 shadow-lg shadow-black/5 overflow-hidden animate-in fade-in slide-in-from-top-8 duration-700 delay-200">
          <CardHeader className="bg-muted/50 border-b border-border">
            <CardTitle className="text-xl text-primary">
              الميزانية والوقت
            </CardTitle>
            <CardDescription>توقعاتك للتكلفة والمدة الزمنية</CardDescription>
          </CardHeader>
          <CardContent className="p-6 grid md:grid-cols-2 gap-6">
            {/* Budget */}
            <div className="space-y-3">
              <Label htmlFor="budget" className="text-base">
                الميزانية المتوقعة <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="budget"
                  type="number"
                  placeholder="مثال: 50000"
                  value={formData.budget}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      budget: e.target.value,
                    }));
                    if (errors.budget)
                      setErrors((prev) => ({ ...prev, budget: null }));
                  }}
                  className={cn(
                    "h-12 pl-16 text-lg",
                    errors.budget && "border-red-500"
                  )}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium bg-muted px-2 py-1 rounded">
                  ج.م
                </div>
              </div>
              {errors.budget && (
                <p className="text-sm text-red-500">{errors.budget}</p>
              )}
            </div>

            {/* Duration */}
            <div className="space-y-3">
              <Label htmlFor="duration" className="text-base">
                المدة المتوقعة <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2">
                <Input
                  id="duration"
                  type="number"
                  placeholder="مثال: 3"
                  value={formData.duration}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }));
                    if (errors.duration)
                      setErrors((prev) => ({ ...prev, duration: null }));
                  }}
                  className={cn(
                    "h-12 text-lg",
                    errors.duration && "border-red-500"
                  )}
                />
                <Select
                  value={formData.durationUnit}
                  onValueChange={(val) =>
                    setFormData((prev) => ({ ...prev, durationUnit: val }))
                  }
                  dir="rtl"
                >
                  <SelectTrigger className="h-12 w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="days">أيام</SelectItem>
                    <SelectItem value="weeks">أسابيع</SelectItem>
                    <SelectItem value="months">أشهر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {errors.duration && (
                <p className="text-sm text-red-500">{errors.duration}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 3. Mandatory Questions */}
        <Card className="border-0 shadow-lg shadow-black/5 overflow-hidden animate-in fade-in slide-in-from-top-8 duration-700 delay-300">
          <CardHeader className="bg-muted/50 border-b border-border">
            <CardTitle className="text-xl text-primary">
              أسئلة للمتقدمين
            </CardTitle>
            <CardDescription>
              أسئلة يجب على الفني/الشركة الإجابة عليها عند تقديم العرض (اختياري)
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex gap-2">
              <Input
                placeholder="اكتب سؤالاً للفني... (مثال: هل لديك سابقة أعمال مشابهة؟)"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddQuestion();
                  }
                }}
                className="h-12"
              />
              <Button
                type="button"
                onClick={handleAddQuestion}
                className="h-12 px-6"
              >
                إضافة
              </Button>
            </div>

            <div className="space-y-3">
              {formData.questions.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-border rounded-xl text-muted-foreground">
                  لا توجد أسئلة مضافة حالياً
                </div>
              ) : (
                formData.questions.map((q, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-border group transition-all hover:border-primary/30"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-foreground">{q}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveQuestion(idx)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      حذف
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* 4. Description & Files (From FastServiceStep1) */}
        <Card className="border-0 shadow-lg shadow-black/5 overflow-hidden animate-in fade-in slide-in-from-top-8 duration-700 delay-400">
          <CardHeader className="bg-muted/50 border-b border-border">
            <CardTitle className="text-xl text-primary">
              تفاصيل ومرفقات
            </CardTitle>
            <CardDescription>
              شرح تفصيلي للمشروع مع الصور والمخططات
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <Label htmlFor="description" className="text-base">
                وصف المشروع <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="اشرح تفاصيل مشروعك بدقة..."
                value={formData.description}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                  if (errors.description)
                    setErrors((prev) => ({ ...prev, description: null }));
                }}
                className={cn(
                  "min-h-[150px] text-base leading-relaxed resize-none",
                  errors.description && "border-red-500"
                )}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-base">مرفقات (صور/فيديو/مخططات)</Label>
              <FileUpload
                onFilesChange={(files) =>
                  setFormData((prev) => ({ ...prev, files }))
                }
                acceptedTypes={[
                  "image/jpeg",
                  "image/png",
                  "video/mp4",
                  "application/pdf",
                ]}
                maxFiles={10}
              />
            </div>
          </CardContent>
        </Card>

        {/* 5. Location (From FastServiceStep1) */}
        <Card className="border-0 shadow-lg shadow-black/5 overflow-hidden animate-in fade-in slide-in-from-top-8 duration-700 delay-500">
          <CardHeader className="bg-muted/50 border-b border-border">
            <CardTitle className="text-xl text-primary">موقع المشروع</CardTitle>
            <CardDescription>
              حدد موقع تنفيذ المشروع على الخريطة
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <MapPicker
              onLocationChange={(location) =>
                setFormData((prev) => ({ ...prev, location }))
              }
              initialPosition={
                formData.location?.lat
                  ? { lat: formData.location.lat, lng: formData.location.lng }
                  : { lat: 30.0444, lng: 31.2357 }
              }
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full md:w-auto min-w-[200px] h-14 text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all rounded-xl"
          >
            {isSubmitting ? "جاري النشر..." : "نشر المشروع"}
            {!isSubmitting && <CheckIcon className="w-5 h-5 mr-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
