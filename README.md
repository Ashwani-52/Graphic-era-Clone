# 🎓 Graphic Era – Digital Student ID Card

A **frontend-only** React + Vite app that renders a mobile-first digital ID card
matching Graphic Era University's blue design system. All data is editable from
the UI and persisted to **localStorage** — no backend required.

---

## 📁 Project Structure

```
graphic-era-id-card/
├── index.html              ← HTML entry point (Poppins + Rajdhani fonts)
├── vite.config.js          ← Vite + React plugin config
├── package.json
└── src/
    ├── main.jsx            ← ReactDOM.createRoot entry
    ├── App.jsx             ← Root component (imports IDCard)
    ├── index.css           ← Global reset + CSS variables
    ├── IDCard.jsx          ← Main ID card component (ALL logic here)
    └── IDCard.css          ← All component styles (mobile-first)
```

---

## 🚀 Quick Start

```bash
# 1. Enter project folder
cd graphic-era-id-card

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# → Opens at http://localhost:5173

# 4. Build for production
npm run build
# → Output in /dist folder (deploy to Vercel / Netlify / GitHub Pages)
```

---

## ✨ Features

| Feature | Details |
|---|---|
| **Edit Mode** | Tap ☰ (top-right) or "✏️ Edit Card" button to enter edit mode |
| **Photo Upload** | Tap profile photo area to upload from device gallery |
| **Auto-Save** | All changes saved to `localStorage` automatically on Save |
| **Reset** | Reset button restores all default values |
| **3 Tabs** | ID Card / Academic / Marks — each shows relevant editable fields |
| **Progress Bars** | Marks tab shows animated visual bars for HS & Intermediate % |
| **Modules Grid** | Academic, Fee, Circular, Exam, Placement, Hostel, Grievance tiles |
| **Marquee Banner** | Attendance reminder scrolls across the screen |
| **Mobile First** | Max-width 420px, looks like a real phone app |
| **Toast Notification** | Green "Saved!" toast appears after saving |

---

## 🎨 Color Theme

| Variable | Value | Usage |
|---|---|---|
| `--geu-blue-dark` | `#0a4d8c` | Gradient end, profile card |
| `--geu-blue-mid` | `#1169b8` | Primary brand blue |
| `--geu-blue-bright` | `#1a8fe3` | Accents, section headers |
| `--geu-blue-light` | `#3ab5f7` | Light accents, gradients |
| `--geu-header-green` | `#b8f053` | University header background |
| `--geu-red` | `#d32f2f` | "Graphic" logo text color |

---

## 🔧 How to Edit Default Data

Open `src/IDCard.jsx` and find the `DEFAULT_DATA` object at the top:

```js
const DEFAULT_DATA = {
  name: 'RANGOLI',
  enrollNo: '2512350005',
  email: 'rangolinaik.sk@gmail.com',
  phone: '7668707141',
  officialEmail: '2512350005@geu.ac.in',
  fatherName: 'ROOP LAL',
  motherName: 'NISHA DEVI',
  dob: '16/06/2007',
  college: 'Graphic Era (Deemed to be University)',
  course: 'B.A (Hons)- Psychology',
  specialization: '',
  yearSem: '2',
  branch: 'N/A',
  section: 'N/A',
  classRollNo: '64',
  enrollmentNo: 'GE-25360806',
  universityRollNo: '3600806',
  highSchoolPct: '70.40',
  intermediatePct: '70.00',
  status: 'Active',
  photo: null,            // null = show placeholder; paste base64 string to pre-fill
}
```

Change any value here to update the defaults.

---

## 💾 localStorage Key

All card data is stored under the key: `geu_id_card`

To clear all saved data manually from browser console:
```js
localStorage.removeItem('geu_id_card')
```

---

## 🌐 Deploying to Vercel (Free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (from project root)
vercel

# Follow prompts → your ID card goes live instantly
```

Or connect the GitHub repo to Vercel dashboard for auto-deployments.

---

## 📦 Deploying to Netlify (Free)

```bash
npm run build
# Drag the /dist folder to https://app.netlify.com/drop
```

---

## 🧩 Adding More Fields

To add a new editable field (e.g., "Blood Group"):

1. Add key to `DEFAULT_DATA`:
   ```js
   bloodGroup: 'B+',
   ```

2. Add an `<EditableField />` in the relevant tab section inside the JSX:
   ```jsx
   <EditableField
     label="Blood Group"
     value={current.bloodGroup}
     fieldKey="bloodGroup"
     editing={editing}
     onChange={handleChange}
   />
   ```

That's all — it auto-wires to edit mode and localStorage.

---

## 📱 Responsive Breakpoints

| Width | Behavior |
|---|---|
| `< 400px` | Slightly smaller fonts |
| `400–479px` | Full-width phone frame |
| `≥ 480px` | Centered 420px card with rounded corners + border shadow |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 + Vite 5 |
| **Styling** | Pure CSS (mobile-first, CSS variables) |
| **Fonts** | Poppins (UI), Rajdhani (headings) — Google Fonts |
| **Persistence** | Browser localStorage |
| **Routing** | None (single-page, tab-based) |
| **Backend** | ❌ None required |

---

## 🔮 Optional Backend Additions (Future)

If you later want to add a real backend (MERN full stack):

| Feature | Implementation |
|---|---|
| Multi-user auth | Node.js + Express + MongoDB Atlas + JWT |
| Admin panel | Separate React route `/admin` |
| API endpoint | `POST /api/student` → save to MongoDB |
| Image storage | Cloudinary or AWS S3 for profile photos |
| QR Code | `npm install qrcode.react` → encode enrollment number |

---

Built with ❤️ matching Graphic Era University design system.
