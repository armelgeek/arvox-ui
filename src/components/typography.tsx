import { ComponentProps } from 'react';
import { cn } from '../utils/style';

interface TypographyProps extends ComponentProps<'p'> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'caption';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: 'default' | 'primary' | 'secondary' | 'muted' | 'white' | 'error';
  align?: 'left' | 'center' | 'right' | 'justify';
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}

export function Typography({
  as: Component = 'p',
  variant = 'body',
  weight = 'normal',
  color = 'default',
  align = 'left',
  transform = 'none',
  className,
  children,
  ...props
}: TypographyProps) {
  const variantClasses = {
    h1: 'text-4xl md:text-5xl lg:text-6xl',
    h2: 'text-3xl md:text-4xl lg:text-5xl',
    h3: 'text-2xl md:text-3xl lg:text-4xl',
    h4: 'text-xl md:text-2xl lg:text-3xl',
    h5: 'text-lg md:text-xl lg:text-2xl',
    h6: 'text-base md:text-lg lg:text-xl',
    body: 'text-base',
    small: 'text-sm',
    caption: 'text-xs'
  };

  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold'
  };

  const colorClasses = {
    default: 'text-gray-900',
    primary: 'text-arvox-primary',
    secondary: 'text-arvox-secondary',
    muted: 'text-gray-500',
    white: 'text-white',
    error: 'text-red-500'
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  };

  const transformClasses = {
    none: '',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize'
  };

  return (
    <Component
      className={cn(
        variantClasses[variant],
        weightClasses[weight],
        colorClasses[color],
        alignClasses[align],
        transformClasses[transform],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
