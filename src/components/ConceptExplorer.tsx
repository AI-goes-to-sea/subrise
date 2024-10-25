'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Concept {
  name: string
  explanation: string
}

interface ConceptExplorerProps {
  concepts: Concept[]
}

export default function ConceptExplorer({ concepts }: ConceptExplorerProps) {
  const [activeConcept, setActiveConcept] = useState<number | null>(null)
  const [popupPosition, setPopupPosition] = useState({ top: false, left: false })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeConcept !== null && containerRef.current) {
      const container = containerRef.current
      const button = container.children[activeConcept] as HTMLElement
      const containerRect = container.getBoundingClientRect()
      const buttonRect = button.getBoundingClientRect()

      const isLastColumn = (activeConcept + 1) % 4 === 0 // Assuming 4 columns in large screens
      const isLastRow = activeConcept >= concepts.length - 4 // Assuming 4 columns in large screens

      setPopupPosition({
        top: isLastRow,
        left: isLastColumn,
      })
    }
  }, [activeConcept, concepts.length])

  return (
    <div ref={containerRef} className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {concepts.map((concept, index) => (
        <div key={index} className="relative">
          <motion.div
            className="w-full h-24 p-3 bg-white border border-zinc-200 text-black rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center"
            whileHover={{ scale: 1.03 }}
            onHoverStart={() => setActiveConcept(index)}
            onHoverEnd={() => setActiveConcept(null)}
          >
            <h3 className="text-sm text-black font-normal text-center">{concept.name}</h3>
          </motion.div>
          <AnimatePresence>
            {activeConcept === index && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`absolute z-10 ${
                  popupPosition.top ? 'bottom-full mb-2' : 'top-full mt-2'
                } ${
                  popupPosition.left ? 'right-0' : 'left-0'
                } p-4 bg-white border border-zinc-200 rounded-lg shadow-xl`}
                style={{ width: '250%', maxWidth: '400px' }}
              >
                <h4 className="text-lg font-semibold text-zinc-800 mb-2">{concept.name}</h4>
                <p className="text-zinc-500 text-sm">{concept.explanation}</p>
                <motion.div
                  className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}