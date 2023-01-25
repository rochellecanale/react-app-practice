import axios from 'axios'

const jsonPlaceholderAPI = axios.create({
    // baseURL: 'https://jsonplaceholder.typicode.com/'
    baseURL: 'http://localhost:7000'
})

const config = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    }
}

export const fetchTodos = async ({ queryKey }) => {
    const { page, size } = queryKey[1]
    const response = await jsonPlaceholderAPI.get(`/todos?_page=${page}&_limit=${size}&_sort=id&_order=desc`)
    return response.data;
}

export const postTodos = async (payload) => {
    const response = await jsonPlaceholderAPI.post('/todos', payload, config)
    return response
}

export const changeStatus = async (payload) => {
    const { id, completed } = payload
    const response = await jsonPlaceholderAPI.patch(`/todos/${id}`, { completed }, config)
    return response
}

export const deleteTodo = async (payload) => {
    const { id } = payload
    const response = await jsonPlaceholderAPI.delete(`/todos/${ id }`)
    return response

}

export default jsonPlaceholderAPI;
