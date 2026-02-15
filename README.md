# Veronika & Daniel - Wedding Website

A beautiful wedding website built with React + Vite + Tailwind CSS.

**Live Site**: https://veronikadanko.sk
**Wedding Date**: May 30, 2026
**Venue**: Stodola Pohanské, Myto pod Ďumbierom

---

## 🚀 Quick Start

### Install and Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## ⚙️ What You Need to Customize

### 1. **Payment Info** (Required)
**File**: `src/components/Gifts.jsx`
- Replace placeholder IBAN (line 8):
  ```javascript
  const iban = "SK00 0000 0000 0000 0000 0000";
  ```
- Add QR code image: `public/images/qr-code.png`

### 2. **Google Maps** (Required)
**File**: `src/components/DetailsAndVenue.jsx`
- Update map embed URL (line 6)
- Get real URL: Google Maps → Share → Embed a map

### 3. **RSVP Form** (Required)
**File**: `src/components/RSVP.jsx`
- Option A: Create Google Form and embed it (uncomment line 199)
- Option B: Set up form backend (Formspree, Netlify Forms)

### 4. **Add Photos** (Optional)
- Save images to `public/images/`
- Already included: `hero_main_image.jpeg`, `stodola_pohanske.jpg`

### 5. **Update Hotels** (Optional)
**File**: `src/components/Accomodation.jsx`
- Update hotel names, links, and distances (line 6)

---

## 📦 Deployment to Vercel

### Method 1: GitHub + Vercel (Recommended)

```bash
# Push to GitHub
git init
git add .
git commit -m "Wedding website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Then:
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repo
4. Click "Deploy"

### Method 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Add Custom Domain

1. In Vercel Dashboard: Settings → Domains
2. Add `veronikadanko.sk`
3. Update DNS records (Vercel will show you exactly what to add)
4. Wait 5-30 minutes for DNS propagation

---

## 🎨 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

---

## 📁 Project Structure

```
svadba/
├── src/
│   ├── components/
│   │   ├── Hero.jsx              # Landing section
│   │   ├── DetailsAndVenue.jsx   # Event details + map
│   │   ├── Program.jsx           # Timeline
│   │   ├── Accomodation.jsx            # Accomodation & hotels
│   │   ├── Gifts.jsx             # Payment info
│   │   ├── RSVP.jsx              # Guest form
│   │   ├── FAQ.jsx               # Questions
│   │   └── Footer.jsx            # Footer
│   ├── App.jsx
│   └── index.css
├── public/
│   └── images/
│       ├── hero_main_image.jpeg
│       └── stodola_pohanske.jpg
├── tailwind.config.js
└── package.json
```

---

## 🎯 Before Going Live

- [ ] Replace IBAN with real bank account
- [ ] Add payment QR code
- [ ] Update Google Maps embed URL
- [ ] Configure RSVP form
- [ ] Test on mobile
- [ ] Deploy to Vercel
- [ ] Configure custom domain

---

## 🔄 Updating After Deployment

If using GitHub + Vercel:
```bash
git add .
git commit -m "Update content"
git push
```
Vercel auto-deploys!

---

Built with ♥ for Veronika & Daniel's wedding
