# Writing a blog post

This folder holds every blog post. **One Markdown file = one published post.**
To publish, drop a new `.md` file in this folder and the site picks it up
automatically — the `/blog` index, the category filters, and the post page all
update on their own. No code changes needed.

## Quick start

1. Copy `_template.md` to a new file. Name it after the URL you want, using
   lowercase words separated by hyphens. The filename becomes the URL:

   `florida-screen-buying-guide.md`  →  `/blog/florida-screen-buying-guide`

2. Fill in the frontmatter (the block between the `---` lines at the top).
3. Write the post body below the frontmatter in plain Markdown.
4. Save. Done.

## Frontmatter fields

```yaml
---
title:    "How to pick a motorized screen that survives Florida"
excerpt:  "A short one- or two-sentence teaser shown on the blog index."
category: buying-guides        # see the list below — must match exactly
author:   "Matt Voggel"
date:     2026-05-12           # YYYY-MM-DD — controls sort order (newest first)
readTime: "8 min"             # optional — auto-estimated if you leave it out
cover:    "/img/blog/screen.jpg"  # optional — leave out if no image yet
draft:    false                # true = visible locally but hidden on the live site
---
```

### Categories (use the slug on the left)

| slug            | shown as       |
| --------------- | -------------- |
| `product-lines` | Product Lines  |
| `buying-guides` | Buying Guides  |
| `field-notes`   | Field Notes    |
| `maintenance`   | Maintenance    |
| `company-news`  | Company News   |

To add or rename a category, edit `BLOG_CATEGORIES` in `lib/blog.ts`.

## Writing the body

Standard Markdown. A few examples:

```markdown
## A section heading

A normal paragraph. **Bold** and *italic* work as expected.

- A bullet
- Another bullet

> A pull quote.

[A link to our shades page](/products/exterior-shades)
```

## Images

Put image files in `public/img/blog/` and reference them as `/img/blog/name.jpg`
(both in the `cover:` field and inside the body with `![alt text](/img/blog/name.jpg)`).

## Drafts

Set `draft: true` while you're still working. The post shows up when you run the
site locally (`npm run dev`) but is hidden from the live site. Flip it to
`false` when it's ready to publish.
