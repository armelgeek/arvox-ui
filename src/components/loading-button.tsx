// Loading Button component with different states
import { cn } from '../utils/style';
import { ComponentPropsWithoutRef } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

type LoadingButtonProps = ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
    loadingText?: string;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'normal' | 'large';
  };

export function LoadingButton({
  children,
  isLoading = false,
  loadingText = 'Chargement...',
  variant = 'primary',
  size = 'normal',
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {isLoading ? loadingText : children}
    </button>
  );
}

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-arvox-primary hover:bg-arvox-primary/90 text-white",
        secondary: "bg-arvox-secondary hover:bg-arvox-secondary/90 text-white",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-50"
      },
      size: {
        small: "h-8 px-3 text-sm",
        normal: "h-10 px-4 py-2",
        large: "h-12 px-8 text-lg"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "normal"
    }
  }
);
