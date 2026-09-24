"use client";
import { useEffect, useState } from "react";
import { Emblem } from "./Art";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#videos", label: "Videos" },
  { href: "#membership", label: "Membership" },
  { href: "#contact", label: "Contact" },
];

export default function Header({ showVideos = false }: { showVideos?: boolean }) {
  const links = LINKS.filter((l) => showVideos || l.href !== "#videos");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <a href="#home" className="brand" onClick={() => setOpen(false)}>
          <Emblem />
          <span>
            <strong>{SITE.name}</strong>
            <small>{SITE.nameHi}</small>
          </span>
        </a>
        <nav className={`nav ${open ? "open" : ""}`} aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href="#membership" className="btn btn-primary btn-sm" onClick={() => setOpen(false)}>Apply for Membership</a>
        </nav>
        <button className={`burger ${open ? "open" : ""}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
