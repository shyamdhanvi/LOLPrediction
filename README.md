# 🧠 League of Legends Win Prediction - ML Based Web App

This project is a **Machine Learning-based web application** that predicts the **outcome of a League of Legends game** using champion-player experience and in-game statistics. It leverages live and historical match data to enhance prediction accuracy across various regions.

## 🔍 Overview

The app utilizes:
- **Gradient Boosting (GBoost)** ML algorithm for win prediction
- **Live match data** fetched using Riot Games API and third-party data providers
- A simple and intuitive **React.js** frontend
- A lightweight **Flask** backend serving the ML model

Due to legal restrictions, the training data (CSV files) are not publicly included in this repository.

---

## 🧪 Tech Stack

| Layer        | Technology            |
|--------------|------------------------|
| Frontend     | React.js               |
| Backend      | Flask (Python)         |
| ML Algorithm | Gradient Boosting (GBoost) |
| Data Source  | Riot Games API + Third-party APIs |
| Deployment   | (Optional: add Heroku/Render if used) |

---

## 🚀 Features

- 🔁 **Live Match Prediction** – Predict the win probability of an ongoing or upcoming match
- 📊 **Region-Based Data** – Trained on matches across different regions (e.g., NA, EUW, KR)
- 🧠 **Champion-Player Experience** – Integrates player expertise and role performance
- ⚡ **Fast & Responsive** – Frontend built with React for a seamless user experience

---

## 📦 How It Works

1. **Frontend (React):**
   - User inputs a summoner name and region
   - Data is fetched from the backend and presented in an interactive UI

2. **Backend (Flask):**
   - Fetches live or historical match data
   - Preprocesses input for the ML model
   - Returns prediction results

3. **ML Model (GBoost):**
   - Trained on curated match datasets
   - Takes in champion IDs, player stats, and other features to predict win rate

---

## ⚠️ Disclaimer

- This project is **educational** and **non-commercial**.
- All data was gathered using the **official Riot API** and permitted third-party tools.
- Training datasets are **not included** due to legal limitations on redistribution.

---

## 📁 Project Structure

```bash
I have included the file structure in the file tree_file_structure.tx

```bash
if you have any doubts feel free to reach out to my linkedIn profile and gmail


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
