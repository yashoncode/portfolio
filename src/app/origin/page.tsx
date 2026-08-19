import type { Metadata } from "next";
import Origin from "@/components/Origin";

export const metadata: Metadata = {
  title: "Origin",
  description: "The long version.",
  robots: { index: false, follow: false },
};

export default function OriginPage() {
  return <Origin />;
}
