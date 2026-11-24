import * as React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.ComponentProps<'span'> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(
        'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variant === 'default' && 'border-transparent bg-primary text-primary-foreground',
        variant === 'secondary' && 'border-transparent bg-secondary text-secondary-foreground',
        variant === 'outline' && 'text-foreground',
        variant === 'destructive' && 'border-transparent bg-destructive text-white',
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
