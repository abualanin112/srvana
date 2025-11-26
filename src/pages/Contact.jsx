export default function Contact() {
  return (
    <section className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">اتصل بنا</h1>
      <p className="text-lg text-muted-foreground">
        يمكنك التواصل معنا عبر البريد الإلكتروني:{" "}
        <a href="mailto:info@sarfana.com" className="text-blue-500 underline">
          info@sarfana.com
        </a>
      </p>
    </section>
  );
}
