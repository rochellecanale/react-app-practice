import React from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { fetchGallery } from '../../services/galleryAPI'

function GalleryApp() {

    const [start, setStart] = useState(0)
    const [limit, setLimit] = useState(50)
    const [queryKey, setQueryKey] = useState('dogs')
    //_start=0&_limit=5

    const {
        isLoading,
        isError,
        error,
        data: galleries
    } = useQuery({
        queryKey: ['galleries', { start: start, limit: limit, query: queryKey }],
        queryFn: fetchGallery
    })

    const handleChange = (event) => {
        const data = event.target.value
        setQueryKey(data)
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
                        { isError && <p>Failed to fetch record.</p> }
                        { !isLoading && galleries.photos && galleries.photos.map(d => 
                            <div className="flex flex-wrap w-1/3" key={d.alt}>
                                <div className="w-full p-1 md:p-2">
                                    <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                                        src={ d.src.medium } alt={d.alt} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>


        </div>
    )
}

export default GalleryApp
