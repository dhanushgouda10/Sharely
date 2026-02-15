import { cn } from '../../lib/utils';

export function Button({ className, variant = 'default', size = 'default', ...props }) {
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-button font-medium',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border-2 border-foreground/20 bg-background text-foreground hover:bg-muted hover:border-foreground/30',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
    destructive: 'bg-destructive text-white hover:bg-destructive/90',
  };
  const sizes = {
    default: 'h-10 px-5 py-2',
    sm: 'h-9 rounded-xl px-3',
    lg: 'h-11 rounded-xl px-8',
    icon: 'h-10 w-10',
  };
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
