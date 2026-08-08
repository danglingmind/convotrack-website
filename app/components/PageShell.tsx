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
        <header className="relative overflow-hidden border-b border-outline-variant/40 pt-32 pb-16">
          <div className="absolute inset-0 grid-lines opacity-50" />
          <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
            <div className="inline-flex items-center gap-2">
              <span className="h-px w-8 bg-lime" />
              <span className="label-caps text-lime">{kicker}</span>
            </div>
            <h1 className="display mt-5 text-4xl text-on-surface sm:text-6xl">
              {title}
            </h1>
            {intro && (
              <p className="mt-5 max-w-xl text-on-surface-variant leading-relaxed">
                {intro}
              </p>
            )}
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          <div className="prose-convo">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
