"use client";

import { Link } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { MdSearch } from 'react-icons/md';
import React from 'react';
import { useTranslations } from 'next-intl';

// interface Concept {
//   question: string;
//   answer: string;
// }

interface ConceptSidebarProps {
  concepts: Record<string, any>[];
}

function summarizeQuestion(question: string): string {
  const cleanedQuestion = question.replace(/^\d+\.\s*/, '').trim();
  
  if (cleanedQuestion.length <= 20) {
    return cleanedQuestion;
  }
  
  return cleanedQuestion.substring(0, 20) + '...';
}

export default function ConceptSidebar({ concepts }: ConceptSidebarProps) {
  const t = useTranslations('Pages.concepts');
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const conceptElements = concepts.map((_, index) => 
        document.getElementById(`concept-${index}`)
      );

      const currentIndex = conceptElements.findIndex((element) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= window.innerHeight / 2;
        }
        return false;
      });

      if (currentIndex !== -1) {
        setActiveIndex(currentIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化时调用一次

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [concepts]);

  const filteredConcepts = concepts?.filter(concept =>
    concept.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* <Head>
        <title>{tMeta('concepts_title')}</title>
        <meta name="description" content={tMeta('concepts_description')} />
      </Head> */}
      <nav className="bg-white mb-10 rounded-sm p-4 lg:sticky lg:top-28 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto">
        <h1 className="text-xl text-black font-bold mb-4">{t('title')}</h1>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder={t('search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-2 py-2 text-sm border rounded-md 
              focus:outline-none  focus:border-orange-500 focus:ring-1 focus:ring-orange-500
              dark:bg-white
            "
          />
          <MdSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <ul className="space-y-2">
          {filteredConcepts.map((concept, index) => (
            <li key={index}>
              <Link 
                href={`#concept-${index}`} 
                className={`block py-1 px-2 rounded transition-colors duration-200 ${
                  index === activeIndex 
                    ? 'bg-orange-500 text-white' 
                    : 'text-zinc-500 hover:bg-zinc-100'
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {summarizeQuestion(concept.question)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </> 
  );
}