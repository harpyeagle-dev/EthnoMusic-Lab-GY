Deployment Guide for Ethnomusicology Explorer
================================================

## Option 1: Netlify (Recommended - Easiest)

### Steps:
1. Go to https://app.netlify.com/signup (sign up free with GitHub/Google)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repo (push the app code there first)
4. Netlify auto-detects netlify.toml and deploys automatically
5. Get a shareable URL: `https://your-site-name.netlify.app`

### Via CLI (Faster):
```bash
npm install -g netlify-cli
cd /Users/admin/Computational\ Ethnousicology\ App
netlify deploy --prod --dir dist
```

---

## Option 2: Vercel (Great for Next.js/Vite-like apps)

### Steps:
1. Go to https://vercel.com/signup (sign up free)
2. Import your GitHub repo
3. Vercel auto-detects the build and deploys
4. Get URL: `https://your-project.vercel.app`

### Via CLI:
```bash
npm install -g vercel
cd /Users/admin/Computational\ Ethnousicology\ App
vercel --prod
```

---

## Option 3: GitHub Pages (Free - Static Only)

### Steps:
1. Push code to GitHub repo
2. Go to Settings → Pages → Deploy from branch
3. Select `main` branch, `/dist` folder
4. Get URL: `https://username.github.io/repo-name`

---

## Option 4: Surge.sh (Simple & Free)

### Steps:
```bash
npm install -g surge
cd /Users/admin/Computational\ Ethnousicology\ App/dist
surge
# Follow prompts, get URL like: https://random-name.surge.sh
```

---

## Current Status:
- ✅ Build: `dist/` folder ready
- ✅ PWA: Service worker + manifest configured
- ✅ Offline: Core assets cached
- ✅ netlify.toml: Auto-deployment configured

## Recommended Next Steps:
1. Add PWA icons to manifest.json for install prompts
2. Create GitHub repo and push code
3. Deploy via Netlify (takes 2 min)
4. Share the resulting URL with students/teachers

Questions? Check the app's README.md for more details.
