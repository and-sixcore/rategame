import Link from "next/link";
import Image from "next/image";

/**
 * RateGame wordmark: the app-icon logo next to the name.
 */
export function Wordmark({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2.5 text-[1.25rem] font-semibold tracking-tight text-fg"
    >
      <Image
        src="/rategame-logo.png"
        alt="RateGame"
        width={34}
        height={34}
        className="rounded-[8px]"
        priority
      />
      <span>RateGame</span>
    </Link>
  );
}
