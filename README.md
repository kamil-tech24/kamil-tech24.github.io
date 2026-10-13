# Muhammad Kamil — Portfolio

A single-page portfolio built with plain HTML, CSS and vanilla JavaScript.
No frameworks, no build step, no npm. It runs as-is on GitHub Pages.

```
index.html   page content and structure
style.css    all styling, animations and responsive rules
script.js    mobile menu, scroll reveal, active nav, count-up stats, copy email
images/      kamil.jpg (profile photo; replace the file to change it)
README.md    this file
```

To preview locally, just double-click `index.html` to open it in your browser.

---

## Deploy on GitHub Pages (free)

### 1. Create the repository
1. Sign in at [github.com](https://github.com) (create a free account if needed).
2. Click **+** (top right) → **New repository**.
3. Name it **exactly** `YOUR-USERNAME.github.io`
   (for example, if your username is `kamiltech`, name it `kamiltech.github.io`).
   This special name gives you the clean URL `https://kamiltech.github.io`.
4. Set it to **Public**, then click **Create repository**.

> Any other repo name also works, but the site will live at
> `https://YOUR-USERNAME.github.io/REPO-NAME/` instead.

### 2. Upload the files

**Option A, no Git needed (easiest):**
1. On the new repo page, click **uploading an existing file**.
2. Drag in `index.html`, `style.css`, `script.js`, `README.md` **and the `images` folder**
   (drag the folder itself so the photo keeps its `images/kamil.jpg` path).
3. Click **Commit changes**.

**Option B, with Git on your computer:**
```bash
cd path/to/portfolio-folder
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
git push -u origin main
```

### 3. Turn on GitHub Pages
1. In the repo, open **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)** → **Save**.
4. Wait 1–2 minutes, refresh the Pages screen, and your live link appears at the top:
   `https://YOUR-USERNAME.github.io`

> For `username.github.io` repos, Pages is often enabled automatically. Checking
> the Pages screen confirms it's live.

### 4. Updating later
Edit a file on GitHub (pencil icon) or push new commits. The live site
updates within a minute or two. If you don't see changes, hard-refresh
(Ctrl + Shift + R, or Cmd + Shift + R on Mac).

---

## Before you share the link: fill in the placeholders

Search `index.html` for **`PLACEHOLDER`**. Every remaining spot is marked.

| What | Where | How |
|---|---|---|
| 4th project card | More projects | Replace text, or delete the card |
| Project screenshots | More projects | Optional: replace the coloured thumbnail blocks with `<img>` screenshots |
| Stats | Stats strip | Update `data-count` values and the text inside as your Upwork numbers grow |

### About the contact form
There is **no contact form, on purpose.** GitHub Pages can't run server code, so a
form needs a third-party service. Instead, visitors get one-click email links,
copy-to-clipboard buttons and a WhatsApp click-to-chat link, which work instantly
with nothing to set up or break.

If you later want a form, sign up at [formspree.io](https://formspree.io), create a
form, and add this inside the contact section (replace `YOUR_FORM_ID`):

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <label for="name">Name</label>
  <input id="name" name="name" required>
  <label for="email">Email</label>
  <input id="email" type="email" name="email" required>
  <label for="message">Message</label>
  <textarea id="message" name="message" rows="5" required></textarea>
  <button class="btn btn-light" type="submit">Send</button>
</form>
```

---

## Adding testimonials later
The testimonials section was removed for now, but its styles are still in `style.css`.
Ask to have it added back once you have real client reviews to show.

## Optional: custom domain
If you buy a domain (e.g. `kamil.dev`), add it under **Settings → Pages → Custom domain**
and follow GitHub's DNS instructions there. You do DNS and SSL for clients already, so
this part should feel familiar.
