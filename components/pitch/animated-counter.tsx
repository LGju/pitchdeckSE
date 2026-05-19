"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
  from?: number
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 1800,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: Props) {
  const [value, setValue] = useState(from)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true
            const start = performance.now()
            const step = (now: number) => {
              const t = Math.min(1, (now - start) / duration)
              const eased = 1 - Math.pow(1 - t, 3)
              setValue(from + (to - from) * eased)
              if (t < 1) requestAnimationFrame(step)
              else setValue(to)
            }
            requestAnimationFrame(step)
          }
        })
      },
      { threshold: 0.3 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [from, to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  )
}
