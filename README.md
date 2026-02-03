# 🐾 Reencuentro

**Reencuentro** is a community-driven platform designed to help reunite lost pets with their owners and facilitate pet adoptions across Uruguay.

## ✨ Features

- 📍 **Report Lost Pets** - Notify the community when your pet goes missing with photos and location details
- 🔍 **Report Found Pets** - Help lost animals find their way home by reporting pets you've found
- 🏠 **Adoption Listings** - Foster homes can list pets available for adoption
- 📱 **Location-Based Notifications** - Get alerted when pets are reported near you
- ⏱️ **Time-Based Urgency** - Visual indicators showing how long a pet has been missing

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Node.js + Express (separate service), Supabase (PostgreSQL + Auth + Real-time)
- **Storage**: Cloudflare R2 (image hosting)
- **Mapping**: PostGIS for geographic queries
- **Deployment**: Vercel (Frontend), Railway/Render/Heroku (Backend)

## 📁 Project Structure

```
reencuentro/
├── src/              # Next.js frontend
├── backend/          # Node.js backend API
│   ├── src/
│   │   ├── routes/   # API routes
│   │   ├── lib/      # Utilities (R2, Supabase)
│   │   └── middleware/ # Auth middleware
│   └── package.json
└── package.json      # Frontend dependencies
```

## 🚀 Getting Started

### Frontend Setup
1. Install dependencies: `npm install`
2. Create `.env.local` with your Supabase and backend URL
3. Run: `npm run dev`

### Backend Setup
1. Navigate to backend: `cd backend`
2. Install dependencies: `npm install`
3. Create `.env` with R2, Supabase, and server config
4. Run: `npm run dev`

See `backend/README.md` for detailed backend setup instructions.

