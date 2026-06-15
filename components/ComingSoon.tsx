import Link from "next/link";
import { TopBar } from "./TopBar";

export function ComingSoon({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      <main className="mx-auto flex w-full max-w-[1320px] flex-1 items-center justify-center px-6 py-24">
        <div className="max-w-md text-center">
          <span className="text-sm font-medium text-muted-soft">{eyebrow}</span>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-3 leading-relaxed text-muted">{children}</p>
          <Link
            href="/handbook"
            className="mt-7 inline-flex items-center gap-2 rounded-pill bg-white px-5 py-2.5 text-sm font-semibold text-[#0a0b0d] transition-colors hover:bg-[#e2e2e5]"
          >
            Read the handbook
          </Link>
        </div>
      </main>
    </>
  );
}
