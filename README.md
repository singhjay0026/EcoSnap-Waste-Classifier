# EcoSnap 🌿 — AI Smart Campus Recycling & Waste Classifier

[![EcoSnap Hackathon Status](https://img.shields.io/badge/EcoSnap-Hackathon%20Production%20Ready-059669?style=for-the-badge)](https://github.com/singhjay0026/EcoSnap-Waste-Classifier)
[![Built With React & Vite](https://img.shields.io/badge/Built%20With-React%2019%20%7C%20Vite%208%20%7C%20TypeScript-0284c7?style=for-the-badge)](https://vitejs.dev/)
[![Gemini Vision AI](https://img.shields.io/badge/AI%20Engine-Google%20Gemini%20Vision%20AI-8b5cf6?style=for-the-badge)](https://ai.google.dev/)
[![Leaflet Map](https://img.shields.io/badge/Campus%20Map-Leaflet%20%7C%20OpenStreetMap-16a34a?style=for-the-badge)](https://leafletjs.com/)

> **"Point your camera at any waste item. Get instant AI classification, bin recommendation, and exact campus drop-off guidance in seconds."**

EcoSnap is a mobile-first, AI-powered computer vision sustainability assistant engineered specifically for college campuses. It guides students from **camera capture** to **AI classification**, **stream mapping**, **bin recommendation**, **campus drop-off navigation**, **eco rewards**, and **carbon offset tracking**.

---

## 📸 The EcoSnap Flow (CAPTURE → CLASSIFY → MAP → GUIDE → SCORE)

```
[ 1. CAMERA CAPTURE ] 
        │
        ▼
[ 2. GEMINI VISION AI ] ──▶ Identifies item, material, confidence & rules
        │
        ▼
[ 3. DISPOSAL STREAM ] ──▶ Maps to Recyclable, Wet/Organic, Dry, or E-Waste
        │
        ▼
[ 4. RECOMMENDED BIN ] ──▶ Displays color-coded bin & preparation checklist
        │
        ▼
[ 5. CAMPUS LOCATION ] ──▶ Pinpoints nearest campus collection hub & Leaflet map
        │
        ▼
[ 6. ECO REWARDS & IMPACT ] ──▶ Awards +10 Eco Points, levels up tier, tracks CO₂e saved
```

---

## 🌟 Core Features & Innovations

### 🤖 1. Gemini Vision AI Multimodal Classification (`/api/analyze-waste`)
- Server-side integration with **Google Gemini Vision AI** (`gemini-3.6-flash` with fallback cascade).
- Analyzes camera captures or image uploads to detect exact item identity, material composition, waste stream, confidence score, preparation instructions, and safety hazard warnings.
- **Zero API Key Leakage**: API key remains strictly server-side in `.env` or Vercel environment variables.

### ♻️ 2. Automated Disposal Decision Trail & Preparation Checklist
- Explains the exact reasoning behind every AI decision:
  `ITEM (PET Plastic Bottle) → MATERIAL (PET Plastic) → STREAM (Recyclable) → BIN (Blue Recycling Bin) → CAMPUS LOCATION (Academic Block A)`
- Displays a tap-to-complete preparation checklist (e.g. *Empty liquids*, *Crush bottle*, *Separate cap*).

### ⚡ 3. Prominent E-Waste Hazard Warnings
- Detects hazardous electronic waste (batteries, cables, chargers, earphones) and displays a bold safety banner directing students to the **Central Library E-Waste Drop Box** to prevent municipal landfill contamination.

### 📍 4. Campus-Aware Disposal Navigation & Leaflet Map (`CampusView.tsx`)
- Maps classified waste to actual campus collection hubs:
  - **Main Canteen Waste Hub** (30m away)
  - **Library E-Waste Drop Point** (120m away)
  - **Academic Block A Recycling Station** (250m away)
  - **Hostel Zone Organic Composter** (400m away)
  - **Sports Complex Beverage Recycler** (500m away)
- **Interactive OpenStreetMap / Leaflet Map**: Smoothly highlights target disposal location markers without requiring proprietary API keys.

### 🏆 5. Eco Points Gamification & Sustainability Tiers
- **Eco Points**: Earns +10 Eco Points per confirmed valid waste disposal.
- **Sustainability Tiers**:
  - `🌿 Eco Starter` (0–49 pts)
  - `🌱 Green Learner` (50–149 pts)
  - `🏆 Eco Champion` (150–299 pts)
  - `🌍 Planet Protector` (300+ pts)
- Displays active recycling streaks and real-world equivalencies (e.g., smartphone charges saved, LED bulb hours powered).

### 📊 6. Waste Stream Analytics & Persistent History
- **Stream Distribution Analytics**: Calculates exact item counts and percentage breakdowns across Recyclable, Wet, Dry, and E-Waste streams with animated CSS proportion bars.
- **Persistent Scan History**: Safely stores all past scans in `localStorage` with validation against corrupted data. Includes multi-field search and stream filter controls.

---

## 🏗️ Technical Architecture & Stack

- **Frontend**: React 19, Vite 8, TypeScript 6
- **Styling**: Tailwind CSS v4, Lucide Icons, Warm Ivory / Forest Green Sustainability palette
- **AI Engine**: Google Gemini Vision AI (`gemini-3.6-flash`) via serverless backend
- **Mapping**: Leaflet 1.9 & OpenStreetMap
- **State & Persistence**: React Hooks + LocalStorage
- **Deployment**: Vercel-ready Serverless API structure (`/api/analyze-waste.js`)

---

## 🛠️ Local Setup & Environment Configuration

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### 2. Installation & Setup

```bash
# Clone repository
git clone https://github.com/singhjay0026/EcoSnap-Waste-Classifier.git
cd EcoSnap-Waste-Classifier

# Install dependencies
npm install
```

### 3. Environment Variables
Create a `.env` file in the project root:

```env
# Gemini API Key (Server-side execution only)
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=3001
```

> ⚠️ **Security Note**: Never commit your `.env` file or expose `GEMINI_API_KEY` to client-side code. `.env` is listed in `.gitignore`.

### 4. Running Locally

```bash
# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Production Build

```bash
# Compile TypeScript & build bundle
npm run build
```

---

## 🚀 Vercel Deployment

EcoSnap is pre-configured for instant Vercel deployment:

1. Push your repository to GitHub.
2. Import project into Vercel dashboard.
3. Add environment variable `GEMINI_API_KEY` in Vercel Settings $\rightarrow$ Environment Variables.
4. Deploy! The `/api/analyze-waste` endpoint automatically routes to Vercel Serverless Functions.

---

## 📄 Final Verification & Quality Checklist

- [x] Production build passes cleanly (`npm run build`)
- [x] Zero TypeScript errors
- [x] Multimodal Gemini Vision AI backend integration
- [x] Server-side API key protection
- [x] Campus-aware disposal mapping & Leaflet interactive map
- [x] Eco Points & Sustainability Tier progression system
- [x] Animated CO₂ impact & count-up counters
- [x] Waste Stream Breakdown analytics
- [x] Persistent scan audit trail with search & filtering
- [x] Responsive layout (Mobile, Tablet, Desktop)
- [x] `prefers-reduced-motion` accessibility support
- [x] PWA manifest & Vercel deployment configuration

---

*EcoSnap — Built for College Sustainability & Eco Hackathons 2026.*
