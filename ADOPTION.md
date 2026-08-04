# Adoption checklist

Follow this to integrate `@sjhamill/ui`'s shared shell into a consumer app. Copy this checklist into your PR body — reviewers should be able to tick every box.

**Goal:** every SJ Hamill internal app has the same sidebar chrome (logo, "Back to Tools" link, nav items with icons, footer with Settings + dark-mode + email), the same page-header pattern, and the same `/settings` route. Only `navItems` and the page content differ per app.

---

## 0. Prep

- [ ] The `sync-sjhamill-ui.yml` bump PR has merged in this repo (or you've run `npm update @sjhamill/ui` manually). Confirm `node_modules/@sjhamill/ui/src/components/app-shell.tsx` exists.
- [ ] `npm ci` cleanly.
- [ ] Skim [CLAUDE.md](CLAUDE.md) in `sjhamill-ui` — especially "Load-bearing invariants". You'll need it during code review.

## 1. Shell

Replace the hand-rolled sidebar/layout with `AppShell` at the root of your routed app.

- [ ] Import `AppShell`, `SidebarFooter`, `useDarkMode` from `@sjhamill/ui`.
- [ ] Wrap the app root (usually `<App />` or the route layout) in `<AppShell>`.
- [ ] Set `appName` — the visible name shown next to the logo. Sentence case, ≤ 24 chars ("Direct Costs", "Commitments", "Vendor Analytics").
- [ ] Set `toolsHomeUrl` to the tools-homepage URL. Coordinate with the tools-homepage owner if you don't know it.
- [ ] Pass `linkComponent={Link}` — where `Link` is your router's link component (e.g. `react-router-dom` `Link`). Same `Link` gets passed to `<SidebarFooter linkComponent={Link} />` too — one prop, both surfaces.
- [ ] Delete the old sidebar / top-level layout component and its stylesheet.

## 2. Nav items

Build the `navItems` array. Keep it short and label-first.

- [ ] 4–6 items max. Construction users don't memorize icon-only rails.
- [ ] Every item has `label`, `href`, `active` (compute from current route).
- [ ] Add an `icon: <YourIcon />` per item. When any item has an icon, add one to every item so the visual rhythm stays consistent.
- [ ] **Do NOT** add a Settings entry to `navItems`. Settings lives in `SidebarFooter` (see step 3). Adding it in both places is a common mistake.

## 3. Sidebar footer

Standard footer across every app.

- [ ] Render `<SidebarFooter>` and pass it into `AppShell`'s `sidebarFooter` prop.
- [ ] Wire `userEmail` from your auth state (Google SSO / whatever the app uses).
- [ ] Wire `dark` and `onToggleDark` from `useDarkMode()`.
- [ ] Pass `linkComponent={Link}` — same one you passed to `AppShell`.
- [ ] Leave `settingsHref` as the default (`/settings`) unless you have a very good reason not to.
- [ ] Optional: put a "Help" or app-specific link inside `<SidebarFooter>` as children.

## 4. Page chrome

Standardize how pages announce themselves.

- [ ] Wrap the top of every page with `<PageHeader title="..." subtitle="..." actions={<...>} />`.
- [ ] Delete per-page hand-rolled headers.
- [ ] KPI tiles use `<KpiCard>`.
- [ ] Status pills use `<StatusBadge>` or `<Badge variant="...">` — never raw `<span>` with brand colors.

## 5. Settings route

Add a `/settings` route rendering `<SettingsPage>` with the sections that apply to this app. Not every app needs every section.

- [ ] Route registered: `/settings` → your `<SettingsRoute />` component.
- [ ] `<SettingsPage title="Settings" subtitle="Manage your account, team access, and app preferences.">` at the outer layer.
- [ ] **Your Account** section: `<SettingsSection title="Your Account">` containing `<AccountCard email={...} role={...} avatarInitials={...} authProvider="Google" />`.
- [ ] **View As** section (admin-only): `<SettingsSection title="View As" description="..." accessory={<Badge variant="secondary">Admin Only</Badge>}>` containing `<ViewAsPicker self={...} currentTarget={...} targets={...} onSelect={...} onExit={...} />`.
- [ ] **Team & Roles** section (admin-only): `<SettingsSection title="Team & Roles" ... accessory={<Badge variant="secondary">Admin Only</Badge>} action={<Button>+ Invite User</Button>} bodyFlush>` containing `<TeamRolesTable members={...} onRoleClick={...} onInvite={...} />`.
- [ ] **Preferences** section: `<SettingsSection title="Preferences">` with `<SettingsToggle>` and `<SettingsSelectRow>` rows. At minimum: dark-mode toggle wired to `useDarkMode()`.
- [ ] **About** card at the bottom: `<AboutCard appName="..." version={pkg.version} credit={<>SJ Hamill Construction<br />Built by ...</>} links={[...]} />`.

## 6. View-As banner (admin apps only)

When an admin is impersonating another user, render the banner above page content on every route.

- [ ] Render `<ViewAsBanner targetLabel="Jake Daniels (PM)" permissionsHint="4 projects visible" signedInAs={admin.email} onExit={exitViewAs} />` at the top of the `<AppShell>` content area, before `<PageHeader>`.
- [ ] Impersonation state (target, hint) comes from your auth/session store.
- [ ] For a stale/failed impersonation target, render with `tone="destructive"` and pass the error copy via `children`.

## 7. Post-migration cleanup

- [ ] Delete old sidebar/layout components + their CSS files.
- [ ] `grep -rn "style={{" src/` — should return zero layout/spacing/color inline styles.
- [ ] `grep -rn "#0b2954\|#0f172a\|#364151\|#dadada\|#d1dae5" src/` — should return zero hardcoded brand hex values in JSX. Use Tailwind tokens (`bg-primary`, `text-muted-foreground`, etc.) instead.
- [ ] Remove any `useState` for dark mode — the `useDarkMode` hook owns it via the `class="dark"` DOM attribute.
- [ ] Remove any custom `<Link to="/tools">Back</Link>` — `AppShell.toolsHomeUrl` handles it.

## 8. Verify

- [ ] Sidebar visually matches a screenshot of another migrated app. Same width, same logo placement, same "← Back to Tools" link, same nav-item styling, same footer with Settings + dark toggle + email.
- [ ] Dark mode toggles correctly (click the toggle → `<html class="dark">` flips, every color re-resolves).
- [ ] Tab through the sidebar and Settings page — every interactive element gets a visible focus ring (driven by `--ring`).
- [ ] Existing tests still pass. No new eslint / prettier / typecheck errors.
- [ ] Cloudflare Pages preview renders without console errors.

## 9. PR + issue close

- [ ] PR body includes `Closes sj-hamill-dev/<this-repo>#N` referencing the adoption issue on the roadmap board.
- [ ] Screenshots of the new sidebar + settings page in the PR description.
- [ ] Coordinate merge timing: every merge to `main` ships to Cloudflare Pages within minutes. Land near the start of a workday, not at 5pm Friday.

---

## Reference

- Components API: `sjhamill-ui/src/index.ts` — every named export you can use.
- Design conventions: `sjhamill-ui/.design-sync/conventions.md` — color families + spacing + typography.
- Design mock (Settings): `sjhamill-archives/sjhamill-ui/design-refs/settings-redesign.dc.html`.
- Load-bearing invariants: `sjhamill-ui/CLAUDE.md`.

## FAQ

**Q: What if a component doesn't fit our layout?**
File an issue on `sj-hamill-dev/sjhamill-ui` describing the mismatch. Don't fork the component in the consumer — that starts the visual drift you're trying to fix.

**Q: Can I add app-specific footer items to the sidebar?**
Yes — `<SidebarFooter>` accepts `children` above the Settings/dark/email row. Use it for app-specific links (help docs, admin console links).

**Q: Our app has no View-As or Team & Roles. Do I still need to render those sections?**
No. `SettingsPage` accepts any subset. Ship whichever sections apply.

**Q: We use a custom auth provider. Does anything hardcode Google?**
`AccountCard` takes `authProvider` as a prop — pass whatever ("Google", "SSO", "Email"). No hardcoding inside the library.
