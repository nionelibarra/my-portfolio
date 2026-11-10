"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, Briefcase, Check, Copy, Loader2, Mail, MessageCircle, Phone, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { SocialMediaAccount } from "@/app/lib/interface";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  
  /* Dynamic Variables using standard shadcn/tailwind v4 tokens */
  --pill-bg-1: color-mix(in oklch, var(--foreground) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 8%, transparent);
  
  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px color-mix(in oklch, var(--destructive) 50%, transparent)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px color-mix(in oklch, var(--destructive) 80%, transparent)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

/* Theme-adaptive Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    color-mix(in oklch, var(--primary) 15%, transparent) 0%, 
    color-mix(in oklch, var(--secondary) 15%, transparent) 40%, 
    transparent 70%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--foreground) 5%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--foreground) 10%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Primary CTA - stands out against the glass pills */
@keyframes footer-cta-glow {
  0%, 100% { box-shadow: 0 10px 40px -10px color-mix(in oklch, var(--primary) 55%, transparent), inset 0 1px 1px color-mix(in oklch, var(--background) 30%, transparent); }
  50% { box-shadow: 0 10px 55px -5px color-mix(in oklch, var(--primary) 80%, transparent), inset 0 1px 1px color-mix(in oklch, var(--background) 30%, transparent); }
}

.footer-cta-primary {
  background: linear-gradient(145deg, color-mix(in oklch, var(--primary) 80%, var(--foreground)) 0%, var(--primary) 100%);
  color: var(--primary-foreground);
  border: 1px solid color-mix(in oklch, var(--primary) 60%, var(--foreground));
  box-shadow: 0 10px 40px -10px color-mix(in oklch, var(--primary) 55%, transparent), inset 0 1px 1px color-mix(in oklch, var(--background) 30%, transparent);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  animation: footer-cta-glow 3s ease-in-out infinite;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-cta-primary:hover {
  filter: brightness(1.15);
  border-color: color-mix(in oklch, var(--primary) 80%, var(--foreground));
}

/* Breathing CTA - glowing border pulse */
@keyframes footer-cta-breathe {
  0%, 100% {
    box-shadow:
      0 0 20px -5px color-mix(in oklch, var(--primary) 45%, transparent),
      inset 0 1px 1px color-mix(in oklch, var(--background) 30%, transparent);
    border-color: color-mix(in oklch, var(--primary) 45%, var(--foreground));
  }
  50% {
    box-shadow:
      0 0 50px 0px color-mix(in oklch, var(--primary) 80%, transparent),
      inset 0 1px 1px color-mix(in oklch, var(--background) 30%, transparent);
    border-color: color-mix(in oklch, var(--primary) 90%, var(--foreground));
  }
}

.footer-cta-breathe {
  background: linear-gradient(145deg, color-mix(in oklch, var(--primary) 80%, var(--foreground)) 0%, var(--primary) 100%);
  color: var(--primary-foreground);
  border: 2px solid color-mix(in oklch, var(--primary) 45%, var(--foreground));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  animation: footer-cta-breathe 3s ease-in-out infinite;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-cta-breathe:hover {
  filter: brightness(1.15);
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 40%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in oklch, var(--foreground) 15%, transparent));
  /* keep composited - fixes clipped text vanishing on browser tab restore */
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translateZ(0);
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE (Zero Dependency)
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    },[]);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. COPY FIELD PRIMITIVE
// -------------------------------------------------------------------------
function CopyField({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable (e.g. non-secure context) - no-op
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/30 px-4 py-3">
      <div className="min-w-0 flex items-center gap-3">
        <Icon className="w-5 h-5 shrink-0 text-muted-foreground" />
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {label}
          </p>
          <p className="text-base font-semibold truncate">{value}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
      >
        {copied ? <Check className="w-5 h-5 text-primary" /> : <Copy className="w-5 h-5" />}
      </button>
    </div>
  );
}

// -------------------------------------------------------------------------
// 4. MAIN COMPONENT
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>AI Engineering</span> <span className="text-primary/60">✦</span>
    <span>Tech Solutions</span> <span className="text-secondary/60">✦</span>
    <span>Rapid Prototyping</span> <span className="text-primary/60">✦</span>
    <span>Production-Ready Builds</span> <span className="text-secondary/60">✦</span>
    <span>Full-Stack Delivery</span> <span className="text-primary/60">✦</span>
  </div>
);

