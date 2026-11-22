## Goal

Remove the Skills → 「使った作品」 popover added in PF-007 (B4), together with the work-card highlight that only existed to support it.

## Why This Slice Exists Now

The site owner asked to stop showing the works used for each skill in the Skills section.

## Current Observed State

- Six skills (TypeScript, Go, Python, Next.js, Framer Motion, Docker) render as buttons that open a 「使った作品」 popover with links to `#work-<id>`.
- Work cards carry `id="work-<id>"` / `tabIndex={-1}` and a shared hashchange/click listener that flashes a highlight for 1.2s.

## Accepted Baseline You May Assume

- PF-007 is merged on `main` (A1-A4, B1-B4 in place).
- `RevealObserver` drives the Skills row reveal via `data-reveal`; that must keep working.

## Target Repo / Path / Part

Repository: `nakatashingo/nakata-portfolio`

- Target paths: `app/app/components/SkillsSection.tsx app/app/components/SkillRows.tsx app/app/components/WorkCard.tsx app/app/globals.css`

Target part: `Remove PF-007 B4 (skill popover and work-card hash highlight)`

## In Scope

- `SkillsSection.tsx`: drop the `worksItems` import and the `works` prop; keep `RevealObserver` and the section markup.
- `SkillRows.tsx`: render each skill as a plain `<li className="font-medium">{item}</li>` (as before PF-007) inside the existing row markup that keeps `data-reveal` and the `skill-row` grid. Remove the open state, pointer/focus/Escape/outside-click handlers, popover positioning and all popover markup. If the component no longer needs client state, it may become a server component or be folded back into `SkillsSection` — implementer's choice, but the Skills row reveal (A3) must keep working.
- `WorkCard.tsx`: remove the `highlights` Map, `highlightHash` / `highlightSameHash`, the highlight state/effect, the `work-highlight` span, and the `id="work-<id>"` / `tabIndex={-1}` attributes. Keep tilt, edge light, magnetic link and reveal exactly as they are.
- `globals.css`: remove only the B4-specific rules (`.skill-row:has([aria-expanded="true"])`, `.skill-popover`, `.work-highlight`, `.work-highlight-active`, `.work-card:target ... .work-highlight`, the reduced-motion `.work-highlight-active` rule and `@keyframes work-target-out`).

## Out Of Scope

- Every other PF-007 behaviour (A1-A4, B1-B3).
- Data, copy, colours, dependencies.

## Standalone Child Issue Contract

The PR removes the skill popover and the work-card hash highlight completely, so skills are plain text again, while every other motion behaviour stays exactly as it is; type check and build pass.

## Acceptance Criteria

- Skill items render as plain text list items again: no buttons, no aria-expanded/aria-controls, no 「使った作品」 popover in markup or behaviour.
- SkillsSection no longer imports worksItems; SkillRows (or its replacement) takes only the skill categories.
- The #work-<id> highlight machinery is removed: no highlights Map, no hashchange/click listeners, no highlight state, no work-highlight element, and WorkCard no longer sets id="work-<id>" or tabIndex={-1}.
- Dead CSS for B4 is removed (.skill-row:has([aria-expanded]), .skill-popover, .work-highlight*, @keyframes work-target-out); no other CSS changes.
- A1-A4 and B1-B3 behave exactly as before, including the Skills row reveal (data-reveal) and work-card tilt/edge light.
- No data, copy, colour or dependency changes.
- `npx tsc --noEmit` and `npm run build` succeed in app/, and `git diff --check` is clean.

## Verification

In `app/`: `npx tsc --noEmit` and `npm run build`. At repo root: `git diff --check`. The conductor re-runs the browser checks (no skill buttons, reveal/tilt/nav still working, reduced motion and no-JS show everything).

## Related Links

- Reverts part of #13 (PF-007)
- Intent node: `intents/portfolio/intent-tree/01-content.md` (Motion section)

## Knowledge Maintenance

- Intent placement: `intents/portfolio/intent-tree/01-content.md`
- ADR candidate: none
- Diagram candidate: none
- Docs update: none
- Closeout writeback expected: no

## Guide Reachability (G645)

No role-facing surface is added (`no_role_facing_surface: true`).

## Base Branch Policy

Policy: `direct-main`
Expected PR base branch: `main`

Open all child PRs against `main` directly.
