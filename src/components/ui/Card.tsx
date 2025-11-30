import * as React from "react"

// If you have a cn() utility from shadcn/ui, import it.
// Otherwise you can remove it and use simple string concatenation.
// import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-lg border border-border bg-card text-card-foreground ${className}`}
        {...props}
      />
    )
  }
)

Card.displayName = "Card"

export { Card }
