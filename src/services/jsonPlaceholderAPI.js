import axios from 'axios'

const jsonPlaceholderAPI = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
})

export const fetchTodos = async () => {
    const response = await jsonPlaceholderAPI.get('/todos')
    return response.data;
}

export default jsonPlaceholderAPI;
