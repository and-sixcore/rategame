import { ReactNode } from "react";
import { HandbookShell } from "@/components/HandbookShell";

export default function HandbookLayout({ children }: { children: ReactNode }) {
  return <HandbookShell>{children}</HandbookShell>;
}
