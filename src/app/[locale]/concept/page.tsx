import ConceptSidebar from "@/components/ConceptSidebar";
import ConceptContent from "@/components/ConceptContent";
import { getConcepts } from "@/server/concepts";

export const runtime = 'edge';

interface Concept {
  data: Record<string, any>;
}

export default async function Concepts({params: {locale}}: {params: {locale: string}}) {

  const data = await getConcepts(locale);
  return (
      <div className="lg:flex w-full">
        <div className="w-full lg:w-1/4 lg:pr-8">
          <ConceptSidebar concepts={data as unknown as Concept[]} />
        </div>
        <div className="w-full lg:w-3/4">
          <ConceptContent concepts={data as unknown as Concept[]} />
        </div>
      </div>
  )
}
