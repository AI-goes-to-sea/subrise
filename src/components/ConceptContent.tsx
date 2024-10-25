import React from 'react';

interface ConceptContentProps {
  concepts: Record<string, any>[];
}

const decorationSizes = ['w-16 h-16', 'w-24 h-24', 'w-32 h-32', 'w-40 h-40'];
const decorationPositions = [
  'top-0 right-0',
  'bottom-0 left-0',
  'top-1/4 left-1/4',
  'bottom-1/4 right-1/4',
];

export default function ConceptContent({ concepts }: ConceptContentProps) {
  return (
    <div className="space-y-8 relative z-0">
      {concepts?.map((concept, index) => {
        // const size = decorationSizes[index % decorationSizes.length];
        // const position = decorationPositions[index % decorationPositions.length];
        return (
          <div key={index} id={`concept-${index}`} className="bg-white p-6 rounded-lg shadow-md relative overflow-hidden border">
            {/* <svg className={`absolute ${position} ${size} text-reddit-orange opacity-5`} fill="currentColor" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" />
            </svg> */}
            <h2 className="text-2xl text-black font-bold mb-4 relative z-10">{concept.question}</h2>
            <hr className="border-t border-zinc-200 mb-4" />
            <div 
              className="prose max-w-none relative z-10"
              dangerouslySetInnerHTML={{ 
                __html: concept.answer
              }} 
            />
          </div>
        );
      })}
    </div>
  );
}