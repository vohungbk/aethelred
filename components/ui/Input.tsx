import { type InputHTMLAttributes, forwardRef, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hideLabel?: boolean;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hideLabel = false, error, id, className = "", ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className={`text-meta text-text-secondary ${hideLabel ? "sr-only" : ""}`}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={`text-body border-border bg-input-bg text-text-primary placeholder:text-text-muted focus-visible:outline-accent-gold border px-4 py-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
          {...props}
        />
        {error && (
          <p id={errorId} role="alert" aria-live="polite" className="text-meta text-status-error">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
