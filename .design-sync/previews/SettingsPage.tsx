import React from "react";
import {
  SettingsPage,
  SettingsSection,
  SettingsToggle,
  SettingsSelectRow,
  AboutCard,
  AccountCard,
  TeamRolesTable,
} from "@sjhamill/ui";

export function FullPage() {
  return (
    <div style={{ maxWidth: 720, border: "1px solid hsl(215 20% 86%)", borderRadius: 8, overflow: "hidden" }}>
      <SettingsPage>
        <SettingsSection title="Account" description="Your identity and sign-in method.">
          <AccountCard email="vvelez@sjhamill.com" role="admin" avatarInitials="VB" authProvider="Google" />
        </SettingsSection>

        <SettingsSection
          title="Team & Roles"
          accessory={<span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Admin Only</span>}
          bodyFlush
        >
          <TeamRolesTable
            members={[
              { id: "1", name: "Jake Daniels", email: "jake.daniels@sjhamill.com", role: "pm", initials: "JD", projectsLabel: "4 assigned", lastActive: "2 min ago" },
              { id: "2", name: "Maria Kim", email: "maria.kim@sjhamill.com", role: "viewer", initials: "MK", projectsLabel: "All (17)", lastActive: "1 hr ago" },
            ]}
          />
        </SettingsSection>

        <SettingsSection title="Preferences" description="Defaults applied across the app.">
          <SettingsToggle
            label="Dark Mode"
            description="Use the dark palette by default."
            checked={false}
            onChange={() => {}}
          />
          <SettingsSelectRow
            label="Default Landing Page"
            value="dashboard"
            options={[
              { value: "dashboard", label: "Dashboard" },
              { value: "transactions", label: "Transactions" },
            ]}
            onChange={() => {}}
          />
        </SettingsSection>

        <AboutCard
          appName="Direct Costs"
          version="2.4.0"
          links={[
            { label: "Changelog", href: "#" },
            { label: "Support", href: "#" },
          ]}
        />
      </SettingsPage>
    </div>
  );
}
