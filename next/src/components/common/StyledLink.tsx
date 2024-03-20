import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import cn from "classnames";

type StyledLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "nav";
};

export default function StyledLink({
  children,
  className,
  variant,
  ...rest
}: StyledLinkProps) {
  const baseStyles = (): string => {
    if (variant === "nav")
      return "flex items-center gap-2 bg-slate-100 p-3 rounded-md hover:bg-slate-200 mb-3 font-semibold";
    return "px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white text-sm text-center";
  };

  return (
    <Link {...rest} className={cn(baseStyles(), className)}>
      {children}
    </Link>
  );
}
