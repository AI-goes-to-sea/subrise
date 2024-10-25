import { Skeleton } from "./ui/skeleton";
import React from 'react';

export default function ConceptsSkeleton() {
  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto min-h-screen">
      <Skeleton className="md:w-1/4 md:mr-8 bg-white" />
      <div className="flex-1 *:bg-white *:mb-5 *:h-1/3">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  )
}