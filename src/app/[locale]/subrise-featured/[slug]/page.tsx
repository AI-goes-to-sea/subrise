import SubriseFeaturedInfo from "@/components/subrise-featured-info";
import TagComp from "@/components/TagComp";
import { getSubredditFeaturedDetail } from "@/server/featured";


export default async function SubriseFeaturedSlug({
  params,
  searchParams,
}: {
  params: { locale: string },
  searchParams: { [key: string]: string }
}) {
  
  const locale = params.locale
  const slug = searchParams.slug

  const { info, reasons } = await getSubredditFeaturedDetail({ language: locale, featuredUrl: slug })

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

      <SubriseFeaturedInfo info={info} reasons={reasons} />
    </div>
  )
}