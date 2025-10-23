// src/components/BlogSection.jsx
import React from "react";
import { Link } from "react-router-dom";

// React Icons
import { FaUser, FaCalendarAlt, FaArrowLeft } from "react-icons/fa";

// بيانات وهمية للمقالات (يمكن استبدالها ببيانات من API لاحقًا)
const mainArticle = {
  id: 1,
  slug: "mastering-home-ac-maintenance",
  image: "/assets/images/blog-main.jpg", // استخدم صورة مناسبة وعريضة
  title: "دليلك الشامل لصيانة التكييف المنزلي بنفسك",
  excerpt:
    "تعلم الخطوات الأساسية للحفاظ على جهاز التكييف الخاص بك يعمل بكفاءة طوال الصيف، وتجنب الأعطال المكلفة مع نصائح خبرائنا.",
  author: "فريق سرفانا",
  date: "15 أكتوبر 2025",
};

const sideArticles = [
  {
    id: 2,
    slug: "5-common-plumbing-issues",
    image: "/assets/images/blog-side-1.jpg",
    title: "5 مشاكل سباكة شائعة يمكنك إصلاحها بنفسك",
    author: "خالد عبد الله",
    date: "12 أكتوبر 2025",
    excerpt: "لا تدع التسريبات الصغيرة تتحول إلى مشاكل كبيرة...", // <<< إضافة المقتطف
  },
  {
    id: 3,
    slug: "electrical-safety-tips",
    image: "/assets/images/blog-side-2.jpg",
    title: "نصائح الأمان الكهربائي التي يجب على كل أسرة معرفتها",
    author: "فاطمة الزهراء",
    date: "10 أكتوبر 2025",
    excerpt: "حماية عائلتك تبدأ من فهم أساسيات التعامل الآمن ...", // <<< إضافة المقتطف
  },
  {
    id: 4,
    slug: "choosing-the-right-technician",
    image: "/assets/images/blog-side-3.jpg",
    title: "كيف تختار الفني المناسب لمهمتك عبر تطبيقنا؟",
    author: "فريق سرفانا",
    date: "8 أكتوبر 2025",
    excerpt: "نضمن لك أفضل الفنيين. تعلم كيف تستخدم نظام ...", // <<< إضافة المقتطف
  },
];

export default function BlogSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="container max-w-7xl mx-auto px-4">
        {/* عنوان القسم */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            آخر الأخبار والمقالات
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            نصائح وحلول من خبرائنا لمساعدتك في كل ما يخص الصيانة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-4">
          {/* الجزء الرئيسي (الأيمن) */}
          <div className="lg:col-span-2">
            <Link to={`/blog/${mainArticle.slug}`} className="group block">
              <div className="bg-card rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                <div className="overflow-hidden">
                  <img
                    src={mainArticle.image}
                    alt={mainArticle.title}
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {mainArticle.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {mainArticle.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground gap-6">
                    <div className="flex items-center gap-2">
                      <FaUser />
                      <span>{mainArticle.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt />
                      <span>{mainArticle.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* الجزء الجانبي (الأيسر) */}
          <div className="flex flex-col gap-4 justify-between h-full">
            {sideArticles.map((article) => (
              <Link
                key={article.id}
                to={`/blog/${article.slug}`}
                className="group block h-full"
              >
                {/* 1. زيادة الـ padding هنا */}
                <div className="bg-card rounded-lg shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-lg flex items-center gap-4 p-4 h-full">
                  {" "}
                  {/* تم تغيير p-3 إلى p-4 */}
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex flex-col justify-between h-full flex-grow">
                    {/* الجزء العلوي: العنوان والمقتطف */}
                    <div>
                      {/* 2. تصغير خط العنوان */}
                      <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                        {" "}
                        {/* تم تغيير text-lg إلى text-base */}
                        {article.title}
                      </h4>
                      {/* 3. تصغير خط المقتطف */}
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                        {" "}
                        {/* تم تغيير text-sm إلى text-xs */}
                        {article.excerpt}
                      </p>
                    </div>

                    {/* الجزء السفلي: التفاصيل */}
                    <div className="flex justify-start items-center mt-2">
                      {/* 4. التأكد من أن خط التفاصيل صغير (كان بالفعل text-xs) */}
                      <div className="flex items-center text-xs text-muted-foreground gap-3">
                        <div className="flex items-center gap-1">
                          <FaUser className="w-3 h-3" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="w-3 h-3" />
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
