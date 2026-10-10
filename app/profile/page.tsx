import type { Metadata } from "next";
import { ProfileView } from "@/components/profile/profile-view";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Account Profile",
  description: `Manage your personal details, credentials, and settings on ${siteConfig.name}.`,
};

export default function ProfilePage() {
  return <ProfileView />;
}
