import TagComp from "@/components/TagComp";
import { getSubredditFeaturedDetail } from "@/server/featured";

export default async function SubriseFeaturedSlug({
  params,
  searchParams,
}: {
  params: { locale: string },
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const locale = params.locale
  const slug = searchParams.slug

  const { info, reasons } = await getSubredditFeaturedDetail({ language: locale, id: +(slug || 0) })

  return (
    <div className="min-h-screen">
      <h1 className="text-5xl font-extrabold text-center text-black dark:text-white py-10">{info.name}</h1>
      
      {
        reasons.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-10 justify-center">
            {
              reasons.map((reason, index) => (
                <TagComp key={`tag_${index}`} tags={[reason.category || '']} />
              ))
            }
          </div>
        )
      }

      {/* Description */}
      <div className="space-y-8">
        <section className="p-8 rounded-lg shadow-md border dark:border-zinc-500 dark:text-white dark:bg-zinc-800">
          <h2 className="text-3xl font-bold text-orange-500 mb-4">Description</h2>
          <pre className="text-lg text-zinc-500 dark:text-white whitespace-pre-wrap">{info.description?.replace(/\\n/g, '\n')}</pre>
        </section>


        {/* Promotion */}
        <section className="p-8 rounded-lg shadow-md border dark:border-zinc-500 dark:text-white dark:bg-zinc-800">
          <h2 className="text-3xl font-bold text-orange-500 mb-4">Promotion</h2>
          <pre className="text-lg text-zinc-500 dark:text-white whitespace-pre-wrap">{info.promotion?.replace(/\\n/g, '\n')}</pre>
        </section>

        {/* Featured Reasons - 时间轴布局 */}
        {
          reasons.length > 0 && (
            <section className="p-8 rounded-lg shadow-md border dark:border-zinc-500 dark:text-white dark:bg-zinc-800">
              <h2 className="text-3xl font-bold text-orange-500 mb-4">Featured Reasons</h2>
              <div className="relative mt-10">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-orange-300 dark:border-orange-600"></div>
                {reasons.map((reason, index) => (
                  <div key={index} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                    <div className="order-1 w-5/12"></div>
                    <div className="z-20 flex items-center order-1 bg-orange-500 dark:bg-orange-600 shadow-xl w-8 h-8 rounded-full">
                      <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
                    </div>
                    <div className="order-1 border-l-4 border-orange-500 rounded-lg shadow-md w-5/12 px-6 py-4">
                      <p className="text-lg text-zinc-500 dark:text-white">{reason.featuredReason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        }
        
      </div>
    </div>
  )
}