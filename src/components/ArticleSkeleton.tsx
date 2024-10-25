import { Skeleton } from "./ui/skeleton";
import React from "react";
export default function ArticleSkeleton() {

  return (
    <div className="flex flex-1 flex-col justify-between">
        {
          new Array(3).fill(0).map((_, index) => (
            <div className="flex flex-1 flex-col space-y-8" key={`article_sketch_${index}`} >
              <div className="flex justify-between items-center p-6 bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
                <div className="flex flex-1">
                  <div className="flex-1">
                    <h2 className="text-xl leading-8 font-bold text-gray-800 relative line-clamp-1">
                      <Skeleton className="text-xl h-8 leading-8 font-bold text-gray-800" />
                    </h2>
                    <Skeleton className="text-slate-600 h-[72px] text-sm leading-6 line-clamp-3 mt-2"></Skeleton>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Skeleton className="inline-block px-2 py-1 text-xs font-semibold text-white h-6 w-12 rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="w-20 h-20 bg-pink-200 ml-5"></div>
              </div>
            </div>
          ))
        }
    </div>
  );
}