import Image from "next/image"
import { cn } from "@/lib/utils"

type Size = "sm" | "md" | "lg" | "xl"

// Map the original text-size API to pixel heights so the real PNG lockup
// renders at roughly the same visual weight wherever <Wordmark /> was used.
const SIZE: Record<Size, string> = {
  sm: "h-6", // 24px — header / footer
  md: "h-8", // 32px — default
  lg: "h-10 sm:h-12", // 40→48px — section marks
  xl: "h-12 sm:h-16", // 48→64px — hero
}

/**
 * Autofox wordmark — renders the official brand lockup (dark "auto" + pink
 * "fox" + geometric fox-head mark) from /public/autofox-logo.png.
 *
 * The `tone` prop is kept for API compatibility with existing callers; the
 * "light" variant applies a brightness filter so the dark half of the
 * wordmark stays legible on inverted slides.
 */
export function Wordmark({
  size = "md",
  className,
  tone = "dark",
}: {
  size?: Size
  className?: string
  /** `light` inverts the dark ink of "auto" so it reads on dark backgrounds */
  tone?: "dark" | "light"
}) {
  return (
    <Image
      src="/autofox-logo.png"
      alt="autofox"
      width={1200}
      height={320}
      priority
      className={cn(
        "w-auto select-none",
        SIZE[size],
        tone === "light" && "brightness-0 invert",
        className,
      )}
    />
  )
}

/** Compact icon for favicons / avatars — gradient-filled "A" tile. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="af-mark-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E40E41" />
          <stop offset="100%" stopColor="#FF5078" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="8" fill="url(#af-mark-grad)" />
      <path
        d="M10 22 L16 10 L22 22 M12.5 17.5 H19.5"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
