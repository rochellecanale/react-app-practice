import React, { useEffect }  from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider  } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function Projects() {

    const queryClient = new QueryClient()
    const location = useLocation()
    const menuLabel = {
        selected: 'inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white',
        unSelected: 'inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3'
    }
    const menuList = [
        { 
            link: 'weather-app', 
            label: 'Weather App',
            class: location.pathname == '/mini-projects/weather-app' ? menuLabel.selected : menuLabel.unSelected
        },
        { 
            link: 'photo-gallery', 
            label: 'Photo Gallery',
            class: location.pathname == '/mini-projects/photo-gallery' ? menuLabel.selected : menuLabel.unSelected
        },
        { 
            link: 'todo-list', 
            label: 'Legendary Todo List',
            class: location.pathname == '/mini-projects/todo-list' ? menuLabel.selected : menuLabel.unSelected
        },
        { 
            link: 'pokedex', 
            label: 'Pokedex',
            class: location.pathname == '/mini-projects/pokedex' ? menuLabel.selected : menuLabel.unSelected
        },
        { 
            link: 'shopping-cart', 
            label: 'Shopping Cart',
            class: location.pathname == '/mini-projects/shopping-cart' ? menuLabel.selected : menuLabel.unSelected
        }
    ]

    useEffect(() => {
        console.log('location', location.pathname)
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            <ul className="flex mt-5 ml-5">
                { menuList.map(menu => (
                    <li className="mr-6" key={ menu.link }>
                        <Link className={ menu.class } to={ menu.link }>{ menu.label }</Link>
                    </li>
                ))}
            </ul>
                
            <div className="container mx-auto">
                <div className="columns-auto p-10 px-4">
                    <Outlet />
                </div>
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default Projects
