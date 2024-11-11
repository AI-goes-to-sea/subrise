import { Link } from "@/i18n/routing";
import { getSubredditFeaturedList } from "@/server/featured";

export default async function SubriseFeatured({ params }: { params: { locale: string } }) {

  const featuredList = await getSubredditFeaturedList(params.locale);

  return (
    <div className="flex flex-1 flex-col space-y-8">
      {featuredList.map((item, index) => {
        return (
          <Link key={index} href={`/subrise-featured/${item.featuredUrl}`}>
            <div className="flex flex-col md:flex-row justify-between p-6 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative order-1 border-l-4 border-orange-500 ">
              <div className="hidden flex-shrink-0 md:flex justify-center w-24 h-24 rounded-lg">
                <span className="text-6xl font-semibold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  {index + 1}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between ml-4">
                <h2 className="text-2xl font-semibold text-black">{item.name}</h2>
                <p className="text-zinc-500 mt-4 line-clamp-3">{item.description}</p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}