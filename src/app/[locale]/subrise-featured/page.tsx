'use client'

import { useState } from "react"

export default function SubriseFeatured() {

  const items = [
    'Domes', 'Castles', 'Barns', 'Houseboats', 'Mansions',
    'Windmills', 'Campers', 'Towers', 'Earth homes', 'Caves',
    'Containers', 'Cycladic homes', 'Ryokans', 'Trulli'
  ]
  const [scrollAmount, setScrollAmount] = useState(0)
  const scrollStep = 100 // 每次滚动的像素数

  const handleNext = () => {
    setScrollAmount(prev => prev + scrollStep)
  }

  const handlePrev = () => {
    setScrollAmount(prev => (prev - scrollStep < 0 ? 0 : prev - scrollStep))
  }

  return (
    <div className="relative flex items-center">
      <button onClick={handlePrev} className="absolute left-0 z-10 p-2 bg-gray-200 rounded-full hover:bg-gray-300">
        &lt;
      </button>
      <div className="overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-[200px] bg-gradient-to-r z-10 from-white to-transparent pointer-events-none" />
        <ul className="flex space-x-4 transition-transform duration-300" style={{ transform: `translateX(-${scrollAmount}px)` }}>
          {items.map(item => (
            <li key={item} className="flex items-center">{item}</li>
          ))}
        </ul>
        <div className="absolute right-0 top-0 bottom-0 w-[200px] bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
      <button onClick={handleNext} className="absolute right-0 z-10 p-2 bg-gray-200 rounded-full hover:bg-gray-300">
        &gt;
      </button>
    </div>
  )
}