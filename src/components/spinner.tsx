import { cn } from '../utils/style';
import { cva, VariantProps } from 'class-variance-authority';

const spinnerVariants = cva(
  'animate-spin rounded-full border-solid border-t-transparent',
  {
    variants: {
      size: {
        sm: 'h-4 w-4 border-2',
        md: 'h-6 w-6 border-2',
        lg: 'h-8 w-8 border-3',
        xl: 'h-12 w-12 border-4',
      },
      variant: {
        primary: 'border-arvox-blue-light-1',
        secondary: 'border-white',
        accent: 'border-arvox-blue-darker',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
  }
);

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

export function Spinner({ size, variant, className }: SpinnerProps) {
  return (
    <div 
      className={cn(spinnerVariants({ size, variant }), className)}
      role="status"
      aria-label="Chargement en cours"
    >
      <span className="sr-only">Chargement...</span>
    </div>
  );
}

interface LoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export function Loader({ isLoading, children, fallback, className }: LoaderProps) {
  if (isLoading) {
    return (
      <div className={cn('flex items-center justify-center p-4', className)}>
        {fallback || <Spinner />}
      </div>
    );
  }

  return <>{children}</>;
}
