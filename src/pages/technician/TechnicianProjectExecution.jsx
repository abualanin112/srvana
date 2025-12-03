import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SewingPinFilledIcon,
  CheckIcon,
  Cross1Icon,
  CalendarIcon,
  ImageIcon,
  PersonIcon,
  DashboardIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock Project Data
const MOCK_PROJECT = {
  id: "PROJ-1234",
  customer: {
    name: "أحمد محمود",
    image: "https://i.pravatar.cc/150?u=ahmed",
    rating: 4.9,
    type: "عميل VIP",
  },
  project: {
    title: "تشطيب شقة سكنية كاملة",
    category: "تشطيبات",
    subCategory: "سباكة وكهرباء",
    description:
      "المشروع عبارة عن تشطيب شقة 150 متر، يشمل تأسيس السباكة والكهرباء والدهانات. تم الاتفاق على كافة التفاصيل في العرض المقدم.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop",
    attachments: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=150&h=150&fit=crop",
    ],
  },
  location: {
    address: "جدة، حي الشاطئ",
    details: "برج الكورنيش، الدور 15، شقة 4",
    coordinates: { lat: 21.5433, lng: 39.1728 },
    distance: "5.2 كم",
    duration: "15 دقيقة",
  },
  schedule: {
    startDate: "2024-12-01",
    endDate: "2024-12-15",
    duration: "15 يوم",
  },
  price: "15,000 ر.س",
};

export default function TechnicianProjectExecution() {
  const navigate = useNavigate();

  const handleComplete = () => {
    // Navigate to completion or success page (placeholder)
    navigate("/technician/project-tracking", {
      state: { project: MOCK_PROJECT },
    }); // Navigate to Project Tracking
  };

  const handleReject = () => {
    navigate("/technician/reject-reason", {
      state: { request: MOCK_PROJECT, type: "project" },
    });
  };

  return (
    <div
      className="min-h-screen bg-background py-8 px-4 flex items-center justify-center"
      dir="rtl"
    >
      <Card className="w-full max-w-2xl border-0 shadow-2xl bg-card overflow-hidden relative animate-in fade-in zoom-in-95 duration-500 ring-1 ring-border">
        <CardHeader className="text-center pt-8 pb-6 border-b border-border bg-muted/50">
          <div className="flex items-center justify-between mb-2">
            <Badge
              variant="outline"
              className="gap-1.5 px-3 py-1.5 text-sm font-bold border-primary/20 text-primary bg-primary/5"
            >
              <FileTextIcon className="w-4 h-4" />
              مشروع قيد التنفيذ
            </Badge>
            <Badge variant="secondary" className="text-sm font-mono bg-muted">
              {MOCK_PROJECT.id}
            </Badge>
          </div>
          <CardTitle className="text-2xl font-black text-foreground">
            {MOCK_PROJECT.project.title}
          </CardTitle>
          <p className="text-muted-foreground font-medium mt-1">
            يرجى مراجعة التفاصيل واتخاذ الإجراء المناسب
          </p>
        </CardHeader>

        <CardContent className="p-0">
          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
            <div className="p-6 space-y-8">
              {/* 1. Customer Info */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-border">
                <Avatar className="w-16 h-16 border-4 border-background shadow-sm">
                  <AvatarImage src={MOCK_PROJECT.customer.image} />
                  <AvatarFallback>
                    {MOCK_PROJECT.customer.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg text-foreground">
                    {MOCK_PROJECT.customer.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm mt-1">
                    <span className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-md">
                      ★ {MOCK_PROJECT.customer.rating}
                    </span>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <PersonIcon className="w-3.5 h-3.5" />
                      {MOCK_PROJECT.customer.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Project Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <DashboardIcon className="w-5 h-5" />
                  </div>
                  تفاصيل المشروع
                </div>

                <div className="grid gap-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="text-sm py-1.5 px-4 bg-primary hover:bg-primary/90 shadow-sm">
                      {MOCK_PROJECT.project.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-sm py-1.5 px-4 border-border font-medium"
                    >
                      {MOCK_PROJECT.project.subCategory}
                    </Badge>
                  </div>

                  <div className="bg-muted/50 p-5 rounded-2xl border border-border">
                    <p className="text-foreground leading-relaxed font-medium">
                      {MOCK_PROJECT.project.description}
                    </p>
                  </div>

                  {/* Attachments */}
                  {MOCK_PROJECT.project.attachments.length > 0 && (
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-foreground flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-primary" /> المرفقات
                      </label>
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {MOCK_PROJECT.project.attachments.map((src, i) => (
                          <div
                            key={i}
                            className="w-24 h-24 shrink-0 rounded-xl overflow-hidden border-2 border-border relative group cursor-pointer"
                          >
                            <img
                              src={src}
                              alt="Attachment"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* 3. Location & Schedule */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary font-bold text-lg">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <SewingPinFilledIcon className="w-5 h-5" />
                    </div>
                    الموقع
                  </div>
                  <div className="bg-muted/50 p-4 rounded-2xl border border-border space-y-3">
                    <p className="font-bold text-foreground">
                      {MOCK_PROJECT.location.address}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {MOCK_PROJECT.location.details}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/5 w-fit px-3 py-1 rounded-full">
                      <span>يبعد {MOCK_PROJECT.location.distance}</span>
                      <span>•</span>
                      <span>{MOCK_PROJECT.location.duration} قيادة</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary font-bold text-lg">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <CalendarIcon className="w-5 h-5" />
                    </div>
                    الجدول الزمني
                  </div>
                  <div className="bg-muted/50 p-4 rounded-2xl border border-border space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">
                        تاريخ البدء
                      </span>
                      <span className="font-bold text-foreground">
                        {MOCK_PROJECT.schedule.startDate}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">
                        تاريخ الانتهاء
                      </span>
                      <span className="font-bold text-foreground">
                        {MOCK_PROJECT.schedule.endDate}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-border/50">
                      <span className="text-muted-foreground text-sm">
                        المدة
                      </span>
                      <span className="font-bold text-primary">
                        {MOCK_PROJECT.schedule.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Footer */}
          <div className="p-6 bg-card border-t border-border grid grid-cols-2 gap-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-10 relative">
            <Button
              onClick={handleReject}
              variant="outline"
              className="h-14 text-lg font-bold border-2 border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-950/30 rounded-2xl gap-2 transition-all duration-300"
            >
              <Cross1Icon className="w-5 h-5" /> رفض الطلب
            </Button>
            <Button
              onClick={handleComplete}
              className="h-14 text-lg font-bold bg-green-600 hover:bg-green-700 text-white rounded-2xl gap-2 shadow-lg shadow-green-600/20 hover:shadow-green-600/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <CheckIcon className="w-6 h-6" /> اتمام المشروع
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
