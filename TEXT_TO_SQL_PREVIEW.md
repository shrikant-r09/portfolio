# Enabling the Text-to-SQL live preview

The portfolio at **https://shrikant-dev.vercel.app** shows each project's live site inside a browser-style frame. StudyMate AI already works. The Text-to-SQL app (**https://g52-web.vercel.app**) can't be shown yet, because it tells browsers not to let any other site display it.

This guide explains why, and what to change in the **Text-to-SQL project** to allow it.

---

## Why the preview is blocked

Right now, `g52-web.vercel.app` sends this response header:

```
X-Frame-Options: DENY
```

`DENY` means *no website may show this page inside a frame (`<iframe>`)*, including your own portfolio. It's a security default that protects against **clickjacking**, where a malicious site shows your app invisibly and tricks people into clicking buttons in it.

So the header shouldn't just be deleted. It should be **replaced** with a rule that still blocks everyone else but allows your own sites.

`X-Frame-Options` can't list specific allowed sites. The modern replacement is the `frame-ancestors` rule in a `Content-Security-Policy` header:

```
Content-Security-Policy: frame-ancestors 'self' https://shrikant-dev.vercel.app http://localhost:5173 http://localhost:5174
```

| Entry | Allows |
|---|---|
| `'self'` | the Text-to-SQL app framing its own pages |
| `https://shrikant-dev.vercel.app` | the live portfolio |
| `http://localhost:5173`, `http://localhost:5174` | the portfolio running on your PC (`npm run dev`) |

Every other website stays blocked.

---

## The change, in the Text-to-SQL project's `vercel.json`

### 1. Remove the `X-Frame-Options` entry

Look for a line like this and delete it (keep the commas around it valid JSON):

```json
{ "key": "X-Frame-Options", "value": "DENY" }
```

### 2. Add the `Content-Security-Policy` header

If the file has no `headers` section yet, add one:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "frame-ancestors 'self' https://shrikant-dev.vercel.app http://localhost:5173 http://localhost:5174"
        }
      ]
    }
  ]
}
```

Keep the rest of the file (`rewrites`, `builds` and so on) unchanged.

- **The file already has a `headers` section:** add the `Content-Security-Policy` object to its existing list.
- **It already has a `Content-Security-Policy` header:** don't add a second one. Append this to the end of its current value:
  ```
  ; frame-ancestors 'self' https://shrikant-dev.vercel.app http://localhost:5173 http://localhost:5174
  ```

### 3. Commit, push and redeploy

Vercel redeploys automatically after the push.

### 4. Check it worked

```bash
curl -sI https://g52-web.vercel.app/
```

You should see:

- ✅ a `content-security-policy: frame-ancestors …` line
- ❌ **no** `x-frame-options: DENY` line

---

## If `DENY` is still there after redeploying

Then the header isn't coming from `vercel.json`; the app's own code sets it. Search the project for `X-Frame-Options` or `DENY`:

| Where it's set | What to change |
|---|---|
| **Next.js**: `next.config.js` → `async headers()` | Replace the `X-Frame-Options` entry with the `Content-Security-Policy` entry above |
| **Express** with `helmet()` (sets `DENY` by default) | `helmet({ frameguard: false, contentSecurityPolicy: { directives: { frameAncestors: ["'self'", "https://shrikant-dev.vercel.app"] } } })` |
| **FastAPI** middleware that adds the header | Remove `X-Frame-Options` and set `Content-Security-Policy: frame-ancestors …` instead |

---

## Then, in the portfolio

In `src/data.js`, the Text-to-SQL entry has this comment:

```js
// add  embed: 'https://g52-web.vercel.app/',  once the site allows framing (it sends X-Frame-Options: DENY today)
```

Replace it with:

```js
embed: 'https://g52-web.vercel.app/',
```

Commit and push. Vercel redeploys the portfolio, and the Text-to-SQL card shows the live site like StudyMate AI.

---

## Good to know

- **The preview shows the logged-out view.** Browsers usually don't send login cookies to a site shown inside another site's frame. If the homepage requires login, the frame shows the login page; point `embed` at a public page if you want something else.
- **It's a group project.** `g52-web` is shared, so check with your teammates before changing its security settings. This change only allows *your* portfolio to embed it, so protection against other websites stays the same.
- **If the portfolio address changes** (for example to a custom domain), add the new address to the `frame-ancestors` list too.
