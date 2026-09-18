import Link from "next/link";
import { Logo } from "@/components/logo";
import { company, contact, footerLinks, navLinks } from "@/content/company";
import { ThemeToggle } from "./theme";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--line)]">
      <div className="container-page grid gap-12 py-20 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm font-semibold text-[var(--cta)]">{company.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">{company.shortDescription}</p>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm text-[var(--ink-muted)]">Theme</span>
            <ThemeToggle />
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--ink-muted)]">Navigate</p>
          <ul className="mt-4 grid gap-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-[var(--ink-muted)] hover:text-[var(--cta)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--ink-muted)]">Company</p>
          <ul className="mt-4 grid gap-2.5 text-sm">
            {footerLinks.company.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-[var(--ink-muted)] hover:text-[var(--cta)]">
                  {link.label}
                </Link>
              </li>
            ))}
            {footerLinks.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-[var(--ink-muted)] hover:text-[var(--cta)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--ink-muted)]">Contact</p>
          <ul className="mt-4 grid gap-2.5 text-sm text-[var(--ink-muted)]">
            <li>{contact.officeLocation}</li>
            <li>{contact.email}</li>
            <li>{contact.phone}</li>
            <li className="flex gap-3 pt-1">
              {(["linkedin", "x", "facebook", "instagram"] as const).map((platform) =>
                contact.social[platform] ? (
                  <a
                    key={platform}
                    href={contact.social[platform]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="capitalize hover:text-[var(--cta)]"
                  >
                    {platform}
                  </a>
                ) : (
                  <span key={platform} className="capitalize text-[var(--ink-muted)]/50">
                    {platform}
                  </span>
                )
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--line)]">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-[var(--ink-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {company.name}. All rights reserved.
          </p>
          <p>{company.legalLocation}</p>
        </div>
      </div>
    </footer>
  );
}
