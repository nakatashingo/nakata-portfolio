# 01 Content

Parent: [00-map.md](00-map.md)

The site presents the owner through text and their projects, not a face photo.

- Hero: name, role, self-introduction, social links. No avatar / photo slot
  (operator ruling 2026-11-22).
- Works: projects the owner built or co-built, each with a working outbound link.
  A link is not always GitHub (private repos link to a public write-up instead),
  so the link label is per item.

## Visual direction (operator ruling 2026-11-22)

Keep the current dark + teal mood, but polish it so it reads as this person's
site rather than a template: Japanese-first typography, structure only where the
content has structure (the activities timeline is a sequence; works are not),
one orchestrated motion moment in the hero instead of fade-ins everywhere. See PF-002.

## Display name (operator ruling 2026-11-22)

The site's display name is "Nakata Shingo" (family name first, romanized) in the
hero, header, footer and page title. The Japanese 「中田 慎吾」 appears once as the
hero's secondary line; self-introduction prose keeps 「中田慎吾です」. See PF-003.

## Works presentation (operator ruling 2026-11-22)

All works are shown at the same size; no work is featured (PF-004 removed the
`featured` flag from Agent Agency). Which work, if any, is the showcase is the
owner's decision, not a design default. The `featured` mechanism stays in code.

## AR花火 (operator ruling 2026-11-22)

Works includes AR花火 (NUTFes/ar-hanabi-mobile, public). The owner is the
second-largest committer; the description names only parts evidenced by the
owner's own commits. Placed second (after Agent Agency), newest-first. See PF-005.

## Skills (operator ruling 2026-11-22)

Skills lists only what the owner approved. Added in PF-006: Go, Python, C#
(言語) and Docker (ツール), each backed by the owner's commits (Enomo /
NUTFES-MAP / FinanSu / AR花火 API; research repos; Unity projects; Docker
Compose setups). Other candidates (Hono, Cloudflare Workers, PyTorch, Unity,
Gemini/ADK, …) were offered and not approved; do not add them unasked.
