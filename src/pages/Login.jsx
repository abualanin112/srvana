import React from "react";
import { useForm } from "react-hook-form";
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
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import CustomLogo from "@/components/ui/CustomLogo";
import BubbleBackground from "@/components/ui/BubbleBackground";

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    // TODO: Implement actual login logic here
    // Login data submitted
    toast.success("تم تسجيل الدخول بنجاح (محاكاة)");
    navigate("/clientdashboard"); // Redirect to dashboard for demo
  };

  return (
    <div className="relative min-h-screen w-full bg-background">
      <BubbleBackground
        interactive
        className="absolute inset-0 h-screen flex items-center justify-center"
      >
        <div className="relative z-10 flex h-full w-full items-center justify-center p-6 md:p-10">
          <div className="flex w-full max-w-sm flex-col gap-6" dir="rtl">
            {/* قسم الشعار */}
            <CustomLogo className="self-center w-55 drop-shadow-lg text-foreground" />

            {/* الفورم */}
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">مرحباً بعودتك</CardTitle>
                <CardDescription>
                  سجل الدخول باستخدام حسابك في جوجل أو آبل
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* أزرار الدخول الاجتماعي */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full gap-2"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                          fill="currentColor"
                        />
                      </svg>
                      Apple
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full gap-2"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                          fill="currentColor"
                        />
                      </svg>
                      Google
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        أو أكمل باستخدام
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...register("email", {
                        required: "البريد الإلكتروني مطلوب",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "البريد الإلكتروني غير صالح",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">كلمة المرور</Label>
                      <Link
                        to="/forgot-password"
                        className="mr-auto text-sm text-primary underline-offset-4 hover:underline"
                      >
                        هل نسيت كلمة المرور؟
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      {...register("password", {
                        required: "كلمة المرور مطلوبة",
                        minLength: {
                          value: 6,
                          message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
                        },
                      })}
                    />
                    {errors.password && (
                      <p className="text-sm text-destructive">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "جاري الدخول..." : "تسجيل الدخول"}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    ليس لديك حساب؟{" "}
                    <Link
                      to="/signup"
                      className="underline text-primary hover:text-primary/80"
                    >
                      إنشاء حساب جديد
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>

            <p className="px-6 text-center text-sm text-muted-foreground">
              بالنقر على "متابعة"، فإنك توافق على{" "}
              <Link to="/terms" className="underline hover:text-foreground">
                شروط الخدمة
              </Link>{" "}
              و{" "}
              <Link to="/privacy" className="underline hover:text-foreground">
                سياسة الخصوصية
              </Link>
              .
            </p>
          </div>
        </div>
      </BubbleBackground>
    </div>
  );
}
