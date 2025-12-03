import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  ClockIcon,
  TargetIcon,
  SewingPinIcon,
  PersonIcon,
  StarFilledIcon,
  CheckCircledIcon,
  FileTextIcon,
  UploadIcon,
  Cross2Icon,
  PlayIcon,
  ExternalLinkIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import MediaLightbox from "@/components/ui/MediaLightbox";

// Mock Data
const projectData = {
  id: "PRJ-9921",
  title: "تصميم وتنفيذ ديكور داخلي لفيلا سكنية مودرن",
  description: `نبحث عن مهندس ديكور داخلي مبدع ومحترف لتولي مشروع تصميم وتنفيذ الديكور الداخلي لفيلا سكنية فاخرة بمساحة إجمالية 450 متر مربع في مدينة الرياض. نسعى لتحويل المساحات الداخلية إلى بيئة عصرية تجمع بين الرفاهية والوظيفة، مع التركيز على التفاصيل الدقيقة واستغلال المساحات بشكل أمثل.

  نطاق العمل يشمل:
  1. التصميم المفاهيمي والتصور ثلاثي الأبعاد (3D):
     - تصميم شامل لجميع فراغات الفيلا: مجلس رجال، مجلس نساء، صالة معيشة عائلية مفتوحة، 4 غرف نوم ماستر (بما في ذلك غرفة النوم الرئيسية مع غرفة الملابس)، مطبخ رئيسي ومطبخ تحضيري، ودورات المياه.
     - تقديم لقطات 3D واقعية (Renders) من زوايا متعددة لكل غرفة لتوضيح الأفكار والتوزيع المقترح للأثاث والإضاءة.
  
  2. المخططات التنفيذية والتفصيلية:
     - مخططات توزيع الأثاث (Furniture Layout) بمقاسات دقيقة.
     - مخططات الأسقف المستعارة (Reflected Ceiling Plan) وتوزيع الإضاءة (Lighting Plan) مع تحديد أنواع وحدات الإضاءة ومواصفاتها.
     - مخططات توزيع نقاط الكهرباء والمفاتيح والأفياش بما يتناسب مع توزيع الأثاث.
     - مخططات الأرضيات وتحديد المواد المستخدمة (رخام، بورسلين، باركيه) مع الكميات.
     - تفاصيل الديكورات الجدارية (Wall Cladding)، القواطع الخشبية، والمرايا.
  
  3. جداول الكميات والمواصفات (BOQ):
     - إعداد جداول دقيقة للكميات والمواصفات لجميع مواد التشطيب والأثاث المقترح.
     - المساعدة في اختيار المواد (الأرضيات، الدهانات، الأقمشة، الإضاءة) من الموردين المحليين أو العالميين لضمان الجودة والمطابقة للتصميم.
  
  4. الإشراف والمتابعة:
     - زيارات دورية للموقع للإشراف على مراحل التنفيذ وضمان مطابقة الأعمال للمخططات المعتمدة.
     - حل أي مشاكل فنية قد تظهر أثناء التنفيذ.
  
  المتطلبات والشروط:
  - خبرة لا تقل عن 5 سنوات في تصميم وتنفيذ المشاريع السكنية الفاخرة.
  - سابقة أعمال موثقة (Portfolio) تحتوي على مشاريع مشابهة تم تنفيذها (يفضل في الرياض).
  - الالتزام بالجدول الزمني المحدد والميزانية المرصودة.
  - القدرة على التواصل الفعال والمرونة في التعديلات.
  
  النمط المطلوب هو "مودرن لاكشري" (Modern Luxury) بألوان حيادية دافئة (Warm Neutrals) مع استخدام خامات طبيعية مثل الخشب والرخام لإضفاء طابع الفخامة والدفء.`,
  status: "open",
  postedDate: "2024-05-20",
  budget: "50000 - 75000",
  duration: "60",
  categories: ["ديكور داخلي", "تصميم 3D", "إشراف هندسي"],
  location: {
    country: "المملكة العربية السعودية",
    city: "الرياض",
    address: "حي الملقا، شارع الأمير محمد بن سعد",
    mapLink: "https://goo.gl/maps/example",
  },
  attachments: [
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=800&q=80",
    },
    { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" }, // Mock video
  ],
  questions: [
    "هل لديك خبرة سابقة في تصميم الفلل المودرن؟",
    "ما هي المدة التي تحتاجها لتسليم المخططات الأولية؟",
  ],
  owner: {
    name: "عبدالله العمر",
    avatar: "https://i.pravatar.cc/150?u=owner1",
    hiringRate: "85%",
    completedProjects: 12,
    postedProjects: 15,
    rating: 4.8,
    joinDate: "2023",
  },
};

