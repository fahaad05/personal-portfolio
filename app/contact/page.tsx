"use client";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Card } from "../components/card";
import { Navigation } from "../components/nav";

type Social = {
  icon: React.ReactNode;
  href: string;
  label: "Email" | "LinkedIn" | "Github" | "Book a call";
  handle: string;
  external?: boolean;
  copyable?: boolean;
};

const socials: Social[] = [
  {
    icon: <Linkedin size={20} />,
    href: "https://www.linkedin.com/in/fahaad05/",
    label: "LinkedIn",
    handle: "fahaad05",
    external: true,
  },
  {
    icon: <Mail size={20} />,
    href: "mailto:fa9777@proton.me?subject=Hello%20Fahaad&body=Hi%20Fahaad%2C%0A",
    label: "Email",
    handle: "fa9777@proton.me",
    copyable: true,
  },
  {
    icon: <Github size={20} />,
    href: "https://github.com/fahaad05",
    label: "Github",
    handle: "fahaad05",
    external: true,
  },
];

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await navigator.clipboard.writeText("fa9777@proton.me");
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />

      {copied && (
        <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-md bg-white/10 px-4 py-2 text-sm text-white shadow backdrop-blur">
          Copied to clipboard
        </div>
      )}
      <div aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </div>

      <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
        <div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16">
          {socials.map((s) => (
            <Card>
              <Link
                href={s.href}
                target="_blank"
                className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16"
              >
                <span
                  className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                  aria-hidden="true"
                />
                <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
                  {s.icon}
                </span>{" "}
                <div className="z-10 flex flex-col items-center">
                  <span className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display">
                    {s.handle}
                  </span>
                  <span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
                    {s.label}
                  </span>

                  {s.copyable && (
                    <button
                      type="button"
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        await navigator.clipboard.writeText("fa9777@proton.me");
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1200);
                      }}
                      className="mt-2 inline-flex items-center justify-center rounded-md bg-white/30 px-3 py-1 text-xs text-white hover:bg-white/40"
                      aria-label="Copy email"
                    >
                      Copy Email
                    </button>
                  )}
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
