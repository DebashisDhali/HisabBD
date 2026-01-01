# 🚀 Deployment & SEO Guide for HisabBD

This guide will help you put **HisabBD** online and rank it on Google.

---

## 1. Deploying to the Web (Free & Fast)

We recommend using **Vercel** as it is the standard for React/Vite apps.

### Option A: Automatic Deployment (Recommended)
1.  Push your code to **GitHub**.
2.  Go to [Vercel.com](https://vercel.com) and sign up with GitHub.
3.  Click **"Add New Project"** -> **"Import"** your repository.
4.  Vercel will detect `Vite` automatically.
5.  Click **Deploy**.
    *   *Result:* Your site will be online in 1 minute (e.g., `hisabbd.vercel.app`).

### Option B: Manual Deployment (If no GitHub)
1.  Open your terminal in `d:\A_W\Calculator\client`.
2.  Run `npm run build`.
3.  Install Vercel CLI: `npm i -g vercel`.
4.  Run `vercel login`.
5.  Run `vercel --prod`.
    *   Follow the prompts (Hit Enter for all).

---

## 2. Connecting Your Domain

If you own `hisabbd.com`:
1.  Go to Vercel Project Settings > **Domains**.
2.  Enter `hisabbd.com`.
3.  Follow the instructions to update your DNS (add A record or CNAME) at your domain registrar (Namecheap, GoDaddy, etc.).

---

## 3. Google Search Console (SEO Ranking)

To "stay in the top of search", you MUST tell Google your site exists.

1.  Go to [Google Search Console](https://search.google.com/search-console).
2.  **Add Property**: Enter your domain (e.g., `https://hisabbd.com`).
3.  **Verification**: Google will ask you to verify ownership.
    *   *Easiest Method:* Use the "HTML Tag" method. Copy the `<meta>` tag provided by Google and paste it into your `client/index.html` file inside the `<head>` tag. Deploy again.
4.  **Submit Sitemap**:
    *   Once verified, go to **Sitemaps** in the left sidebar.
    *   Enter `sitemap.xml` and click **Submit**.
    *   *Status:* You should see "Success". Google now knows about every calculator page we built.

---

## 4. Key SEO Optimizations (Already Done ✅)

We have already baked these into the code:
*   **Dynamic Meta Tags (`Helmet`):** Every page has a unique Title, Description, and Keywords rooted in "Bangladeshi" search terms (e.g., "Gold Price BD 2026").
*   **Canonical URLs:** Prevents "duplicate content" penalties.
*   **Sitemap.xml:** Lists all 15+ pages for crawlers.
*   **Robots.txt:** Allows Google to index everything.
*   **Speed:** Used `Vite` + `React` for ultra-fast loading (Core Vitals).

### 5. Strategy to Rank #1
1.  **Backlinks:** Share your link on Facebook, LinkedIn, and BD-specific forums. The more trusted sites that link to you, the higher you rank.
2.  **Content:** The "Knowledge Hub" text we added at the bottom of pages acts as "SEO Content".
3.  **Consistency:** Keep the "Gold Price" and "Zakat" logic updated.

**🎉 Your site is ready to dominate the Bangladeshi calculator niche!**
