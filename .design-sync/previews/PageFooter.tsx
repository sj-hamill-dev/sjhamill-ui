import React from "react";
import { PageFooter } from "@sjhamill/ui";

export function Default() {
  return (
    <div style={{ maxWidth: 640 }}>
      <PageFooter />
    </div>
  );
}

export function CustomCredit() {
  return (
    <div style={{ maxWidth: 640 }}>
      <PageFooter company="SJ Hamill Construction" credit="Built by the Dev Roadmap team" />
    </div>
  );
}
