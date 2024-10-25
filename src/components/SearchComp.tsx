import { MdSearch } from 'react-icons/md'; // 导入搜索图标

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import React from 'react';
export default function SearchComp({
  placeholder = '搜索...',
  tags = [],
  ranks = [],
  subscribers = [],
}: {
  placeholder?: string;
  tags?: Record<string, any>[];
  ranks?: Record<string, any>[];
  subscribers?: Record<string, any>[];
}) {

  // console.log('search==>>', tags)
  return (
    <div className="
      mx-auto flex-wrap flex md:flex-col w-full sticky top-[80px] z-10 backdrop-blur-lg
      before:content-[''] before:absolute before:-top-3 before:-left-2 before:-right-2 before:-bottom-2 before:bg-white
    ">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full p-4 pl-16 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-reddit-orange focus:border-transparent"
        />
        <MdSearch className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4 mt-4 z-10">
        
        {
          tags.length > 0 && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4 mt-4 z-10">
              <div className=" md:justify-between md:space-x-4 space-x-2 mb-4 md:mb-0">
                {tags.map((tag, index) => (
                  <button
                    key={tag.id}
                    className={`px-2 md:px-1.5 lg:px-3 py-2 rounded-lg 
                      ${ index === 0  ? 'bg-[#FF4500] text-white'
                        : 'bg-gray-200 text-gray-700'
                      } 
                      hover:bg-[#FF5722] hover:text-white transition-colors duration-150
                    `}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
          )
        }
       
        <div className="flex items-center justify-center space-x-4">
          {
            ranks.length > 0 && (
              <Select>
                <SelectTrigger className="w-full md:w-[140px] lg:w-[180px] bg-white">
                  <SelectValue placeholder="排名范围" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            )
          }
          
          {
            subscribers.length > 0 && (
              <Select>
                <SelectTrigger className="w-full md:w-[140px] lg:w-[180px] bg-white">
                  <SelectValue placeholder="订阅数范围" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            )
          }
        </div>
      </div>
    </div>
  )
}