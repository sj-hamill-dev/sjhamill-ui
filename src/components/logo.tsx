import * as React from "react";

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  dark?: boolean;
  lightSrc?: string;
  darkSrc?: string;
}

export const Logo = React.forwardRef<HTMLImageElement, LogoProps>(
  (
    {
      dark = false,
      lightSrc = "/sj-hamill-logo.png",
      darkSrc = "/sjh-extended-logo-white.png",
      className,
      alt = "SJ Hamill Construction",
      ...props
    },
    ref,
  ) => (
    <img
      ref={ref}
      src={dark ? darkSrc : lightSrc}
      alt={alt}
      className={className}
      {...props}
    />
  ),
);
Logo.displayName = "Logo";
