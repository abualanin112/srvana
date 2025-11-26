"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, UploadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import CustomLogo from "@/components/ui/CustomLogo";

// أيام الأسبوع باللغة العربية
const weekdays = [
  { id: "saturday", label: "السبت" },
  { id: "sunday", label: "الأحد" },
  { id: "monday", label: "الإثنين" },
  { id: "tuesday", label: "الثلاثاء" },
  { id: "wednesday", label: "الأربعاء" },
  { id: "thursday", label: "الخميس" },
  { id: "friday", label: "الجمعة" },
];

export default function TechnicianForm({ className, ...props }) {
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      nationalId: "",
      gender: undefined,
      nationalIdImage: undefined,
      workingDays: [],
      startTime: "08:00",
      endTime: "17:00",
    },
  });

  // مراقبة حقل الرقم القومي لاستخلاص البيانات
  const nationalId = watch("nationalId");

  React.useEffect(() => {
    if (nationalId && nationalId.length === 14) {
      try {
        const centuryDigit = parseInt(nationalId.charAt(0));
        const year = parseInt(nationalId.substring(1, 3));
        const month = parseInt(nationalId.substring(3, 5));
        const day = parseInt(nationalId.substring(5, 7));
        const genderDigit = parseInt(nationalId.charAt(12));

        const birthCentury = centuryDigit === 2 ? 1900 : 2000;
        const birthDate = new Date(birthCentury + year, month - 1, day);

        if (!isNaN(birthDate.getTime())) {
          setValue("birthDate", birthDate);
        }

        setValue("gender", genderDigit % 2 !== 0 ? "Male" : "Female");
      } catch (error) {
        console.error("Invalid National ID format");
      }
    }
  }, [nationalId, setValue]);

  const onSubmit = (data) => {
    toast.success("تم حفظ البيانات بنجاح!");
    // Form data submitted
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      // تحديث قيمة الحقل في react-hook-form
      field.onChange(e.target.files);
    }
  };

  return (
    <div className="bg-background w-full flex min-h-screen flex-col items-center justify-center gap-4 p-6 md:p-10">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        <CustomLogo className="w-50 self-center text-primary" />
        <div
          dir="rtl"
          className={cn(
            "flex flex-col gap-6 w-full max-w-2xl mx-auto",
            className
          )}
          {...props}
        >
          <Card className="shadow-lg border">
            <CardHeader className="text-center space-y-1 pt-6">
              <CardTitle className="text-2xl font-bold">
                نموذج بيانات الفني
              </CardTitle>
              <CardDescription>
                يرجى إدخال البيانات التالية بدقة.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {/* --- الاسم الكامل --- */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">الاسم الكامل</Label>
                  <Input
                    id="fullName"
                    placeholder="كما هو مسجل في بطاقة الرقم القومي"
                    className="text-right focus-visible:ring-primary"
                    {...register("fullName", {
                      required: "الاسم الكامل مطلوب.",
                      minLength: {
                        value: 5,
                        message: "الاسم الكامل يجب أن يكون 5 أحرف على الأقل.",
                      },
                    })}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* --- الرقم القومي --- */}
                <div className="space-y-2">
                  <Label htmlFor="nationalId">الرقم القومي</Label>
                  <Input
                    id="nationalId"
                    type="text"
                    placeholder="ادخل 14 رقمًا"
                    className="text-right focus-visible:ring-primary"
                    {...register("nationalId", {
                      required: "الرقم القومي مطلوب.",
                      minLength: {
                        value: 14,
                        message: "الرقم القومي يجب أن يتكون من 14 رقمًا.",
                      },
                      maxLength: {
                        value: 14,
                        message: "الرقم القومي يجب أن يتكون من 14 رقمًا.",
                      },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "الرقم القومي يجب أن يحتوي على أرقام فقط.",
                      },
                    })}
                  />
                  {errors.nationalId && (
                    <p className="text-red-500 text-sm">
                      {errors.nationalId.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* --- تاريخ الميلاد (للعرض فقط) --- */}
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">تاريخ الميلاد</Label>
                    <Controller
                      name="birthDate"
                      control={control}
                      render={({ field }) => (
                        <Input
                          className="bg-gray-100"
                          value={
                            field.value ? format(field.value, "dd/MM/yyyy") : ""
                          }
                          readOnly
                          placeholder="يُستخرج من الرقم القومي"
                        />
                      )}
                    />
                  </div>

                  {/* --- النوع --- */}
                  <div className="space-y-2">
                    <Label>النوع</Label>
                    <Controller
                      name="gender"
                      control={control}
                      rules={{ required: "يرجى تحديد النوع." }}
                      render={({ field }) => (
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-row items-center gap-6 pt-2"
                          disabled
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="Male" id="male" />
                            <Label htmlFor="male">ذكر</Label>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="Female" id="female" />
                            <Label htmlFor="female">أنثى</Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                    {errors.gender && (
                      <p className="text-red-500 text-sm">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* --- صورة بطاقة الرقم القومي --- */}
                <div className="space-y-2">
                  <Label htmlFor="nationalIdImage">
                    صورة بطاقة الرقم القومي
                  </Label>
                  <Controller
                    name="nationalIdImage"
                    control={control}
                    rules={{
                      validate: {
                        required: (files) =>
                          files?.length > 0 ||
                          "صورة بطاقة الرقم القومي مطلوبة.",
                        supportedFormats: (files) =>
                          [
                            "image/jpeg",
                            "image/png",
                            "application/pdf",
                          ].includes(files?.[0]?.type) ||
                          "صيغ الملفات المدعومة هي JPG, PNG, PDF.",
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <div className="flex items-center justify-center w-full">
                          <Label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <UploadIcon className="w-8 h-8 mb-4 text-gray-500" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">
                                  انقر للرفع
                                </span>{" "}
                                أو اسحب وأفلت
                              </p>
                              <p className="text-xs text-gray-500">
                                JPG, PNG, PDF
                              </p>
                            </div>
                            <Input
                              id="dropzone-file"
                              type="file"
                              className="hidden"
                              accept="image/jpeg,image/png,application/pdf"
                              onChange={(e) => handleImageChange(e, field)}
                            />
                          </Label>
                        </div>
                        {imagePreview && (
                          <div className="mt-4">
                            <img
                              src={imagePreview}
                              alt="معاينة البطاقة"
                              className="mt-2 rounded-lg max-h-48"
                            />
                          </div>
                        )}
                      </>
                    )}
                  />
                  {errors.nationalIdImage && (
                    <p className="text-red-500 text-sm">
                      {errors.nationalIdImage.message}
                    </p>
                  )}
                </div>

                {/* --- أيام العمل --- */}
                <div className="space-y-2">
                  <Label>أيام العمل خلال الأسبوع</Label>
                  <Controller
                    name="workingDays"
                    control={control}
                    rules={{
                      validate: (value) =>
                        value.length > 0 ||
                        "يجب اختيار يوم عمل واحد على الأقل.",
                    }}
                    render={({ field }) => (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                        {weekdays.map((day) => (
                          <div className="flex items-center gap-2" key={day.id}>
                            <Checkbox
                              id={day.id}
                              // التحقق مما إذا كان اليوم الحالي موجودًا في مصفوفة الأيام المختارة
                              checked={field.value?.includes(day.id)}
                              onCheckedChange={(checked) => {
                                // إذا تم تحديد المربع، أضف اليوم إلى المصفوفة
                                if (checked) {
                                  field.onChange([...field.value, day.id]);
                                } else {
                                  // إذا تم إلغاء تحديد المربع، قم بإزالة اليوم من المصفوفة
                                  field.onChange(
                                    field.value?.filter(
                                      (value) => value !== day.id
                                    )
                                  );
                                }
                              }}
                            />
                            <Label htmlFor={day.id} className="font-normal">
                              {day.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                  {errors.workingDays && (
                    <p className="text-red-500 text-sm">
                      {errors.workingDays.message}
                    </p>
                  )}
                </div>

                {/* --- ساعات العمل اليومية --- */}
                <div className="space-y-2">
                  <Label>ساعات العمل اليومية</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="startTime">من</Label>
                      <Input
                        id="startTime"
                        type="time"
                        {...register("startTime", {
                          required: "وقت البدء مطلوب.",
                        })}
                      />
                      {errors.startTime && (
                        <p className="text-red-500 text-sm">
                          {errors.startTime.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="endTime">إلى</Label>
                      <Input
                        id="endTime"
                        type="time"
                        {...register("endTime", {
                          required: "وقت الانتهاء مطلوب.",
                        })}
                      />
                      {errors.endTime && (
                        <p className="text-red-500 text-sm">
                          {errors.endTime.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* --- زر الحفظ --- */}
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  التالي
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
