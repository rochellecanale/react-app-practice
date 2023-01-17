import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Routes, Route, Outlet } from 'react-router-dom'
import Header from './components/Layout/Header'
import Navbar from './components/Layout/Navbar'

import Home from '../src/pages/Home/Home'
import Profile from '../src/pages/Profile/Profile'
import Projects from '../src/pages/Projects/Projects'

import WeatherApp from '../src/components/WeatherApp/WeatherApp'
import GalleryApp from '../src/components/GalleryApp/GalleryApp'
import TodoApp from '../src/components/TodoApp/TodoApp'
import PokedexApp from '../src/components/PokedexApp/PokedexApp'
import CartApp from '../src/components/ShoppingCartApp/ShoppingCartApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-full">

      <Navbar />
      <Header />

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="h-96 rounded-lg border-4 border-dashed border-gray-200">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="mini-projects" element={<Projects />}>
                  <Route path="weather-app" element={<WeatherApp />} />
                  <Route path="photo-gallery" element={<GalleryApp />} />
                  <Route path="todo-list" element={<TodoApp />} />
                  <Route path="pokedex" element={<PokedexApp />} />
                  <Route path="shopping-cart" element={<CartApp />} />
                </Route>
                <Route path="profile" element={<Profile />} />
              </Routes>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}

export default App
