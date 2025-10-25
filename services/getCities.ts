import axios, { AxiosResponse } from "axios"
import { API_KEY } from "@/constants/api"
import { BASE_URL } from "@/constants/urls"
import { LocationSearchResponse } from "@/services/models/cities"

export async function getCities(query: string): Promise<LocationSearchResponse> {
    const options = {
        method: "GET",
        url: `${BASE_URL}/search.json`,
        params: {
            key: API_KEY,
            q: query,
        },
    }

    try {
        const response: AxiosResponse<LocationSearchResponse> =
            await axios.request<LocationSearchResponse>(options)

        console.log("City search API success:\n", JSON.stringify(response.data, null, 2))
        return response.data
    } catch (error) {
        console.error("Error fetching cities:", error)
        throw error
    }
}

getCities("Ranchi").then((cities) => console.log(cities))
