import React, { useState, useRef } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCurrentWeather } from '../../services/weatherAPI'

import SnowImage from '../../assets/images/weather/icons8-snow-storm-48.png'
import RainImage from '../../assets/images/weather/icons8-torrential-rain-48.png'
import FogImage from '../../assets/images/weather/icons8-fog-16.png'
import WindImage from '../../assets/images/weather/icons8-snow-storm-48.png'
import CloudyImage from '../../assets/images/weather/icons8-cloud-48.png'
import PartlyCloudDayImage from '../../assets/images/weather/icons8-partly-cloudy-53.png'
import PartlyCloudyNightImage from '../../assets/images/weather/icons8-night-40.png'
import ClearDayImage from '../../assets/images/weather/icons8-sun-48.png'
import ClearNightImage from '../../assets/images/weather/icons8-night-64.png'

function WeatherApp() {

    const queryClient = useQueryClient()
	const [state, setstate] = useState('');
    const [inputState, setInputState] = useState('Bulacan')
    const [isLoadingData, setIsLoadingData] = useState(false)
    const [weatherImg, setWeatherImg] = useState(null)
    const buttonRef = useRef()

	const { 
        isLoading, 
        isError, 
        error, 
        data: weather
    } = useQuery({
		queryKey: ['weather', { location: inputState }],
		queryFn: getCurrentWeather
	})

    const getWeatherImg = statusCondition => {

        let img = ''

        if(statusCondition == 'snow') {
            img = SnowImage
        } else if(statusCondition == 'rain') {
            img = RainImage
        } else if(statusCondition == 'fog') {
            img = FogImage
        } else if(statusCondition == 'wind') {
            img = WindImage
        } else if(statusCondition == 'cloudy') {
            img = CloudyImage
        } else if(statusCondition == 'partly-cloudy-day') {
            img = PartlyCloudDayImage
        } else if(statusCondition == 'partly-cloudy-night') {
            img = PartlyCloudyNightImage
        } else if(statusCondition == 'clear-day') {
            img = ClearDayImage
        } else if(statusCondition == 'clear-night') {
            img = ClearNightImage
        } else {
            img = ClearDayImage
        }
        
        return img

    }

    let content
    if(isLoading) {
        content = <p>Loading Data. Please Wait.</p>
    } else if(isError) {
        console.log(error)
        content = <p className="text-rose-500 mt-5">Failed to fetch data. <br /> { error.response.data }</p>
    } else {

        const statusCondition = weather.currentConditions.icon

        content = 
            <div className="p-5">
                <hr />
                <h4 className="mt-5 text-xl font-extrabold">Current Location: { weather.address }</h4>
                <h4>Resolved Address: <span className="font-bold">{ weather.resolvedAddress }</span></h4>
                <h4>Latitude: { weather.latitude }</h4>
                <h4>Longitude: { weather.longitude }</h4>
                <h4 className="text-large">Desription: { weather.description }</h4>
                <h4>Current Condition: { weather.currentConditions.conditions }</h4>
                <img src={ getWeatherImg(statusCondition) } 
                    className="border-solid border-sky-500 border-2 rounded h-40 w-40 mt-5" />
            </div>
    }

	const handleClick = (e) => {
        buttonRef.current.innerHTML = 'Loading Data...'
        const data = state == '' ? 'Bulacan' : state
        setInputState(data)
        if(weather) {
            buttonRef.current.innerHTML = 'Check Weather'
            console.log('t', buttonRef)
        }
	}

	const handleChange = (event) => {
        const data = event.target.value
 		setstate(data)
	}

    return (
        <>
            <h1 className="text-center text-3xl antialiased">Weather App</h1>
            <input 
				type="text" 
				placeholder="Enter a city here..." 
				className="form-input px-4 py-3 mt-5 mb-5" 
				onChange={handleChange} 
				value={state}
			/>
            <button 
                ref={buttonRef}
                disabled={isLoadingData}
				className="ml-5 p-3 bg-orange-700 hover:bg-orange-300" 
				onClick={handleClick}>Check Weather</button>
            { content }
        </>
    )
}

export default WeatherApp
