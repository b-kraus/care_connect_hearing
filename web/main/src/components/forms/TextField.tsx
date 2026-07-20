import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "../../lib/utils";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  helperText?: string;
  errorMessage?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id,
      label,
      helperText,
      errorMessage,
      startIcon,
      endIcon,
      className,
      disabled,
      required,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const helperId = helperText ? `${inputId}-helper` : undefined;
    const errorId = errorMessage ? `${inputId}-error` : undefined;

    const describedBy =
      [helperId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="flex w-full flex-col gap-2">
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-text"
        >
          {label}

          {required && (
            <span className="ml-1 text-error" aria-hidden="true">
              *
            </span>
          )}
        </label>

        <div className="relative">
          {startIcon && (
            <span
              className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-white/60"
              aria-hidden="true"
            >
              {startIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={errorMessage ? true : undefined}
            aria-describedby={describedBy}
            className={cn(
              "min-h-12 w-full rounded-md border bg-surface px-4 py-3 text-base text-text",
              "placeholder:text-white/50",
              "transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              "disabled:cursor-not-allowed disabled:opacity-50",
              startIcon && "pl-12",
              endIcon && "pr-12",
              errorMessage
                ? "border-error"
                : "border-white/30 hover:border-white/50",
              className,
            )}
            {...props}
          />

          {endIcon && (
            <span className="absolute inset-y-0 right-4 flex items-center text-white/60">
              {endIcon}
            </span>
          )}
        </div>

        {helperText && (
          <p id={helperId} className="text-sm text-white/60">
            {helperText}
          </p>
        )}

        {errorMessage && (
          <p id={errorId} className="text-sm font-medium text-error">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";

export { TextField };