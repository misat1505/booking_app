import { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "classnames";

type StyledButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "nav";
};

export default function StyledButton({
  children,
  className,
  variant,
  ...rest
}: StyledButtonProps) {
  const baseStyles = (): string => {
    if (variant === "nav")
      return "flex items-center gap-2 bg-slate-100 p-3 rounded-md hover:bg-slate-200 hover:cursor-pointer font-semibold";
    return "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 border-none hover:cursor-pointer text-sm";
  };

  return (
    <button {...rest} className={cn(baseStyles(), className)}>
      {children}
    </button>
  );
}
