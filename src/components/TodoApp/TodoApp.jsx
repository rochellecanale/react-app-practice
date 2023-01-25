import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { 
    fetchTodos, 
    postTodos, 
    changeStatus,
    deleteTodo } from '../../services/jsonPlaceholderAPI'

function TodoApp() {

    const queryClient = useQueryClient()
    const [todo, setTodo] = useState('')
    const [pageCount, setPageCount] = useState(1)
    const [limitCount, setLimitCount] = useState(5)

    const {
        isLoading,
        isFetched,
        isError,
        error,
        data: todos
    } = useQuery({
        queryKey: ['todos', { page: pageCount, size: limitCount }],
        queryFn: fetchTodos
    })

    const doneTodoText = "line-through text-green-600"
    const notDoneButton = "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
    const doneButton = "border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white"

    const handleChange = (e) => {
        setTodo(e.target.value)
    }

    const toggleDone = useMutation({
        mutationFn: changeStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['todos']
            })
        },
        onError: e => {
            console.error(e)
        }
    })

    const toggleDelete = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['todos']
            })
        },
        onError: e => {
            console.error(e)
        }
    })

    const handleSubmit = useMutation({
        mutationFn: postTodos,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['todos']
            })
            setTodo('')
        },
        onError: e => {
            console.error(e)
        }
    })

    const submitData = () => {
        if(!todo) {
            return
        }
        handleSubmit.mutate({
            title: todo,
            completed: false
        })
    }

    const handlePaginate = () => {
        setPageCount(prev => prev + 1)
        setLimitCount(prev => prev + 5)
    }

    return (
        <>
            <div className="h-100 w-full flex items-center justify-center bg-neutral-200 font-sans">
                <div className="bg-white w-full lg:w-3/4 lg:max-w-lg p-6 m-4">
                    <h1 className="text-center text-3xl antialiased">Todo List</h1>
                    <div className="mb-4">
                        <div className="flex mt-4">
                            <input 
                                className="shadow appearance-none border rounded 
                                w-full py-2 px-3 mr-4 text-grey-darker" 
                                placeholder="Add Todo"
                                onChange={handleChange}
                                value={todo}
                            />
                            <button className="flex-no-shrink p-2 border-2 rounded 
                                    text-teal border-fuchsia-500 hover:text-white hover:text-cyan-900"
                                    onClick={ () => submitData() }>Add
                            </button>
                        </div>
                    </div>
                    <div>

                        { isFetched && todos.map( data => 
                            <div className="flex mb-4 items-center" key={data.id}>
                                <p className={`w-full text-grey-darkest ${ data.completed ? doneTodoText : "" }`}>{ data.title }</p>
                                <button onClick={() => toggleDone.mutate({ id: data.id, completed: !data.completed })} className={`flex-no-shrink p-2 ml-4 mr-2 border-2 rounded ${ data.completed ? doneButton : notDoneButton } `}>{ !data.completed ? 'Done' : 'Not Done'}</button>
                                <button onClick={() => toggleDelete.mutate({ id: data.id })} className="flex-no-shrink p-2 ml-2 border-2 border-rose-600 rounded text-red text-rose-600 hover:text-white hover:bg-rose-600">Remove</button>
                            </div>
                        )}

                    </div>

                    <div className="mb-4">
                        <div className="flex mt-4 align-center justify-center">
                            <button 
                                className="rounded bg-rose-600 text-white px-4 py-2 mt-5"
                                onClick={() => handlePaginate() }
                            >Load More</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoApp
