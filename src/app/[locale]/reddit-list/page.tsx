import SubredditComp from "@/components/SubredditComp"
import { getAllTags, getSubredditList } from "@/server/subreddits"
// import { SWRConfig } from "swr";

export const runtime = 'edge';

export default async function SubredditsPage({params: {locale}}: {params: {locale: string}}) {

  const res = await getSubredditList({page: '1'}, locale);
  const tags = await getAllTags(locale);
  const subridditData = res.data;
  // console.log('tags===>>>', tags);

  if (tags.length > 0) {
    let index = tags.findIndex(item => ['other', '其他', '其它'].includes(item.name.trim().toLowerCase()));
    if (index >= 0) {
      let otherItem = tags.splice(index, 1)[0];
      // console.log(otherItem);
      tags.push(otherItem);
    }
  }

  return (
    // <SWRConfig value={{ fallback: subridditData }}>
    <SubredditComp subridditData={subridditData} tagsData={tags} locale={locale}/>
    // </SWRConfig>
    
  )
}
