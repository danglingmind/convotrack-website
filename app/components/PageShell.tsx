import Nav from "./Nav";
import Footer from "./Footer";

export default function PageShell({
  kicker,
  title,
  intro,
  children,
}: {
  kicker: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <header className="border-b border-line">
          <div className="mx-auto max-w-3xl px-4 pb-14 pt-14 sm:px-6 sm:pt-20">
            <p className="eyebrow text-muted">{kicker}</p>
            <h1 className="h-display mt-4 text-[clamp(2.25rem,5.5vw,3.5rem)]">{title}</h1>
            {intro && (
              <p className="lede mt-5 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>
            )}
          </div>
        </header>
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="prose-ct">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
