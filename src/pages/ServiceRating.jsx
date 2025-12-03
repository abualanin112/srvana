import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ServiceRating() {
  const navigate = useNavigate();
  const location = useLocation();
  const { technicianData } = location.state || {};

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const technician = technicianData || {
    name: "أحمد محمد",
    image: "https://i.pravatar.cc/150?u=ahmed",
    profession: "فني تكييف وتبريد",
  };

  const handleSubmit = () => {
    // Logic to submit rating would go here
    console.log("Rating submitted:", { rating, comment });
    navigate("/"); // Go back home
  };

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center p-4"
      dir="rtl"
    >
      <Card className="w-full max-w-lg border-0 shadow-2xl bg-card/80 backdrop-blur-sm rounded-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold text-foreground">
            كيف كانت خدمتك؟
          </CardTitle>
          <CardDescription className="text-lg">
            ساعدنا في تحسين خدماتنا بتقييم الفني
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 p-8">
          {/* Technician Info */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
              <AvatarImage src={technician.image} />
              <AvatarFallback>{technician.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground">
                {technician.name}
              </h3>
              <p className="text-muted-foreground">{technician.profession}</p>
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="transition-transform hover:scale-110 focus:outline-hidden"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                {star <= (hoverRating || rating) ? (
                  <StarFilledIcon className="w-10 h-10 text-yellow-400 drop-shadow-sm" />
                ) : (
                  <StarIcon className="w-10 h-10 text-muted-foreground" />
                )}
              </button>
            ))}
          </div>

          {/* Comment */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              أضف تعليقك (اختياري)
            </label>
            <Textarea
              placeholder="اكتب تجربتك هنا..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px] bg-muted border-border rounded-xl resize-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="w-full h-12 text-lg font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
          >
            إرسال التقييم
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
