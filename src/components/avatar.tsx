import { cn, TABLEAU_10 } from "../lib/utils";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

const SIZE_CLASSES: Record<AvatarSize, string> = {
  sm: "h-6 w-6 text-[9px]",
  md: "h-7 w-7 text-[10px]",
  lg: "h-8 w-8 text-xs",
  xl: "h-14 w-14 text-xl",
};

export interface AvatarProps {
  initials: string;
  /** Explicit background color. If omitted, a deterministic color is picked from TABLEAU_10 based on the initials. */
  color?: string;
  size?: AvatarSize;
  className?: string;
}

function pickColor(initials: string): string {
  let hash = 0;
  for (let i = 0; i < initials.length; i += 1) {
    hash = (hash * 31 + initials.charCodeAt(i)) >>> 0;
  }
  return TABLEAU_10[hash % TABLEAU_10.length];
}

/**
 * Circular initials avatar. Used inside AccountCard, ViewAsPicker rows, and
 * TeamRolesTable rows. Color defaults to a deterministic pick from TABLEAU_10
 * so the same person renders the same color everywhere without any config.
 */
export function Avatar({ initials, color, size = "md", className }: AvatarProps) {
  const bg = color ?? pickColor(initials);
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-bold text-white",
        SIZE_CLASSES[size],
        className,
      )}
      style={{ backgroundColor: bg }}
      aria-hidden
    >
      {initials}
    </div>
  );
}
