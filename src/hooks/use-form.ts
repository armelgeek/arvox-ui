import { useForm, UseFormReturn, FieldValues, UseFormProps, DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface UseFormWithSchemaProps<T extends FieldValues> extends Omit<UseFormProps<T>, 'resolver'> {
  schema: z.ZodType<T>;
}

export function useFormWithSchema<T extends FieldValues>(props: UseFormWithSchemaProps<T>): UseFormReturn<T> {
  const { schema, ...formProps } = props;
  
  return useForm<T>({
    ...formProps,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    mode: formProps.mode || 'onChange'
  });
}

export function useFormWithValidation<T extends FieldValues>(
  schema: z.ZodType<T>,
  defaultValues?: DefaultValues<T>
): UseFormReturn<T> {
  return useForm<T>({
    defaultValues,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    mode: 'onChange'
  });
}

// Alternative plus simple pour éviter les problèmes de typage
export function useZodForm<T extends FieldValues>(
  schema: z.ZodType<T>,
  options?: Omit<UseFormProps<T>, 'resolver'>
) {
  return useForm<T>({
    ...options,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    mode: options?.mode || 'onChange'
  });
}
