import Link from "next/link";
import { siteConfig } from "@/config/site";

export function AuthFooter() {
  return (
    <div className="text-muted-foreground/80 flex items-center justify-between border-t border-border/60 pt-3 text-[11px]">
      <p>
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </p>
      <div className="flex items-center gap-2.5">
        <Link
          href="#privacy"
          className="hover:text-foreground transition-colors"
        >
          Privacy
        </Link>
        <span className="text-muted-foreground/40">•</span>
        <Link href="#terms" className="hover:text-foreground transition-colors">
          Terms
        </Link>
        <span className="text-muted-foreground/40">•</span>
        <Link
          href="#security"
          className="hover:text-foreground transition-colors"
        >
          Security
        </Link>
      </div>
    </div>
  );
}
