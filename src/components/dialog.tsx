import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';
import { cn } from '../utils/style';

interface DialogProps {
  children: ReactNode;
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DialogRoot({ children, trigger, open, onOpenChange }: DialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <Dialog.Trigger asChild>
          {trigger}
        </Dialog.Trigger>
      )}
      {children}
    </Dialog.Root>
  );
}

interface DialogContentProps {
  children: ReactNode;
  className?: string;
  showClose?: boolean;
}

export function DialogContent({ children, className, showClose = true }: DialogContentProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
      <Dialog.Content 
        className={cn(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-0 rounded-md shadow-xl z-50 w-[90%] max-w-md",
          className
        )}
      >
        {showClose && (
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer z-10"
              aria-label="Fermer"
            >
              ✕
            </button>
          </Dialog.Close>
        )}
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}

interface DialogHeaderProps {
  children: ReactNode;
  className?: string;
}

export function DialogHeader({ children, className }: DialogHeaderProps) {
  return (
    <div className={cn("bg-arvox-blue-transparent-2 py-4 px-5 rounded-tl-2xl rounded-tr-2xl", className)}>
      {children}
    </div>
  );
}

interface DialogBodyProps {
  children: ReactNode;
  className?: string;
}

export function DialogBody({ children, className }: DialogBodyProps) {
  return (
    <div className={cn("w-full p-5", className)}>
      {children}
    </div>
  );
}

interface DialogFooterProps {
  children: ReactNode;
  className?: string;
}

export function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div className={cn("w-full p-5 rounded-bl-2xl rounded-br-2xl", className)}>
      {children}
    </div>
  );
}

export const DialogClose = Dialog.Close;
export const DialogTitle = Dialog.Title;
export const DialogDescription = Dialog.Description;
