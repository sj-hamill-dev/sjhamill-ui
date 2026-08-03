import React from "react";
import { AlertBanner } from "@sjhamill/ui";

export function Warning() {
  return (
    <div style={{ maxWidth: 560 }}>
      <AlertBanner tone="warning" actionLabel="Review →" onAction={() => {}}>
        <strong>12 transactions</strong> are pending approval before month-end close.
      </AlertBanner>
    </div>
  );
}

export function Destructive() {
  return (
    <div style={{ maxWidth: 560 }}>
      <AlertBanner tone="destructive" actionLabel="View Errors →" onAction={() => {}}>
        <strong>3 items</strong> failed to sync from Procore.
      </AlertBanner>
    </div>
  );
}

export function Info() {
  return (
    <div style={{ maxWidth: 560 }}>
      <AlertBanner tone="info">
        Last synced 2 hours ago — all transactions posted successfully.
      </AlertBanner>
    </div>
  );
}
