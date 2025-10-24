import axios, { AxiosRequestConfig } from "axios"
import { API_KEY } from "@/constants/api"
import {WeatherApiResponse} from "@/services/models/weather-data"
import {BASE_URL} from "@/constants/urls"


export async function getWeatherReport(city: string): Promise<WeatherApiResponse> {
    if (!API_KEY) {
        throw new Error("API_KEY is missing. Please set it in your environment variables.")
    }

    const options: AxiosRequestConfig = {
        method: "GET",
        url: BASE_URL,
        params: {
            key: API_KEY,
            q: city,
            aqi: "no",
        },
    }

    try {
        const response = await axios.request<WeatherApiResponse>(options)
        console.log("Weather API call success:", {
            city: response.data.location.name,
            temperature: response.data.current.temp_c,
            condition: response.data.current.condition.text,
        })
        return response.data
    } catch (error) {
        console.error("Error fetching weather data:", error)
        throw error
    }
}

getWeatherReport("Ranchi")