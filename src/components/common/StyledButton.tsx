import { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "classnames";

type StyledButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export default function StyledButton({
  children,
  className,
  ...rest
}: StyledButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 border-none hover:cursor-pointer text-sm",
        className
      )}
    >
      {children}
    </button>
  );
}
