import { cn } from "@/lib/utils"

export function SectionLabel({
  children,
  number,
  className,
}: {
  children: React.ReactNode
  number?: string
  className?: string
}) {
  return (
    <div className={cn("inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em]", className)}>
      {number && (
        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-primary/40 text-primary">
          {number}
        </span>
      )}
      <span className="text-muted-foreground">{children}</span>
      <span className="h-px w-10 bg-gradient-to-r from-primary/60 to-transparent" aria-hidden="true" />
    </div>
  )
}
