import axios from 'axios'
import { createClient } from 'pexels'

const jsonPlaceholderAPI = axios.create({
    baseURL: import.meta.env.VITE_PEXELS_URL
})

export const config = {
    headers: {
        Authorization: import.meta.env.VITE_PEXELS_API_KEY
    }
}

export const fetchGallery = async ({ queryKey }) => {
    const query = queryKey[1].query;
    const pageStart = queryKey[1].start ? queryKey[1].start : 0
    const pageLimit = queryKey[1].limit ? queryKey[1].limit : 50
    const response = await jsonPlaceholderAPI.get(`/search?query=${query}?page=${pageStart}&per_page=${pageLimit}`, config)
    return response.data
}

export default jsonPlaceholderAPI