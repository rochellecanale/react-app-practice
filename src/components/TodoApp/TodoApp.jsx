import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { fetchTodos } from '../../services/jsonPlaceholderAPI'

function TodoApp() {

    const queryClient = useQueryClient()
    const todos = useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos
    })

    console.log('todos', todos)

    return (
        <>
            <div className="h-100 w-full flex items-center justify-center bg-neutral-200 font-sans">
                <div className="bg-white w-full lg:w-3/4 lg:max-w-lg p-6 m-4">
                    <h1 className="text-center text-3xl antialiased">Todo List</h1>
                    <div className="mb-4">
                        <div className="flex mt-4">
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" />
                            <button className="flex-no-shrink p-2 border-2 rounded text-teal border-fuchsia-500 hover:text-white hover:text-cyan-900">Add</button>
                        </div>
                    </div>
                    <div>
                        <div className="flex mb-4 items-center">
                            <p className="w-full text-grey-darkest">Add another component to Tailwind Components</p>
                            <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-cyan-900 text-green border-green hover:bg-green">Done</button>
                            <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-cyan-900 hover:bg-red">Remove</button>
                        </div>
                        <div className="flex mb-4 items-center">
                            <p className="w-full line-through text-green">Submit Todo App Component to Tailwind Components</p>
                            <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-cyan-900 text-grey border-grey hover:bg-grey">Not Done</button>
                            <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-cyan-900 hover:bg-red">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoApp
