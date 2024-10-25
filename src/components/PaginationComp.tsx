"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination"
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";

interface PaginationCompProps {
  total: number;
  currentPage: number;
  onChange?: (page: number) => void;
}

const PaginationComp: React.FC<PaginationCompProps> = React.memo(({
  total = 20,
  currentPage = 1,
  onChange,
}) => {

  const t = useTranslations('Components.pagination');

  const handlePageChange = (page: number) => {
    if (page < 1) {
      page = 1;
      return;
    };
    if (page > total) {
      page = total
      return;
    }
    if (onChange) onChange(page);
  }

    // 计算显示的页码范围
  const startPage = Math.max(2, currentPage - 2);
  const endPage = Math.min(total - 1, currentPage + 2);

  return (
    <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious className="text-zinc-500 dark:text-white" previous="" href="#" onClick={() => handlePageChange(currentPage - 1)} />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink className={
                cn('h-8 w-8 md:h-10 md:w-10 text-zinc-500 dark:text-white', currentPage === 1 ? 'bg-zinc-100 dark:bg-white dark:text-zinc-500' : '')} 
                href="#" 
                onClick={() => handlePageChange(1)}
              >1</PaginationLink>
            </PaginationItem>

            {
              currentPage > 4 && (  
                <PaginationItem className="hidden md:flex group text-zinc-500 dark:text-white w-5 h-5 md:w-10 md:h-10 items-center justify-center" onClick={() => {
                  if (currentPage - 5 >= 1) {
                    handlePageChange(currentPage - 5);
                  } else {
                    handlePageChange(1);
                  }
                }}>
                  <PaginationEllipsis className="flex items-center group-hover:hidden"/>
                  <ChevronsLeft className="hidden w-5 h-5 md:w-10 md:h-10 font-medium rounded-md py-3 items-center group-hover:flex group-hover:bg-accent"/>
                </PaginationItem>
              )
            }

            
          {
            Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
              <PaginationItem className="text-zinc-500 dark:text-white" key={page}>
                <PaginationLink 
                  href="#"
                  className={cn(
                    'h-8 w-8 md:h-10 md:w-10',
                    currentPage === page ? 'bg-zinc-100 text-zinc-500' : '',
                    page >= currentPage + 2 || page < currentPage - 3 ? 'hidden' : ''
                  )}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))
          }


            
            {
              currentPage < total - 3 && (  
                <PaginationItem className="group hidden md:flex text-zinc-500 dark:text-white w-5 h-5 md:w-10 md:h-10 items-center justify-center" onClick={() => {
                  if (currentPage + 5 < total) {
                    handlePageChange(currentPage + 5);
                  } else {
                    handlePageChange(total);
                  }
                }}>
                  <PaginationEllipsis className="flex items-center group-hover:hidden"/>
                  <ChevronsRight className="hidden w-5 h-5 md:w-10 md:h-10 font-medium rounded-md py-3 items-center group-hover:flex group-hover:bg-accent"/>
                </PaginationItem>
              )
            }

            {
              total > 1 && (
                <PaginationItem>
                  <PaginationLink className={cn('h-8 w-8 md:h-10 md:w-10 text-zinc-500 dark:text-white', currentPage === total ? 'bg-zinc-100 dark:bg-white dark:text-zinc-500' : '')} href="#" onClick={() => handlePageChange(total)}>{total}</PaginationLink>
                </PaginationItem>
              )
            }
            

            <PaginationItem className="hidden md:block">
              <section className="flex items-center text-zinc-500 dark:text-white ml-3">
                <span className="text-sm font-medium">{t('jump')}</span>
                <Input 
                  type='number' 
                  min={1} 
                  max={total} 
                  className='flex-1 ml-2 dark:border-white' 
                  onInput={(e) => {
                    const value = parseInt(e.currentTarget.value)
                    if (value < 1) e.currentTarget.value = '1'
                    if (value > total) e.currentTarget.value = total.toString()
                  }}
                  onBlur={(e) => {
                    const value = parseInt(e.currentTarget.value)
                    if (!value) return;
                    handlePageChange(value);
                    e.currentTarget.value = '';
                  }}
                />
              </section>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext className="text-zinc-500 dark:text-white" next="" href="#" onClick={() => handlePageChange(currentPage + 1)}/>
            </PaginationItem>            
          </PaginationContent>
        </Pagination>
  )
})

export default PaginationComp;