export default function ProjectProposalPage() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      duration: "",
      durationUnit: "days",
      proposalValue: "",
      details: "",
      questions: [],
    },
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const proposalValue = watch("proposalValue");
  const duration = watch("duration");
  const durationUnit = watch("durationUnit");

  const onSubmit = (data) => {
    console.log("Form Data:", { ...data, uploadedFiles });
    setIsConfirmOpen(true);
  };

  const handleConfirmSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmOpen(false);
      toast.success("تم إرسال عرضك بنجاح وسيتم إعلامك عند الرد.", {
        duration: 3000,
      });
      navigate("/projects/open");
    }, 800);
  };

  const descriptionMaxLength = 350;
  const shouldTruncateDescription =
    projectData.description.length > descriptionMaxLength;
  const displayDescription =
    isDescriptionExpanded || !shouldTruncateDescription
      ? projectData.description
      : `${projectData.description.substring(0, descriptionMaxLength)}...`;

  // Calculate Technician Dues (Value - 2.5%)
  const technicianDues = proposalValue
    ? (parseFloat(proposalValue) * 0.975).toFixed(2)
    : 0;

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const displayedAttachments = projectData.attachments.slice(0, 4);
  const remainingCount = Math.max(0, projectData.attachments.length - 4);

  return (
    <div className="min-h-screen bg-background pb-20" dir="rtl">
      {/* --- Hero Header Section --- */}
      <div className="relative bg-primary overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 py-12 md:py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-right">
            <div className="space-y-4 text-primary-foreground">
              <Breadcrumb>
                <BreadcrumbList className="text-primary-foreground/80 sm:gap-1">
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      asChild
                      className="text-primary-foreground/80 hover:text-white"
                    >
                      <Link to="/">الرئيسية</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-primary-foreground/60">
                    <ChevronLeftIcon />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      asChild
                      className="text-primary-foreground/80 hover:text-white"
                    >
                      <Link to="/projects/open">المشاريع المفتوحة</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-primary-foreground/60">
                    <ChevronLeftIcon />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-white/80 font-semibold">
                      تقديم عرض
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                {projectData.title}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-primary-foreground/80 text-sm font-medium">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <CalendarIcon className="w-4 h-4" />
                  نشر {projectData.postedDate}
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <TargetIcon className="w-4 h-4" />
                  الميزانية: {projectData.budget} ج.م
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* --- Main Column (Right) --- */}
          <div className="lg:col-span-8 space-y-10">
            {/* 1. Project Details (No Card) */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <FileTextIcon className="w-6 h-6 text-primary" />
                تفاصيل المشروع
              </h3>
              <div className="text-lg md:text-xl text-muted-foreground leading-relaxed whitespace-pre-line">
                {displayDescription}
                {shouldTruncateDescription && (
                  <button
                    onClick={() =>
                      setIsDescriptionExpanded(!isDescriptionExpanded)
                    }
                    className="text-primary font-bold hover:underline inline-flex items-center gap-1 mx-2 text-base md:text-lg align-middle"
                  >
                    {isDescriptionExpanded ? "عرض أقل" : "المزيد"}
                    <ChevronLeftIcon
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isDescriptionExpanded
                          ? "rotate-90"
                          : "group-hover:-translate-x-1"
                      }`}
                    />
                  </button>
                )}
              </div>
            </div>

            {/* 2. Attachments (No Card, Lightbox) */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <UploadIcon className="w-6 h-6 text-primary" />
                المرفقات
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {displayedAttachments.map((att, idx) => (
                  <div
                    key={idx}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-muted cursor-pointer border border-border hover:shadow-lg transition-all duration-300"
                    onClick={() => openLightbox(idx)}
                  >
                    {att.type === "video" ? (
                      <div className="w-full h-full flex items-center justify-center bg-black/10">
                        <PlayIcon className="w-12 h-12 text-white opacity-80 group-hover:scale-110 transition-transform" />
                      </div>
                    ) : (
                      <img
                        src={att.url}
                        alt={`attachment-${idx}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}

                    {/* Overlay for the last item if there are more */}
                    {idx === 3 && remainingCount > 0 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                        <span className="text-white text-xl font-bold">
                          +{remainingCount}
                        </span>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    {!(idx === 3 && remainingCount > 0) && (
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-medium text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                          عرض
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Location (No Card) */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <SewingPinIcon className="w-6 h-6 text-primary" />
                موقع التنفيذ
              </h3>
              <div className="bg-muted/30 p-6 rounded-2xl border border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">
                      الدولة / المدينة
                    </span>
                    <p className="font-semibold text-foreground text-lg">
                      {projectData.location.country}،{" "}
                      {projectData.location.city}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block mb-1">
                      العنوان التفصيلي
                    </span>
                    <p className="font-semibold text-foreground text-lg">
                      {projectData.location.address}
                    </p>
                  </div>
                </div>
                {projectData.location.mapLink && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <a
                      href={projectData.location.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                    >
                      <ExternalLinkIcon className="w-4 h-4" />
                      عرض الموقع على الخريطة
                    </a>
                  </div>
                )}
              </div>
            </div>

            <Separator className="my-8" />

            {/* 4. Proposal Form (Card Kept) */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  تقديم العرض
                </h2>
                <p className="text-muted-foreground">
                  قم بتعبئة البيانات التالية بدقة لزيادة فرص قبول عرضك
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="border border-border rounded-2xl bg-card p-6 md:p-8 space-y-8"
              >
                {/* Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="duration"
                      className="text-base font-semibold"
                    >
                      مدة التسليم <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex gap-2 items-start">
                      <div className="flex-1 space-y-1">
                        <Input
                          id="duration"
                          type="number"
                          placeholder="مثال: 15"
                          className={cn(
                            "h-12 text-lg",
                            errors.duration &&
                              "border-destructive focus-visible:ring-destructive"
                          )}
                          {...register("duration", {
                            required: "مطلوب",
                            min: {
                              value: 1,
                              message: "يجب أن تكون القيمة موجبة",
                            },
                          })}
                        />
                        {errors.duration && (
                          <p className="text-sm text-destructive">
                            {errors.duration.message}
                          </p>
                        )}
                      </div>
                      <Controller
                        name="durationUnit"
                        control={control}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                            dir="rtl"
                          >
                            <SelectTrigger className="w-[110px] h-12">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="days">يوم</SelectItem>
                              <SelectItem value="weeks">أسبوع</SelectItem>
                              <SelectItem value="months">شهر</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>

                  {/* Value */}
                  <div className="space-y-3">
                    <Label htmlFor="value" className="text-base font-semibold">
                      قيمة العرض (ج.م){" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="value"
                      type="number"
                      placeholder="مثال: 50000"
                      className={cn(
                        "h-12 text-lg",
                        errors.proposalValue &&
                          "border-destructive focus-visible:ring-destructive"
                      )}
                      {...register("proposalValue", {
                        required: "مطلوب",
                        min: { value: 1, message: "يجب أن تكون القيمة موجبة" },
                      })}
                    />
                    {errors.proposalValue && (
                      <p className="text-sm text-destructive">
                        {errors.proposalValue.message}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      مستحقاتك بعد خصم النسبة (2.5%):{" "}
                      <span className="font-bold text-green-600">
                        {technicianDues} ج.م
                      </span>
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <Label htmlFor="details" className="text-base font-semibold">
                    تفاصيل العرض <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="details"
                    placeholder="اشرح خطة العمل، المواد المستخدمة، ولماذا يجب اختيارك..."
                    className={cn(
                      "min-h-[150px] text-base leading-relaxed resize-y",
                      errors.details &&
                        "border-destructive focus-visible:ring-destructive"
                    )}
                    {...register("details", {
                      required: "تفاصيل العرض مطلوبة",
                      minLength: {
                        value: 20,
                        message: "يجب أن يكون الوصف 20 حرفاً على الأقل",
                      },
                    })}
                  />
                  {errors.details && (
                    <p className="text-sm text-destructive">
                      {errors.details.message}
                    </p>
                  )}
                </div>

                {/* Mandatory Questions */}
                {projectData.questions.length > 0 && (
                  <div className="space-y-6 bg-muted/30 p-6 rounded-xl border border-border">
                    <h4 className="font-bold text-foreground flex items-center gap-2">
                      <CheckCircledIcon className="w-5 h-5 text-primary" />
                      أسئلة من العميل
                    </h4>
                    {projectData.questions.map((q, idx) => (
                      <div key={idx} className="space-y-3">
                        <Label className="text-sm font-medium text-foreground">
                          {q} <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          placeholder="اكتب إجابتك هنا..."
                          className={cn(
                            "bg-background min-h-[80px]",
                            errors.questions?.[idx] &&
                              "border-destructive focus-visible:ring-destructive"
                          )}
                          {...register(`questions.${idx}`, {
                            required: "هذا السؤال مطلوب",
                          })}
                        />
                        {errors.questions?.[idx] && (
                          <p className="text-sm text-destructive">
                            {errors.questions[idx]?.message}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* File Upload (Dropzone) */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    مرفقات العرض (صور، ملفات PDF)
                  </Label>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-muted/30 transition-colors relative cursor-pointer group">
                    <input
                      type="file"
                      multiple
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={handleFileUpload}
                    />
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <UploadIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          اضغط للرفع أو اسحب الملفات هنا
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          PNG, JPG, PDF (الحد الأقصى 10MB)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      {uploadedFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <FileTextIcon className="w-5 h-5 text-primary shrink-0" />
                            <span className="text-sm truncate">
                              {file.name}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeFile(idx)}
                            type="button"
                          >
                            <Cross2Icon className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Separator />

                {/* Submit Button */}
                <Button
                  size="lg"
                  type="submit"
                  className="w-full text-lg font-bold h-14 shadow-lg shadow-primary/20"
                >
                  تقديم العرض
                </Button>
              </form>
            </div>
          </div>

          {/* --- Sidebar (Left) - Sticky --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Combined Project & Owner Card */}
              <Card className="bg-card border border-border shadow-sm rounded-2xl overflow-hidden sticky top-24">
                <CardHeader className="p-6 pb-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-foreground">
                      بطاقة المشروع
                    </h2>
                    <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-3 py-1 text-xs font-medium shadow-sm border-none">
                      مفتوح للتقديم
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6 pt-0 space-y-6">
                  {/* Project Details List */}
                  <div className="space-y-4">
                    {/* Budget */}
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
                          <TargetIcon className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">الميزانية</span>
                      </div>
                      <p className="text-foreground font-bold dir-ltr">
                        50,000 - 75,000{" "}
                        <span className="text-xs font-normal text-muted-foreground">
                          ج.م
                        </span>
                      </p>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <div className="bg-orange-50 p-2 rounded-full group-hover:bg-orange-100 transition-colors">
                          <ClockIcon className="w-4 h-4 text-orange-600" />
                        </div>
                        <span className="text-sm font-medium">المدة</span>
                      </div>
                      <p className="text-foreground font-bold">
                        60{" "}
                        <span className="text-xs font-normal text-muted-foreground">
                          يوم
                        </span>
                      </p>
                    </div>

                    {/* Date */}
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <div className="bg-purple-50 p-2 rounded-full group-hover:bg-purple-100 transition-colors">
                          <CalendarIcon className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium">تاريخ النشر</span>
                      </div>
                      <p className="text-foreground font-medium font-mono text-sm">
                        2024-05-20
                      </p>
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  {/* Categories */}
                  <div className="space-y-3">
                    <span className="text-sm font-medium text-muted-foreground block">
                      الفئات المطلوبة
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {projectData.categories.map((cat, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="font-medium px-3 py-1 text-xs"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  {/* Owner Info Section */}
                  <div className="space-y-4">
                    {/* Header: Avatar + Name + Rating */}
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 border border-border shadow-sm">
                        <AvatarImage src={projectData.owner.avatar} />
                        <AvatarFallback className="bg-muted text-muted-foreground font-bold">
                          {projectData.owner.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-foreground text-sm">
                            {projectData.owner.name}
                          </h4>
                          <div className="flex items-center gap-1 bg-accent px-1.5 py-0.5 rounded text-[10px] font-bold text-accent-foreground border border-accent">
                            <StarFilledIcon className="w-3 h-3 text-accent-foreground" />
                            4.8
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                          <span>عضو منذ 2023</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid - Compact */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="bg-muted/50 rounded-lg p-2 text-center border border-border">
                        <span className="text-[10px] text-muted-foreground block mb-0.5">
                          معدل التوظيف
                        </span>
                        <p className="text-sm font-bold text-foreground">85%</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-2 text-center border border-border">
                        <span className="text-[10px] text-muted-foreground block mb-0.5">
                          مشاريع مكتملة
                        </span>
                        <p className="text-sm font-bold text-foreground">12</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <MediaLightbox
        items={projectData.attachments}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border" dir="rtl">
          {isSubmitting ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-lg font-medium text-foreground">
                جاري إرسال عرضك… برجاء الانتظار لحظات
              </p>
            </div>
          ) : (
            <>
              <DialogHeader className="text-right space-y-3">
                <DialogTitle className="text-xl font-bold text-foreground">
                  هل تريد بالتأكيد إرسال العرض؟
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-base leading-relaxed">
                  بعد إرسال العرض لن تتمكن من تعديل بعض البيانات لاحقًا.
                  <br />
                  تأكد من أن كل التفاصيل صحيحة.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex-row gap-3 sm:justify-start mt-6">
                <Button
                  onClick={handleConfirmSubmit}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-10"
                >
                  إرسال العرض الآن
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsConfirmOpen(false)}
                  className="flex-1 border-border text-foreground hover:bg-muted h-10"
                >
                  العودة للتعديل
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
