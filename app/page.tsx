import type { Metadata } from "next";
import { ClientLayoutWrapper } from "@/components/layout/client-layout";
import { HomeView } from "@/components/home/home-view";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Home | ${siteConfig.name}`,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <ClientLayoutWrapper>
      <HomeView />
    </ClientLayoutWrapper>
  );
}
