import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircledIcon, HomeIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TechnicianPaymentConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { request, duration, finalPrice } = location.state || {};

  const [walletBalance, setWalletBalance] = useState(1250); // Initial balance

  useEffect(() => {
    // Simulate wallet update
    const price = parseInt(finalPrice?.toString().replace(/\D/g, "") || "250");
    const balanceTimer = setTimeout(() => {
      setWalletBalance((prev) => prev + price);
    }, 1000);

    return () => {
      clearTimeout(balanceTimer);
    };
  }, [finalPrice]);

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center p-4"
      dir="rtl"
    >
      <Card className="w-full max-w-md border-0 shadow-2xl bg-card/90 backdrop-blur-xl overflow-hidden">
        <div className="bg-green-500 h-2 w-full" />
        <CardContent className="p-8 text-center space-y-8">
          <div className="mx-auto w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center animate-in zoom-in duration-500">
            <CheckCircledIcon className="w-16 h-16 text-green-600 dark:text-green-400" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              تمت المهمة بنجاح!
            </h1>
            <p className="text-muted-foreground">
              شكراً لجهودك، تم إضافة المبلغ لمحفظتك.
            </p>
          </div>

          <div className="bg-muted/50 rounded-2xl p-6 space-y-4 border border-border">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>مدة العمل</span>
              <span className="font-mono font-bold text-foreground">
                {duration || "00:45"}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>سعر الخدمة</span>
              <span className="font-bold text-foreground">
                {finalPrice || "250"} ج.م
              </span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="font-bold text-foreground">
                رصيد المحفظة الحالي
              </span>
              <div className="flex items-center gap-2 text-green-600 font-bold text-xl">
                <PlusIcon className="w-4 h-4" />
                <span>{walletBalance} ج.م</span>
              </div>
            </div>
          </div>

          <Button
            onClick={() => navigate("/")}
            className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20"
          >
            <HomeIcon className="w-5 h-5 ml-2" /> العودة للرئيسية
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
