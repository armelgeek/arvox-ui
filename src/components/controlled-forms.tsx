import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Input } from './input';
import { useController } from 'react-hook-form';
import { ComponentProps } from 'react';

interface ControlledInputProps<T extends FieldValues> extends Omit<ComponentProps<typeof Input>, 'name'> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
}

export function ControlledInput<T extends FieldValues>({
  name,
  control,
  label,
  ...inputProps
}: ControlledInputProps<T>) {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control
  });

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-white">
          {label}
        </label>
      )}
      <Input
        {...field}
        {...inputProps}
        error={!!error}
      />
      {error && (
        <p className="text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}

interface ControlledTextareaProps<T extends FieldValues> extends Omit<ComponentProps<'textarea'>, 'name'> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
}

export function ControlledTextarea<T extends FieldValues>({
  name,
  control,
  label,
  className,
  ...textareaProps
}: ControlledTextareaProps<T>) {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control
  });

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-white">
          {label}
        </label>
      )}
      <textarea
        {...field}
        {...textareaProps}
        className={`w-full px-3 py-2 border rounded-lg bg-arvox-blue-transparent-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-arvox-primary ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className || ''}`}
      />
      {error && (
        <p className="text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}
