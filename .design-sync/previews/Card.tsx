import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from "@sjhamill/ui";

export function BasicCard() {
  return (
    <Card style={{ maxWidth: 380 }}>
      <CardHeader>
        <CardTitle>Project Summary</CardTitle>
        <CardDescription>Q3 2026 direct cost overview for all active jobs.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="text-sm text-muted-foreground">Total Costs</span>
            <span className="text-sm font-semibold tabular-nums">$1,234,567.89</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="text-sm text-muted-foreground">Transactions</span>
            <span className="text-sm font-semibold tabular-nums">3,486</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="text-sm text-muted-foreground">Open Items</span>
            <span className="text-sm font-semibold tabular-nums">12</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">View Details</Button>
      </CardFooter>
    </Card>
  );
}

export function MinimalCard() {
  return (
    <Card style={{ maxWidth: 380 }}>
      <CardContent style={{ paddingTop: 24 }}>
        <p className="text-sm text-muted-foreground">
          A card with content only — no header or footer.
        </p>
      </CardContent>
    </Card>
  );
}
