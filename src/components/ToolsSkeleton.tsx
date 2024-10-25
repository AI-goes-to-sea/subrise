
import React from 'react';
import { Skeleton } from "./ui/skeleton";

export default function ToolsSkeleton() {
  return (
    <div className="flex flex-col justify-between w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {
          new Array(3).fill(0).map((_, index) => (
            <div key={`tools_${index}`} className="flex flex-col space-y-3 shadow-md hover:shadow-lg transition-all duration-300 bg-white rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Skeleton className="w-16 h-16" />
                <div className="flex flex-1 flex-col space-y-2">
                  <Skeleton className="h-7 w-full" />
                  <Skeleton className="w-full h-5" />
                </div>
              </div>
              <Skeleton className="w-full h-5" />
            </div>
          ))
        }
      </div>
    </div>
  );
}