import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import cn from "classnames";

type StyledLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
};

export default function StyledLink({
  children,
  className,
  ...rest
}: StyledLinkProps) {
  return (
    <Link
      {...rest}
      className={cn(
        "px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white text-sm text-center",
        className
      )}
    >
      {children}
    </Link>
  );
}
