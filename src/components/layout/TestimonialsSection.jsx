import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "@radix-ui/react-icons";

const testimonials = [
  {
    name: "سارة عبد الحميد",
    role: "ربة منزل",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 5,
    quote: "خدمة سريعة وممتازة. الفني وصل في الموعد بالضبط.",
  },
  {
    name: "محمود السيد",
    role: "صاحب مطعم",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    rating: 5,
    quote:
      "كان عندي مشكلة تسريب مياه عاجلة في المطبخ الرئيسي، وفريق سرفانا استجاب بسرعة قياسية. الفني كان محترفًا جدًا، تمكن من تحديد مكان التسريب الصعب وإصلاحه دون التسبب في أي فوضى. أنقذوا الموقف في وقت حرج، وأنا ممتن جدًا لسرعتهم وكفاءتهم العالية.",
  },
  {
    name: "نور الحسين",
    role: "موظفة في شركة",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    rating: 4.5,
    quote:
      "طلبت تركيب مكيف جديد. التجربة كانت سلسة من الحجز وحتى انتهاء التركيب. شغل نظيف ومحترم.",
  },
  {
    name: "عبد الرحمن علي",
    role: "مدير عقارات",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    rating: 5,
    quote:
      "أتعامل مع سرفانا بشكل دوري لصيانة الشقق التي أديرها. دائمًا ما يقدمون خدمة موثوقة وأسعار تنافسية.",
  },
  {
    name: "ياسمين فؤاد",
    role: "صاحبة مشروع صغير",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    rating: 5,
    quote: "حلوا لي مشكلة الكهرباء في المحل. شكرًا سرفانا.",
  },
  {
    name: "خالد الشربيني",
    role: "مهندس برمجيات",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 4,
    quote:
      "واجهتني مشكلة معقدة في السباكة لم يتمكن فنيان آخران من حلها. فني سرفانا كان لديه خبرة واضحة واستخدم أدوات حديثة لكشف المشكلة وحلها من جذورها.",
  },
  {
    name: "خالد الشربيني",
    role: "مهندس برمجيات",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    quote:
      "واجهتني مشكلة معقدة في السباكة لم يتمكن فنيان آخران من حلها. فني سرفانا كان لديه خبرة واضحة واستخدم أدوات حديثة لكشف المشكلة وحلها من جذورها.",
    rating: 4.5,
  },

  {
    name: "دينا حسن",
    role: "مديرة مكتب",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    quote:
      "نعتمد على سرفانا في كل أعمال الصيانة الدورية للمكتب، من الكهرباء إلى السباكة. دائمًا محترفون وملتزمون بالمواعيد.",
    rating: 4,
  },
  {
    name: "ليلى سامي",
    role: "طبيبة",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
    quote:
      "احتجت لدهان الشقة بالكامل قبل الانتقال إليها، وكان الوقت ضيقًا جدًا. تواصلت مع سرفانا وقدموا لي عرضًا ممتازًا. الفريق الذي أرسلوه كان مدهشًا، عملوا بكفاءة عالية واهتمام لا يصدق بالتفاصيل. قاموا بتغطية جميع الأثاث والأرضيات بعناية فائقة، وكانت النتيجة النهائية تفوق كل توقعاتي. الشقة بدت وكأنها جديدة تمامًا، وكل ذلك تم في وقت قياسي. لا أستطيع أن أصف مدى سعادتي بالخدمة.",
    rating: 4.5,
  },
  {
    name: "أحمد بسيوني",
    role: "مستشار مالي",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    quote:
      "تجربة الحجز عبر التطبيق كانت في غاية البساطة والوضوح. كل شيء كان شفافًا من البداية، من الأسعار المتوقعة إلى تقييمات الفنيين. وصلتني عروض مختلفة وتمكنت من اختيار الأنسب لي بسهولة. الفني كان على قدر كبير من الاحترافية وأنجز العمل بكفاءة. هذه هي الطريقة التي يجب أن تكون عليها الخدمات المنزلية.",
    rating: 4,
  },
  {
    name: "إيمان صلاح",
    role: "معلمة",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    quote:
      "كان لدي باب خزانة مكسور، وقام النجار بإصلاحه ببراعة. يبدو الآن أفضل من الجديد!",
    rating: 3,
  },
];

function chunkArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

const testimonialChunks = chunkArray(
  testimonials,
  Math.ceil(testimonials.length / 3)
);

// --- مكون فرعي لعرض النجوم ---
const RatingStars = ({ rating }) => (
  <div className="flex items-center gap-1 text-accent">
    {Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className="w-5 h-5"
        fill={rating > i ? "currentColor" : "none"}
        stroke={rating > i ? "currentColor" : "oklch(0.8478 0.1712 88.281)"}
      />
    ))}
  </div>
);

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      dir="rtl"
      className="w-full bg-card text-foreground py-16 md:py-24 overflow-hidden"
    >
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h4 className="text-lg text-primary font-semibold mb-2 tracking-wider">
            آراء العملاء
          </h4>
          <h2 className="text-3xl lg:text-4xl font-extrabold  mb-4 text-foreground leading-tight">
            ماذا يقولون عنا؟
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            في سرفانا، نؤمن أن أصدق شهادة على نجاحنا تأتي من عملائنا أنفسهم. هذه
            مجموعة من آراء المستخدمين الذين عاشوا تجربة سرفانا.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-start">
          {testimonialChunks.map((chunk, chunkIndex) => (
            <div key={chunkIndex} className="space-y-4">
              {chunk.map(({ name, role, quote, image, rating }, index) => (
                <Card
                  key={index}
                  className=" border !bg-background text-foreground shadow-xs lg:p-1"
                >
                  <CardContent className="lg:p-8 flex flex-col h-full">
                    <div className="flex-grow flex gap-4 text-right">
                      <Avatar className="size-10 shrink-0 ring-2 !ring-border">
                        <AvatarImage alt={name} src={image} loading="lazy" />
                        <AvatarFallback>{name.substring(0, 1)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <h3 className="font-medium text-card-foreground">
                          {name}
                        </h3>
                        <span className="text-muted-foreground text-sm">
                          {role}
                        </span>
                        <blockquote className="mt-3">
                          <p className="text-muted-foreground leading-relaxed">
                            {quote}
                          </p>
                        </blockquote>

                        <div className="mt-4">
                          <RatingStars rating={rating} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