export function CinematicFooter({
  socials = [],
}: {
  socials?: SocialMediaAccount[];
}) {
  const [qrOpen, setQrOpen] = useState(false);
  const [qrLoaded, setQrLoaded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    // React strict mode compatible GSAP context cleanup
    const ctx = gsap.context(() => {
      // Background Parallax - plays once when footer enters view
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          duration: 1.4,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Staggered Content Reveal - plays once, stays visible
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          duration: 1,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        }
      );

      ScrollTrigger.refresh();
    }, wrapperRef);

    // Repaint on tab restore - fixes background-clip:text / backdrop-filter
    // elements disappearing until the next scroll-forced repaint
    const handleVisibility = () => {
      if (document.visibilityState !== 'visible') return;
      ScrollTrigger.refresh();
      const el = wrapperRef.current;
      if (el) {
        el.style.display = 'none';
        void el.offsetHeight;
        el.style.display = '';
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      ctx.revert();
    };
  },[]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* 
        The "Curtain Reveal" Wrapper:
        It sits in standard flow. Because it has clip-path, its contents
        are ONLY visible within its bounding box. 
      */}
      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        {/* The actual footer stays fixed to the viewport underneath everything */}
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-background/80 text-foreground cinematic-footer-wrapper">
          
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            THAT1
          </div>

          {/* 1. Diagonal Sleek Marquee (Top of footer) */}
          <div className="absolute top-12 left-0 w-full overflow-hidden border-y border-border/50 bg-background/60 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-muted-foreground uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20 w-full max-w-5xl mx-auto">
            <h2
              ref={headingRef}
              className="text-5xl md:text-8xl font-black footer-text-glow tracking-tighter mb-12 text-center"
            >
              Let&apos;s build it.
            </h2>

            {/* Interactive Magnetic Pills Layout */}
            <div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
              {/* Tagline */}
              <p className="text-xl md:text-3xl font-bold tracking-tight text-center max-w-2xl leading-snug">
                We not only build what you want —{" "}
                <span className="text-primary">but what you need.</span>
              </p>

              {/* Secondary CTA */}
              <div className="flex flex-wrap justify-center gap-4 w-full mt-2">
                <MagneticButton as="a" href="/company/portfolio" className="footer-cta-breathe px-10 py-5 rounded-full font-extrabold text-base md:text-lg flex items-center gap-3 group">
                  <Briefcase className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" />
                  Projects we&apos;ve worked on
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Copyright */}
            <div className="text-muted-foreground text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1">
              © 2026 That1 Tech Company. All rights reserved.
            </div>

          

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-muted-foreground hover:text-foreground group order-3"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </MagneticButton>

          </div>
        </footer>
      </div>

      {/* Floating scroll-up assist - only visible after scrolling down */}
      {showScrollTop && (
        <MagneticButton
          as="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="footer-glass-pill fixed bottom-[4.75rem] right-5 md:bottom-[6rem] md:right-8 z-40 w-11 h-11 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground opacity-80 hover:opacity-100 transition-opacity"
        >
          <ArrowUp className="w-5 h-5 animate-bounce" />
        </MagneticButton>
      )}

      {/* Floating Lets Talk CTA - always reachable, slightly transparent */}
      <MagneticButton
        as="button"
        onClick={() => setQrOpen(true)}
        aria-label="Lets Talk — open contact info"
        className="footer-cta-primary fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 px-6 py-3.5 md:px-8 md:py-4 rounded-full font-extrabold text-sm md:text-base flex items-center gap-2.5 opacity-80 hover:opacity-100 transition-opacity group"
      >
        <MessageCircle className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity" />
        Lets Talk
      </MagneticButton>

      {/* Contact QR Modal - themed to match /company (dark) */}
      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="dark sm:max-w-md bg-background text-foreground border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
               Scan with your phones camera to get in touch
            </DialogTitle>
          </DialogHeader>
          <div className="relative flex justify-center py-4">
            {!qrLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            )}
            <Image
              src="/hovercode.png"
              alt="QR code — scan to get in touch"
              width={240}
              height={240}
              onLoad={() => setQrLoaded(true)}
              className={cn(
                "rounded-lg transition-opacity duration-300",
                qrLoaded ? "opacity-100" : "opacity-0"
              )}
            />
          </div>
          <div className="flex flex-col gap-2 pb-2">
            <CopyField label="Name" value="Nionel Ibarra" icon={User} />
            <CopyField label="Number" value="0966-761-3721" icon={Phone} />
            <CopyField label="Email" value="nionelibarra@gmail.com" icon={Mail} />
          </div>
          {socials.length > 0 && (
            <div className="flex items-center justify-center gap-3 pb-2">
              {socials.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${item.socialmedianame} — ${item.username}`}
                  className="footer-glass-pill flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                >
                  <span className="flex h-6 w-6 items-center justify-center">
                    <Image
                      src={item.imageUrl}
                      alt={item.socialmedianame}
                      width={24}
                      height={24}
                      className="max-h-full max-w-full object-contain"
                    />
                  </span>
                </a>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
