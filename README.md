# 🌦️ Weather Forecast App

A **cross-platform weather application** built with **React Native (Expo)**, **TypeScript**, and a lightweight **FastAPI backend proxy** for secure weather data fetching.  
It provides **real-time weather updates**, **hourly and weekly forecasts**, and a clean, dynamic UI that adapts to current conditions.

---

## 🚀 Features

- 🌍 **City Search with Auto-Suggestions** — search for any city with a debounced API call.  
- ☀️ **Current Weather** — temperature, condition, and location-based background imagery.  
- 🕓 **Hourly Forecast** — visual temperature trends throughout the day.  
- 📅 **14-Day Weekly Forecast** — extended weather data with icons and min/max values.  
- ⚙️ **Settings Screen** — switch between Celsius and Fahrenheit.  
- 💾 **Global Context Management** — stores user preferences and location globally.  
- 🧠 **Custom FastAPI Proxy** — protects your WeatherAPI key and handles API requests.  
- 🎨 **Responsive UI** — adaptive layout for both Android and iOS using Expo.

---

## 🧩 Tech Stack

### Frontend
- **React Native (Expo Router)**
- **TypeScript**
- **Expo Google Fonts**
- **React Context API**
- **Axios** for API calls

### Backend
- **FastAPI** (Python)
- **HTTPX** for async API requests
- **CORS middleware**
- **Deployed on Render / Railway**

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/pranav5127/weatherForcast.git
cd weatherForcast
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create an `.env` File
```bash
EXPO_PUBLIC_API_URL=http://localhost:5000
```

> The frontend uses this variable to connect to the backend proxy.

### 4. Start the FastAPI Backend
Go into the backend folder and run:

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 5000
```

### 5. Start the Expo App
```bash
npx expo start
```

Scan the QR code with the Expo Go app (Android/iOS) or open it in an emulator.

---

## 🔒 API Proxy Setup (FastAPI)

Your backend safely proxies all requests to [WeatherAPI](https://www.weatherapi.com/):

```python
@app.get("/search.json")
async def search_city(q: str = Query(...)):
    async with httpx.AsyncClient() as client:
        params = {"key": API_KEY, "q": q}
        res = await client.get(f"{BASE_URL}/search.json", params=params)
        return res.json()
```

This prevents exposing the API key in the mobile app.

---

## 📱 Demo

🎥 **Loom Walkthrough:**  
[https://www.loom.com/share/d7aa7bc630f14b32a59035a595e2c728](https://www.loom.com/share/d7aa7bc630f14b32a59035a595e2c728)

---

## 🧭 Future Improvements
- Offline caching using **React Query** or local storage  
- Add animations with **Reanimated**  
- Push notifications for weather alerts  
- Unit testing with **Jest**

---

## 💡 Author

**Pranav Kumar**  
[GitHub](https://github.com/pranav5127) • [LinkedIn](https://linkedin.com/in/pranav5127)

---

> Built with ❤️ using React Native & FastAPI
