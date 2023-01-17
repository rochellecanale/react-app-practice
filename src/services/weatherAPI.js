import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API

const weatherAPI = axios.create({
    baseURL: import.meta.env.VITE_WEATHER_URL
})

export const getCurrentWeather = async ({ queryKey  }) => {
	const  location  = queryKey[1].location
    const customURL = `/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${API_KEY}&contentType=json`
    const response = await weatherAPI.get(customURL)
    return response.data
}

export default weatherAPI