import * as React from "react";
import logoDark from "../assets/sj-hamill-logo.png";
import logoWhite from "../assets/sjh-extended-logo-white.png";

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  dark?: boolean;
}

export const Logo = React.forwardRef<HTMLImageElement, LogoProps>(
  ({ dark = false, className, alt = "SJ Hamill Construction", ...props }, ref) => (
    <img
      ref={ref}
      src={dark ? logoWhite : logoDark}
      alt={alt}
      className={className}
      {...props}
    />
  ),
);
Logo.displayName = "Logo";
