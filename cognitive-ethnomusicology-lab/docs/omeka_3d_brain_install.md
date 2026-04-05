# Install a 3D Brain Model on Digital Heritage GY (Omeka S)

This site is running Omeka S, so the safest installation path is an embed block.

## What you need first

- Admin access to the site dashboard
- A published 3D brain viewer URL (for example from Sketchfab, BioDigital, or your own hosted page)

## Connect to the site admin

1. Open https://digitalheritagegy.com/admin
2. Sign in with your Omeka S admin account
3. Go to Sites
4. Open the digitalheritage site
5. Open Pages
6. Edit the Home page

## Install the model on Home page

1. Click Add new block
2. Choose HTML block
3. Paste one of the snippets below
4. Save page
5. Click View site to verify

## Snippet A: iframe embed

Use this when your 3D model is already hosted and embeddable.

```html
<section style="max-width: 1100px; margin: 1rem auto; padding: 1rem; border: 1px solid #ddd; border-radius: 12px; background: #fafafa;">
  <h2 style="margin: 0 0 0.75rem 0;">Interactive 3D Brain Model</h2>
  <p style="margin: 0 0 0.75rem 0;">Rotate and zoom to explore anatomy and cognition regions.</p>

  <div style="position: relative; width: 100%; padding-top: 56.25%; border-radius: 10px; overflow: hidden; background: #111;">
    <iframe
      src="https://YOUR-3D-BRAIN-URL"
      title="3D Brain Model"
      loading="lazy"
      allowfullscreen
      style="position: absolute; inset: 0; width: 100%; height: 100%; border: 0;"
      referrerpolicy="strict-origin-when-cross-origin">
    </iframe>
  </div>
</section>
```

## Snippet B: link-out fallback

Use this if the provider blocks iframe embedding.

```html
<section style="max-width: 900px; margin: 1rem auto; padding: 1rem; border: 1px solid #ddd; border-radius: 12px; background: #fafafa; text-align: center;">
  <h2 style="margin: 0 0 0.75rem 0;">Interactive 3D Brain Model</h2>
  <p style="margin: 0 0 1rem 0;">Open the full interactive model in a new tab.</p>
  <a href="https://YOUR-3D-BRAIN-URL" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 0.75rem 1rem; border-radius: 8px; background: #003d5b; color: #fff; text-decoration: none;">
    Launch 3D Brain Viewer
  </a>
</section>
```

## Ready block for BrainFacts 3D Brain

Use this exact block for your provided URL:

```html
<section style="max-width: 1100px; margin: 1rem auto; padding: 1rem; border: 1px solid #ddd; border-radius: 12px; background: #fafafa;">
  <h2 style="margin: 0 0 0.75rem 0;">Interactive 3D Brain Model</h2>
  <p style="margin: 0 0 0.75rem 0;">Powered by BrainFacts. If the embed does not render, use the launch button below.</p>

  <div style="position: relative; width: 100%; padding-top: 56.25%; border-radius: 10px; overflow: hidden; background: #111; margin-bottom: 0.9rem;">
    <iframe
      src="https://www.brainfacts.org/3d-brain#intro=true"
      title="BrainFacts 3D Brain"
      loading="lazy"
      allowfullscreen
      style="position: absolute; inset: 0; width: 100%; height: 100%; border: 0;"
      referrerpolicy="strict-origin-when-cross-origin">
    </iframe>
  </div>

  <p style="margin: 0; text-align: center;">
    <a href="https://www.brainfacts.org/3d-brain#intro=true" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 0.75rem 1rem; border-radius: 8px; background: #003d5b; color: #fff; text-decoration: none;">
      Open 3D Brain in New Tab
    </a>
  </p>
</section>
```

## Troubleshooting

- If the model does not display, check whether the model host sends X-Frame-Options or frame-ancestors restrictions.
- If styling is stripped, use a Text block plus media block instead, or ask admin to allow fuller HTML.
- If the page is slow, load a lightweight model or a static preview image with a click-to-open link.

## Create dedicated Brain Lab page (recommended)

1. Go to https://digitalheritagegy.com/admin
2. Sites → digitalheritage → Pages
3. Add new page
4. Title: `Interactive Brain Lab`
5. URL slug: `brain-lab`
6. Select "Published"
7. Add new block → HTML
8. Paste the Ready block for BrainFacts 3D Brain (from above)
9. Save and publish

## Add link from Home page to Brain Lab

1. Go to Home page edit
2. Add a new block → Text
3. Paste this snippet:

```html
<div style="text-align: center; margin: 1.5rem 0; padding: 1rem;">
  <a href="https://digitalheritagegy.com/s/s/digitalheritage/page/brain-lab" style="display: inline-block; padding: 1rem 2rem; border-radius: 10px; background: #003d5b; color: #fff; text-decoration: none; font-size: 1.05rem; font-weight: 600;">
    → Launch Interactive Brain Lab
  </a>
</div>
```

4. Save Home page

This keeps the Home page fast while making the 3D model easily accessible.