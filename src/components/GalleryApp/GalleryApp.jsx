import React, {useState, useEffect} from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchGallery, fetchGalleryPerPage } from '../../services/galleryAPI'

function GalleryApp() {

    const queryClient = useQueryClient()
    const [start, setStart] = useState(0)
    const [limit, setLimit] = useState(6)
    const [queryKey, setQueryKey] = useState('dogs')
    const [nextPage, setNextPage] = useState('')
    const [prevPage, setPrevPage] = useState('')

    const {
        isLoading,
        isError,
        error,
        data: galleries,
        status
    } = useQuery({
        queryKey: ['galleries', {
            url: nextPage,
            start, 
            limit, 
            query: queryKey 
        }],
        queryFn: fetchGallery
    })

    useEffect(() => {
        if(status == 'success') {
            setNextPage(galleries.data.next_page ? galleries.data.next_page : '')
            setNextPage(galleries.data.prev_page ? galleries.data.prev_page : '')
        }
    }, [status])

    const handleChange = (event) => {
        const data = event.target.value
        setQueryKey(data)
	}

    const handleLoadMore = () => {
        
        // const {
        //     isLoading,
        //     isError,
        //     error,
        //     data: galleries,
        //     status
        // } = useQuery({
        //     queryKey: ['galleries', {
        //         url: nextPage,
        //         query: queryKey 
        //     }],
        //     queryFn: fetchGalleryPerPage
        // })

    }

    if(!isLoading) {
        //console.log('nextPage', nextPage)
        console.log('galleries', galleries)
    }

    return (
        <div>
            <h1 className="text-center text-3xl antialiased">Gallery App</h1>

            <div className="flex flex-col items-center justify-center">
                <input 
                    type="text" 
                    placeholder="Enter a city here..." 
                    className="form-input px-4 py-3 mt-5 mb-5" 
                    onChange={handleChange} 
                    value={queryKey}
                />
            </div>

            <section className="overflow-hidden text-gray-700 ">
                <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
                    <div className="flex flex-wrap -m-1 md:-m-2">

                        { isLoading && <p>Fetching list of photos...</p> }
                        { error && <p>Failed to fetch record. - { error }</p> }
                        { !isLoading && !isError && galleries.data.photos && galleries.data.photos.map(d => 
                            <div className="flex flex-wrap w-1/3" key={d.alt}>
                                <div className="w-full p-1 md:p-2">
                                    <img 
                                        className="block object-cover object-center w-full h-full rounded-lg"
                                        src={ d.src.medium } alt={d.alt} 
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32 flex justify-center">
                    <button
                        onClick={handleLoadMore} 
                        className="rounded font-medium bg-red-600 text-white p-3 align-center uppercase">
                        Load More
                    </button>
                </div>
            </section>


        </div>
    )
}

export default GalleryApp
