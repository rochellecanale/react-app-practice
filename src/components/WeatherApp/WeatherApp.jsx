import React from 'react'
import { useQuery } from 'react-query'
import { getCurrentWeather } from '../../services/weatherAPI'

function WeatherApp() {

    const { 
        isLoading, 
        isError, 
        error, 
        data: weather
    } = useQuery('weatherData', getCurrentWeather)

    console.log('weather', weather)

    let content
    if(isLoading) {
        content = <p>Loading Data. Please Wait.</p>
    } else if(isError) {
        console.log(error)
        content = <p>Failed to fetch data.</p>
    } else {
        content = 
            <div className="p-5">
                <hr />
                <h4 className="mt-5 text-xl font-extrabold">Current Location: { weather.address }</h4>
                <h4>Latitude: { weather.latitude }</h4>
                <h4>Longitude: { weather.longitude }</h4>
                <h4 className="text-large">Desription: { weather.description }</h4>
                <h4>Current Condition: { weather.currentConditions.conditions }</h4>
            </div>
    }

    return (
        <>
            <h1 className="text-center text-3xl antialiased">Weather App</h1>
            <input type="text" placeholder="Enter a city here..." class="form-input px-4 py-3 mt-5 mb-5" />
            <button className="ml-5 p-3 bg-orange-700 hover:bg-orange-300">Check weather</button>
            { content }
        </>
    )
}

export default WeatherApp
