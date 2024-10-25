'use client'

import React, { useState } from 'react'
import conceptData from '@/data/concept/concept.json'
import ConceptExplorer from './ConceptExplorer'

export default function RedditQuickstartContent() {
  const [activeQuestion, setActiveQuestion] = useState(0)

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <ul className="space-y-2">
          {conceptData.map((item, index) => (
            <li key={index}>
              <button
                className={`w-full text-left p-2 rounded text-md dark:text-white
                  dark:hover:text-black
                  ${ activeQuestion === index ? 'bg-orange-500 text-white font-semibold dark:text-white dark:hover:text-white' : 'hover:bg-zinc-100 dark:text-white'
                }`}
                onClick={() => setActiveQuestion(index)}
              >
                {item.question}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:col-span-2">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">{conceptData[activeQuestion].question}</h2>
        <p className="mb-6 text-zinc-500 dark:text-white">{conceptData[activeQuestion].answer.description}</p>
        <ConceptExplorer concepts={conceptData[activeQuestion].answer.concepts} />
        {conceptData[activeQuestion].answer.notes && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">注意事项</h3>
            <ul className="list-disc list-inside *:dark:text-white">
              {conceptData[activeQuestion].answer.notes.map((note, index) => (
                <li key={index} className="text-zinc-500">{note.name}: {note.explanation}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}