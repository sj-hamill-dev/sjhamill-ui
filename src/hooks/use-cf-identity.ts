import { useState, useEffect } from "react";

export interface CfIdentity {
  email: string;
  name?: string;
  initials: string;
}

function initialsFrom(email: string): string {
  const local = email.split("@")[0] ?? "";
  const parts = local.split(/[._-]/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return local.slice(0, 2).toUpperCase();
}

/**
 * Fetch the authenticated user's identity from Cloudflare Access.
 *
 * All SJ Hamill apps sit behind Cloudflare Access, which exposes
 * `/cdn-cgi/access/get-identity`. This hook fetches it on mount and
 * returns `{ email, name, initials }`. Returns `null` while loading.
 */
export function useCfIdentity(): CfIdentity | null {
  const [identity, setIdentity] = useState<CfIdentity | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/cdn-cgi/access/get-identity")
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`);
        return res.json();
      })
      .then((data: unknown) => {
        if (!cancelled) {
          const { email: rawEmail, name } = data as {
            email?: string;
            name?: string;
          };
          const email: string = rawEmail ?? "unknown";
          setIdentity({ email, name, initials: initialsFrom(email) });
        }
      })
      .catch(() => {
        if (!cancelled) setIdentity({ email: "unknown", initials: "??" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return identity;
}
