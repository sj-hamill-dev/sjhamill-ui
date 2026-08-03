import React from "react";
import { ChartLegend } from "@sjhamill/ui";

export function WithValues() {
  return (
    <div style={{ maxWidth: 280 }}>
      <ChartLegend
        title="Cost Breakdown"
        items={[
          { label: "Payroll", color: "#4E79A7", value: "$456,789" },
          { label: "Invoices", color: "#F28E2B", value: "$312,450" },
          { label: "Expenses", color: "#76B7B2", value: "$89,120" },
        ]}
      />
    </div>
  );
}

export function LabelsOnly() {
  return (
    <div style={{ maxWidth: 280 }}>
      <ChartLegend
        items={[
          { label: "Posted", color: "#1f9d55" },
          { label: "Pending", color: "#d97706" },
          { label: "Failed", color: "#dc2626" },
          { label: "Skipped", color: "#d1dae5" },
        ]}
      />
    </div>
  );
}
