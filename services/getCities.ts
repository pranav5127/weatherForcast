import axios, {AxiosResponse} from "axios";
import {API_KEY} from "@/constants/api";

interface Cities {
    [id: string]: string
}

async function getCities(): Promise<Cities> {
    const options = {
        method: "GET",
        url: 'https://weather.indianapi.in/india/cities',
        headers: {'X-Api-Key': API_KEY}
    }

    try {
        const response: AxiosResponse<Cities>  = await axios.request<Cities>(options)
        console.log(response)
        return response.data
    } catch (err) {
        console.log(err)
        throw new Error(`An error occurred ${err}`)
    }
}


getCities()