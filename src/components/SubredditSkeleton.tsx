import { Skeleton } from "./ui/skeleton";
import React from 'react';

export default function SubredditSkeleton () {

  return (
    <div className={`rounded-lg border border-gray-200 overflow-hidden shadow-md hover:shadow-lg 
      transition-shadow duration-300 bg-gradient-to-br relative p-5
    `}>
      <div className="flex mb-4">
        <Skeleton className="mr-2 w-16 h-16 rounded-full bg-gray-200" />
        <div className="flex h-16 flex-col justify-between ml-2">
          <Skeleton className="text-lg font-bold text-gray-800 line-clamp-1" />
          <Skeleton className="text-sm text-gray-600 leading-4 line-clamp-2" />
          {/* <span className={`ml-auto text-2xl font-bold ${randomGradient.text}`}>#{subreddit.rank}</span> */}
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mt-4">
        <Skeleton className="bg-gray-200 text-gray-900 text-xs px-3 py-2 rounded-lg" />
      </div>

      <div className="flex justify-between items-center mt-4">
        <Skeleton className="text-sm font-medium text-gray-600" />
        <Skeleton className="flex items-center" />
      </div>
    </div>
  )
}