import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import StepsIndicator from "@/components/ui/StepsIndicator";
import FileUpload from "@/components/ui/FileUpload";
import MapPicker from "@/components/ui/MapPicker";
import { servicesData } from "@/data/servicesData";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function FastServiceStep1() {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize from passed state (if coming back) or default
  const [formData, setFormData] = useState(
    location.state?.serviceData || {
      mainCategory: "",
      subCategory: "",
      customSubCategory: "",
      description: "",
      files: [],
      location: { lat: null, lng: null, address: "", details: {} },
      schedule: "now", // 'now' | 'scheduled'
      date: null,
      time: "",
    }
  );

  const [showCustomInput, setShowCustomInput] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [errors, setErrors] = useState({});

  // Get selected service
  const selectedService = servicesData.find(
    (s) => s.id.toString() === formData.mainCategory
  );
  const subServices = selectedService ? selectedService.subServices : [];

  // Handlers
  const handleMainCategoryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      mainCategory: value,
      subCategory: "",
      customSubCategory: "",
    }));
    setShowCustomInput(false);
    if (errors.mainCategory)
      setErrors((prev) => ({ ...prev, mainCategory: null }));
  };

  const handleSubCategoryChange = (value) => {
    if (value === "other") {
      setShowCustomInput(true);
      setFormData((prev) => ({
        ...prev,
        subCategory: value,
        customSubCategory: "",
      }));
    } else {
      setShowCustomInput(false);
      setFormData((prev) => ({
        ...prev,
        subCategory: value,
        customSubCategory: "",
      }));
    }
    if (errors.subCategory)
      setErrors((prev) => ({ ...prev, subCategory: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.mainCategory)
      newErrors.mainCategory = "يرجى اختيار الفئة الأساسية";
    if (!formData.subCategory)
      newErrors.subCategory = "يرجى اختيار الفئة الفرعية";
    if (
      formData.subCategory === "other" &&
      !formData.customSubCategory.trim()
    ) {
      newErrors.customSubCategory = "يرجى تحديد الخدمة المطلوبة";
    }
    if (formData.schedule === "scheduled") {
      if (!formData.date) newErrors.date = "يرجى اختيار التاريخ";
      if (!formData.time) newErrors.time = "يرجى اختيار الوقت";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      // Navigate to step 2 with state
      navigate("/service/select-technician", {
        state: { serviceData: formData },
      });
    } else {
      // Optional: Scroll to top or show a general error toast
      console.log("Validation failed", errors);
    }
  };

  return (
    <div
      className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100/50 dark:from-slate-950 dark:to-slate-900"
      dir="rtl"
    >
      {/* Steps Header - Sticky */}
      <div className="sticky top-0 z-50 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-md transition-all duration-300">
        <StepsIndicator
          steps={[
            { label: "تفاصيل الخدمة", status: "active" },
            { label: "اختيار الفني", status: "disabled" },
            { label: "الدفع", status: "disabled" },
          ]}
        />
      </div>

      {/* Main Container */}
      <div className="container max-w-5xl mx-auto px-4 pb-20 pt-12">
        {/* Page Header */}
        <div className="mb-12 text-center space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
            تفاصيل الخدمة
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            يرجى إدخال بيانات طلبك بدقة ليتم اختيار أفضل فني للمهمة
          </p>
        </div>

        {/* Form Sections */}
        <div className="space-y-8 animate-in fade-in slide-in-from-top-8 duration-1000 delay-100">
          {/* 1. Category Selection */}
          <Card
            className={cn(
              "border-0 shadow-lg shadow-slate-200/50 dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-300",
              errors.mainCategory && "ring-2 ring-red-500"
            )}
          >
            <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 p-6 md:p-8">
              <CardTitle className="text-2xl font-bold text-primary">
                الفئة الأساسية
              </CardTitle>
              <CardDescription className="text-base">
                اختر نوع الخدمة المطلوبة بدقة
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="mainCategory"
                    className="text-base font-semibold text-slate-700 dark:text-slate-300"
                  >
                    الفئة الأساسية <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.mainCategory}
                    onValueChange={handleMainCategoryChange}
                    dir="rtl"
                  >
                    <SelectTrigger
                      id="mainCategory"
                      className={cn(
                        "h-12 text-right bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary/20 rounded-xl transition-all",
                        errors.mainCategory && "border-red-500"
                      )}
                    >
                      <SelectValue placeholder="اختر الفئة الأساسية" />
                    </SelectTrigger>
                    <SelectContent>
                      {servicesData.map((service) => (
                        <SelectItem
                          key={service.id}
                          value={service.id.toString()}
                          className="text-right cursor-pointer py-3"
                        >
                          {service.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.mainCategory && (
                    <p className="text-sm text-red-500">
                      {errors.mainCategory}
                    </p>
                  )}
                </div>

                {/* Sub Category */}
                {formData.mainCategory && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
                    <Label
                      htmlFor="subCategory"
                      className="text-base font-semibold text-slate-700 dark:text-slate-300"
                    >
                      الفئة الفرعية <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.subCategory}
                      onValueChange={handleSubCategoryChange}
                      dir="rtl"
                    >
                      <SelectTrigger
                        id="subCategory"
                        className={cn(
                          "h-12 text-right bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary/20 rounded-xl transition-all",
                          errors.subCategory && "border-red-500"
                        )}
                      >
                        <SelectValue placeholder="اختر الفئة الفرعية" />
                      </SelectTrigger>
                      <SelectContent>
                        {subServices.map((sub, idx) => (
                          <SelectItem
                            key={idx}
                            value={sub}
                            className="text-right cursor-pointer py-3"
                          >
                            {sub}
                          </SelectItem>
                        ))}
                        <SelectItem
                          value="other"
                          className="text-right cursor-pointer py-3 font-medium text-primary"
                        >
                          أخرى (حدد يدوياً)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.subCategory && (
                      <p className="text-sm text-red-500">
                        {errors.subCategory}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Custom Sub Category Input */}
              {showCustomInput && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-500 pt-2">
                  <Label
                    htmlFor="customSubCategory"
                    className="text-base font-semibold text-slate-700 dark:text-slate-300"
                  >
                    حدد الخدمة المطلوبة <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="customSubCategory"
                    value={formData.customSubCategory}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        customSubCategory: e.target.value,
                      }));
                      if (errors.customSubCategory)
                        setErrors((prev) => ({
                          ...prev,
                          customSubCategory: null,
                        }));
                    }}
                    placeholder="اكتب الخدمة المطلوبة هنا..."
                    className={cn(
                      "h-12 text-right bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary/20 rounded-xl transition-all",
                      errors.customSubCategory && "border-red-500"
                    )}
                    dir="rtl"
                  />
                  {errors.customSubCategory && (
                    <p className="text-sm text-red-500">
                      {errors.customSubCategory}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* 2. Description */}
          <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-300">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 p-6 md:p-8">
              <CardTitle className="text-2xl font-bold text-primary">
                وصف المشكلة
              </CardTitle>
              <CardDescription className="text-base">
                اشرح المشكلة باختصار لمساعدة الفني (اختياري)
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="مثال: المكيف لا يبرد بشكل جيد، ويصدر صوتاً غريباً عند التشغيل..."
                className="min-h-[120px] text-base bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary/20 rounded-xl transition-all resize-none p-4 leading-relaxed"
                dir="rtl"
              />
            </CardContent>
          </Card>

          {/* 3. File Upload */}
          <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-300">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 p-6 md:p-8">
              <CardTitle className="text-2xl font-bold text-primary">
                مرفقات (صور/فيديو)
              </CardTitle>
              <CardDescription className="text-base">
                أضف صوراً أو فيديو لتوضيح المشكلة بشكل أفضل (اختياري)
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <FileUpload
                onFilesChange={(files) =>
                  setFormData((prev) => ({ ...prev, files }))
                }
                acceptedTypes={["image/jpeg", "image/png", "video/mp4"]}
                maxFiles={5}
              />
            </CardContent>
          </Card>

          {/* 4. Location */}
          <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-300">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 p-6 md:p-8">
              <CardTitle className="text-2xl font-bold text-primary">
                موقع الخدمة
              </CardTitle>
              <CardDescription className="text-base">
                حدد موقعك بدقة على الخريطة ليصل إليك الفني
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
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

          {/* 5. Schedule */}
          <Card
            className={cn(
              "border-0 shadow-lg shadow-slate-200/50 dark:shadow-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-300",
              (errors.date || errors.time) && "ring-2 ring-red-500"
            )}
          >
            <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 p-6 md:p-8">
              <CardTitle className="text-2xl font-bold text-primary">
                توقيت الخدمة
              </CardTitle>
              <CardDescription className="text-base">
                متى ترغب في حضور الفني؟
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-8">
              <RadioGroup
                dir="rtl"
                value={formData.schedule}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    schedule: value,
                    date: null,
                    time: "",
                  }))
                }
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div
                  className={cn(
                    "flex items-center space-x-4 space-x-reverse p-4 rounded-2xl border-2 transition-all cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800",
                    formData.schedule === "now"
                      ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                      : "border-slate-200 dark:border-slate-800"
                  )}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      schedule: "now",
                      date: null,
                      time: "",
                    }))
                  }
                >
                  <RadioGroupItem value="now" id="now" className="h-5 w-5" />
                  <div className="flex flex-col">
                    <Label
                      htmlFor="now"
                      className="font-bold text-lg cursor-pointer text-slate-900 dark:text-slate-100"
                    >
                      الآن (مستعجل)
                    </Label>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      أقرب وقت ممكن
                    </span>
                  </div>
                </div>

                <div
                  className={cn(
                    "flex items-center space-x-4 space-x-reverse p-4 rounded-2xl border-2 transition-all cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800",
                    formData.schedule === "scheduled"
                      ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                      : "border-slate-200 dark:border-slate-800"
                  )}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, schedule: "scheduled" }))
                  }
                >
                  <RadioGroupItem
                    value="scheduled"
                    id="scheduled"
                    className="h-5 w-5"
                  />
                  <div className="flex flex-col">
                    <Label
                      htmlFor="scheduled"
                      className="font-bold text-lg cursor-pointer text-slate-900 dark:text-slate-100"
                    >
                      مجدول
                    </Label>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      اختر تاريخ ووقت محدد
                    </span>
                  </div>
                </div>
              </RadioGroup>

              {/* Date & Time Pickers */}
              {formData.schedule === "scheduled" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4 duration-500 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {/* Date Picker */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold text-slate-700 dark:text-slate-300">
                      التاريخ <span className="text-red-500">*</span>
                    </Label>
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-12 justify-between text-right font-normal bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl",
                            !formData.date && "text-muted-foreground",
                            errors.date && "border-red-500"
                          )}
                        >
                          {formData.date ? (
                            format(formData.date, "PPP", { locale: ar })
                          ) : (
                            <span>اختر التاريخ</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0 rounded-xl shadow-xl border-0"
                        align="end"
                      >
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          captionLayout="dropdown"
                          onSelect={(date) => {
                            setFormData((prev) => ({ ...prev, date }));
                            setCalendarOpen(false);
                            if (errors.date)
                              setErrors((prev) => ({ ...prev, date: null }));
                          }}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const compareDate = new Date(date);
                            compareDate.setHours(0, 0, 0, 0);
                            return compareDate < today;
                          }}
                          fromYear={2024}
                          toYear={2030}
                          className="rounded-xl border"
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.date && (
                      <p className="text-sm text-red-500">{errors.date}</p>
                    )}
                  </div>

                  {/* Time Picker */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="time"
                      className="text-base font-semibold text-slate-700 dark:text-slate-300"
                    >
                      الوقت <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          time: e.target.value,
                        }));
                        if (errors.time)
                          setErrors((prev) => ({ ...prev, time: null }));
                      }}
                      className={cn(
                        "h-12 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary/20 rounded-xl",
                        errors.time && "border-red-500"
                      )}
                    />
                    {errors.time && (
                      <p className="text-sm text-red-500">{errors.time}</p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex flex-col-reverse md:flex-row gap-4 justify-end mt-12 pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
            <Button
              variant="outline"
              className="w-full md:w-auto min-w-[160px] h-14 text-lg font-medium gap-2 rounded-xl border-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              onClick={() => navigate(-1)}
            >
              <ArrowRightIcon className="w-5 h-5" />
              السابق
            </Button>
            <Button
              onClick={handleNext}
              className="w-full md:w-auto min-w-[240px] h-14 text-lg font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all gap-2 rounded-xl"
            >
              التالي: اختيار الفني
              <ArrowLeftIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
