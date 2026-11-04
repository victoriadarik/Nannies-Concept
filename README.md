# NannyMatch SA — Meeting Portal for South African Nannies & Parents

A web application connecting vetted domestic caregivers, au pairs, and newborn night nurses with families across **Johannesburg**, **Durban**, and **Cape Town**.

## 🚀 GitHub Pages Publishing (Fix for White/Blank Screen)

If you previously experienced a **white or blank screen** when publishing a Vite + React project to GitHub Pages, it was caused by **absolute asset paths** (`/assets/...` instead of relative `./assets/...`) and missing GitHub Pages configuration. 

This repository has been configured to eliminate the blank screen issue:

1. **Relative Base Path**: `vite.config.ts` includes `base: './'` so assets resolve correctly under `https://<username>.github.io/<repo-name>/`.
2. **Jekyll Bypass (`public/.nojekyll`)**: Prevents GitHub's default Jekyll engine from hiding assets and folders starting with special characters.
3. **404 Fallback (`public/404.html`)**: Automatically redirects any subpath 404s back to `index.html`.
4. **Automated GitHub Actions Deployment (`.github/workflows/deploy.yml`)**: Builds and publishes automatically on push.

---

### How to Enable GitHub Pages in Your Repository

1. Push this project to your GitHub repository:
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** → **Pages** (in the left sidebar under *Code and automation*).
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. Push to `main` (or click **Actions** → **Deploy to GitHub Pages** → **Run workflow**).
4. Within 1–2 minutes, your live site will be accessible without any blank page issues!

---

### Local Development & Build

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test production build locally
npm run build
npm run preview
```
