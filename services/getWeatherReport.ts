import axios, { AxiosRequestConfig } from "axios"
import { API_KEY } from "@/constants/api"
import { BASE_URL } from "@/constants/urls"
import { WeatherApiResponse } from "@/services/models/weather-data"

export async function getWeatherReport(query: string): Promise<WeatherApiResponse> {
    if (!API_KEY) {
        throw new Error("API_KEY is missing. Please set it in your environment variables.")
    }

    const options: AxiosRequestConfig = {
        method: "GET",
        url: `${BASE_URL}/forecast.json`,
        params: {
            key: API_KEY,
            q: query,
            days: 14,
            aqi: "yes",
            alerts: "no",
        },
    }

    try {
        const response = await axios.request<WeatherApiResponse>(options)
        // console.log(`Weather API call success: ${JSON.stringify(response.data)}`)
        return response.data
    } catch (error) {
        console.error("Error fetching weather data:", error)
        throw error
    }
}

getWeatherReport("Ranchi")