// src/components/FaqSection.jsx
import React from "react";

// Shadcn UI Components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// بيانات الأسئلة الشائعة
const faqData = [
  {
    id: "item-1",
    question: "ما هي خدمات سرفانا المتوفرة؟",
    answer:
      "نقدم مجموعة متنوعة من الخدمات مثل السباكة، الكهرباء، الصيانة المنزلية، وتوصيل الخدمات التقنية والفنية حسب احتياجاتك.",
  },
  {
    id: "item-2",
    question: "كيف يمكنني الانضمام كفني؟",
    answer:
      "يمكنك التسجيل بسهولة عبر التطبيق، وتحميل ملفك الشخصي وإضافة مهاراتك وخبراتك، ثم انتظار الموافقة لتبدأ استقبال الطلبات.",
  },
  {
    id: "item-3",
    question: "كيف أطلب خدمة من تطبيق سرفانا؟",
    answer:
      "بعد التسجيل في التطبيق، اختر الخدمة المطلوبة، حدد موقعك، واضغط على 'طلب الخدمة' ليصلك فني موثوق في أقرب وقت.",
  },
  {
    id: "item-4",
    question: "هل سرفانا متاحة في كل المدن؟",
    answer:
      "حاليا نغطي حوالي 10 – 25 مدينة، ونعمل على توسيع نطاق الخدمة لتشمل المزيد من المناطق قريباً.",
  },
  {
    id: "item-5",
    question: "هل يمكنني تقييم الفني بعد الخدمة؟",
    answer:
      "نعم، بعد انتهاء كل خدمة يمكنك ترك تقييم للفني والتعليق على جودة الخدمة لمساعدة المستخدمين الآخرين واختيار الأفضل.",
  },
];

export default function FaqSection() {
  return (
    <section className="w-full bg-muted/50 py-16 md:py-24">
      <div className="container max-w-4xl mx-auto px-4">
        {/* عنوان القسم */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            الأسئلة الشائعة
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            كل ما تحتاج معرفته عن سرفانا في مكان واحد.
          </p>
        </div>

        {/* Accordion للأسئلة */}
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faqItem) => (
            <AccordionItem
              key={faqItem.id}
              value={faqItem.id}
              className="bg-card mb-4 rounded-lg shadow-sm border px-4"
            >
              <AccordionTrigger className="text-right text-lg font-semibold hover:no-underline py-4">
                {faqItem.question}
              </AccordionTrigger>
              <AccordionContent className="text-right text-base text-muted-foreground pb-4 leading-relaxed">
                {faqItem.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
