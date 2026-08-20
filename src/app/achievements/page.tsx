import type { Metadata } from "next";
import Achievements from "@/components/Achievements";

export const metadata: Metadata = {
  title: "The receipts",
  description: "The long list, with the how attached.",
  robots: { index: false, follow: false },
};

export default function AchievementsPage() {
  return <Achievements />;
}
