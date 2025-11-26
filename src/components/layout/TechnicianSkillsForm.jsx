"use client";

import React, { useCallback } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { cn } from "@/lib/utils";
import CustomLogo from "@/components/ui/CustomLogo";

// Import ShadCN UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { TrashIcon, PlusCircledIcon } from "@radix-ui/react-icons";

// Dummy data for dropdowns (يمكن استبدالها ببيانات من API)
const specializations = [
  "كهرباء",
  "سباكة",
  "نجارة",
  "تكييف وتبريد",
  "دهانات",
  "أعمال جبس",
  "تركيب أثاث",
];

const skillsOptions = [
  "تركيب",
  "صيانة",
  "فحص أعطال",
  "تمديد أسلاك",
  "إصلاح تسريبات",
  "تشطيبات نهائية",
];

export default function TechnicianSkillsForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      specialization: "",
      experienceLevel: undefined,
      skills: [],
      about: "",
      previousWorks: [],
      agreement: false,
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "previousWorks",
  });

  const handleRemoveWork = useCallback(
    (index) => {
      remove(index);
    },
    [remove]
  );

  const handleAddWork = useCallback(() => {
    append({ title: "", description: "" });
  }, [append]);

  const onSubmit = (data) => {
    // Skills data submitted
    toast.success("تم تسجيل بياناتك بنجاح!", {
      description: "سيتم مراجعة طلبك والرد عليك قريبًا.",
    });
  };

  return (
    <div className="bg-background w-full flex min-h-screen flex-col items-center justify-center gap-4 p-6 md:p-10">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <CustomLogo className="w-50 self-center text-primary" />
        <div
          dir="rtl"
          className={cn("container mx-auto py-4", className)}
          {...props}
        >
          <Card className="max-w-4xl mx-auto shadow-lg border">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold">
                سجّل مهاراتك وخبراتك كفني محترف
              </CardTitle>
              <CardDescription>
                املأ النموذج التالي لعرض ملفك الشخصي للعملاء المحتملين
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* --- التخصص وسنوات الخبرة --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* --- حقل التخصص --- */}
                  <div className="space-y-2 ">
                    <Label htmlFor="specialization">التخصص</Label>
                    <Controller
                      name="specialization"
                      control={control}
                      rules={{ required: "الرجاء اختيار التخصص" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          dir="rtl"
                        >
                          <SelectTrigger
                            id="specialization"
                            className={
                              errors.specialization ? "border-red-500" : ""
                            }
                          >
                            <SelectValue placeholder="اختر تخصصك" />
                          </SelectTrigger>
                          <SelectContent>
                            {specializations.map((spec) => (
                              <SelectItem key={spec} value={spec}>
                                {spec}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.specialization && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.specialization.message}
                      </p>
                    )}
                  </div>

                  {/* --- سنوات الخبرة --- */}
                  <div className="space-y-2">
                    <Label>سنوات الخبرة</Label>
                    <Controller
                      name="experienceLevel"
                      control={control}
                      rules={{ required: "الرجاء تحديد مستوى الخبرة" }}
                      render={({ field }) => (
                        <RadioGroup
                          dir="rtl"
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex items-center space-x-4 space-x-reverse pt-2"
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="beginner" id="beginner" />
                            <Label htmlFor="beginner" className="font-normal">
                              مبتدئ (0-2 سنوات)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem
                              value="intermediate"
                              id="intermediate"
                            />
                            <Label
                              htmlFor="intermediate"
                              className="font-normal"
                            >
                              متوسط (3-5 سنوات)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse mr-4">
                            <RadioGroupItem value="expert" id="expert" />
                            <Label htmlFor="expert" className="font-normal">
                              خبير (+5 سنوات)
                            </Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                    {errors.experienceLevel && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.experienceLevel.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* --- المهارات (Multi-select) --- */}
                <div className="space-y-2">
                  <Label>المهارات (يمكنك اختيار أكثر من مهارة)</Label>
                  <Controller
                    name="skills"
                    control={control}
                    rules={{
                      validate: (value) =>
                        value.length > 0 || "يجب اختيار مهارة واحدة على الأقل",
                    }}
                    render={({ field }) => (
                      <div
                        className={cn(
                          "grid grid-cols-2 md:grid-cols-3 gap-4 rounded-md border p-4",
                          errors.skills ? "border-red-500" : ""
                        )}
                      >
                        {skillsOptions.map((skill) => (
                          <div key={skill} className="flex items-center gap-2">
                            <Checkbox
                              id={skill}
                              checked={field.value?.includes(skill)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, skill])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== skill
                                      )
                                    );
                              }}
                            />
                            <Label htmlFor={skill} className="font-normal">
                              {skill}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                  {errors.skills && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.skills.message}
                    </p>
                  )}
                </div>

                {/* --- نبذة تعريفية --- */}
                <div className="space-y-2">
                  <Label htmlFor="about">نبذة تعريفية</Label>
                  <Textarea
                    id="about"
                    placeholder="اكتب نبذة قصيرة عنك وخبراتك العملية"
                    className={cn(
                      "min-h-[100px]",
                      errors.about ? "border-red-500" : ""
                    )}
                    {...register("about", {
                      required: "النبذة التعريفية مطلوبة",
                      minLength: {
                        value: 20,
                        message: "النبذة التعريفية يجب أن لا تقل عن 20 حرفًا",
                      },
                    })}
                  />
                  {errors.about && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.about.message}
                    </p>
                  )}
                </div>

                {/* --- قسم الأعمال السابقة --- */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold border-b pb-2">
                      أعمالي السابقة
                    </h3>
                  </div>

                  {fields.map((item, index) => (
                    <Card key={item.id} className="p-4 bg-slate-50 relative">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`previousWorks.${index}.title`}>
                            عنوان العمل
                          </Label>
                          <Input
                            id={`previousWorks.${index}.title`}
                            placeholder="مثلاً: تركيب نظام تكييف في مجمع سكني"
                            className={
                              errors.previousWorks?.[index]?.title
                                ? "border-red-500"
                                : ""
                            }
                            {...register(`previousWorks.${index}.title`, {
                              required: "عنوان العمل مطلوب",
                              minLength: {
                                value: 5,
                                message: "العنوان يجب أن لا يقل عن 5 أحرف",
                              },
                            })}
                          />
                          {errors.previousWorks?.[index]?.title && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.previousWorks[index].title.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`previousWorks.${index}.description`}>
                            الوصف
                          </Label>
                          <Textarea
                            id={`previousWorks.${index}.description`}
                            placeholder="اكتب وصفاً مختصراً لطبيعة العمل المنفذ"
                            className={
                              errors.previousWorks?.[index]?.description
                                ? "border-red-500"
                                : ""
                            }
                            {...register(`previousWorks.${index}.description`, {
                              required: "وصف العمل مطلوب",
                              minLength: {
                                value: 10,
                                message: "الوصف يجب أن لا يقل عن 10 أحرف",
                              },
                            })}
                          />
                          {errors.previousWorks?.[index]?.description && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.previousWorks[index].description.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`previousWorks.${index}.images`}>
                            الصور
                          </Label>
                          <Input
                            id={`previousWorks.${index}.images`}
                            type="file"
                            multiple
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                          />
                        </div>

                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 left-2"
                          onClick={() => handleRemoveWork(index)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleAddWork}
                  >
                    <PlusCircledIcon className="ml-2 h-4 w-4" />
                    أضف عمل جديد
                  </Button>
                </div>

                {/* --- مربع التحقق --- */}
                <div className="items-top flex space-x-2 space-x-reverse">
                  <Controller
                    name="agreement"
                    control={control}
                    rules={{
                      validate: (value) =>
                        value === true || "يجب الموافقة على الشروط للإرسال",
                    }}
                    render={({ field }) => (
                      <Checkbox
                        id="agreement"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="agreement"
                      className="font-normal cursor-pointer"
                    >
                      أقر بأن جميع الأعمال المعروضة من تنفيذي ولدي الصلاحية
                      لنشرها
                    </Label>
                    {errors.agreement && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.agreement.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* --- زر التسجيل --- */}
                <CardFooter className="p-0 pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-lg"
                  >
                    تسجيل
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
