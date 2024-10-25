import React from 'react';

interface TagCompProps {
  tags: string[];
}

export default function TagComp({ tags }: TagCompProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag, index) => (
        <span key={index} className="inline-block px-2 py-1 text-xs shadow-sm ring-2 ring-zinc-200 text-orange-500 bg-white rounded-full">{tag}</span>
      ))}
    </div>
  );
} 