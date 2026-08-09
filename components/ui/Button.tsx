import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "solid" | "outline" | "ghost";
type ButtonSize = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  solid:
    "bg-btn-bg text-btn-text hover:bg-btn-bg-hover active:bg-btn-bg-active disabled:bg-btn-bg-disabled disabled:text-btn-text-disabled",
  outline:
    "border border-text-primary text-text-primary hover:bg-text-primary hover:text-bg disabled:border-text-disabled disabled:text-text-disabled",
  ghost: "text-text-primary hover:underline disabled:text-text-disabled",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2",
  md: "px-6 py-3",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "solid", size = "md", className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`text-button focus-visible:outline-accent-gold inline-flex items-center justify-center transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
