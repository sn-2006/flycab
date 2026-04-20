# flycab

A webpage that is similar to rapido but vehicles moves in air!

# FlyCab

FlyCab is a web application for booking autonomous flying taxi rides.
Users can select a start and destination point on a map, choose a ride tier, and view their booking history.

---

## Features

- User authentication (signup and login)
- Map-based selection of start and destination (Leaflet)
- Distance calculation between points
- Multiple taxi tiers (economy, premium, luxury)
- Fare calculation based on distance and tier
- Ride booking
- Ride history per user

---

## Tech Stack

- Frontend: React, TypeScript, Vite
- Styling: Tailwind CSS
- Maps: Leaflet.js
- Backend & Database: Supabase

---

## Setup

### 1. Clone the repository

```
git clone https://github.com/sn-2006/flycab.git
cd flycab
```

### 2. Install dependencies

```
npm install
```

### 3. Create environment file

Create a `.env` file in the root folder:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Run the application

```
npm run dev
```

---

## Project Structure

```
src/
 ├── components/
 ├── pages/
 ├── hooks/
 ├── lib/
 ├── integrations/
```

---

## Notes

- Requires a Supabase project with authentication enabled
- Bookings are stored in a Supabase table
