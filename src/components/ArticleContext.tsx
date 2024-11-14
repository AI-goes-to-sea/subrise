import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import React from 'react';

interface ArticleContextProps {
  meta: {
    title: string;
    description: string;
    tag?: string;  // 使tag成为可选属性
  };
  content: string;
}

function removeSquareBrackets(text: string): string {
  return text.replace(/[【】]/g, '');
}

export default function ArticleContext({ meta, content }: ArticleContextProps) {
  const tags = meta.tag ? meta.tag.split(',').map(tag => tag.trim()) : [];

  // 移除内容中的所有一级标题
  const processedContent = content.replace(/^# .*$/gm, '').trim();

  return (
    <article className="prose lg:prose-xl py-10 dark:prose-invert dark:[&_*]:text-white">
      <h1 className="text-black dark:text-white">{meta.title}</h1>
      <p className="text-zinc-500 text-lg dark:text-white">{meta.description}</p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="inline-block px-2 py-1 text-sm font-semibold text-white bg-orange-500 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}
      <hr className="my-4 border-t border-zinc-200" />
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({node, ...props}) => {
            const inputElement = node?.children[0] as HTMLInputElement;
            const id = removeSquareBrackets(inputElement.value).toLowerCase().replace(/\s+/g, '-');
            return (
              <>
                <h2 className="text-black dark:text-white" id={id} {...props}>{removeSquareBrackets(props.children as string)}</h2>
                <hr className="my-3 border-t border-zinc-200" />
              </>
            );
          },
          h3: ({node, ...props}) => {
            const inputElement = node?.children[0] as HTMLInputElement; 
            const id = removeSquareBrackets(inputElement.value).toLowerCase().replace(/\s+/g, '-');
            return (
              <>
                <h3 className="text-black dark:text-white" id={id} {...props}>{removeSquareBrackets(props.children as string)}</h3>
                <hr className="my-2 border-t border-zinc-200" />
              </>
            );
          },
          h4: ({node, ...props}) => {
            const inputElement = node?.children[0] as HTMLInputElement;   
            const id = removeSquareBrackets(inputElement.value).toLowerCase().replace(/\s+/g, '-');
            return (
              <>
                <h4 className="text-black dark:text-white" id={id} {...props}>{removeSquareBrackets(props.children as string)}</h4>
                <hr className="my-2 border-t border-zinc-200" />
              </>
            );
          },
          h5: ({node, ...props}) => {
            const inputElement = node?.children[0] as HTMLInputElement;     
            const id = removeSquareBrackets(inputElement.value).toLowerCase().replace(/\s+/g, '-');
            return (
              <>
                <h5 className="text-black dark:text-white" id={id} {...props}>{removeSquareBrackets(props.children as string)}</h5>
                <hr className="my-1 border-t border-zinc-200" />
              </>
            );
          },
          h6: ({node, ...props}) => {
            const inputElement = node?.children[0] as HTMLInputElement;
            const id = removeSquareBrackets(inputElement.value).toLowerCase().replace(/\s+/g, '-');
            return (
              <>
                <h6 className="text-black dark:text-white" id={id} {...props}>{removeSquareBrackets(props.children as string)}</h6>
                <hr className="my-1 border-t border-zinc-200" />
              </>
            );
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </article>
  );
}