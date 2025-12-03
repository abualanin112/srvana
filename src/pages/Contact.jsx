export default function Contact() {
  return (
    <section className="p-8 text-center bg-background text-foreground min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-primary">اتصل بنا</h1>
      <p className="text-lg text-muted-foreground">
        يمكنك التواصل معنا عبر البريد الإلكتروني:{" "}
        <a
          href="mailto:info@sarfana.com"
          className="text-primary underline hover:text-primary/80"
        >
          info@sarfana.com
        </a>
      </p>
    </section>
  );
}
