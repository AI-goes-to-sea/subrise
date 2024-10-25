import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import highlight from "remark-highlight.js";
import { db } from "../db";
import { concept } from "../db/schema";
import { eq } from "drizzle-orm";

export async function getConcepts(locale: string) {
  const result = await db.select({
    content: concept.content
  })
  .from(concept)
  .where(eq(concept.language, locale));

  const data = await getAllConcepts(result[0]?.content || '');
  return data;
}

export async function getAllConcepts(fileContents: string) {

  try {
    // const filePath = path.join(
    //   process.cwd(),
    //   "src",
    //   "data",
    //   "concept",
    //   "concept.md"
    // );
    // const fileContents = fs.readFileSync(filePath, "utf8");
    const { content } = matter(fileContents);

    const sections = content.split("##").slice(1);
    
    const conceptData = await Promise.all(
      sections.map(async (section) => {
        const [question, ...answerParts] = section.split("\n");
        const answer = answerParts.join("\n").trim();
        return {
          question: question.trim(),
          answer: await processMarkdown(answer),
        };
      })
    );

    // console.log('conceptData===>>>', conceptData);
    
    // return NextResponse.json(conceptData);
    return conceptData;
    // return NextResponse.json({ a: '123'});
  } catch (e) {
    // Sentry.captureException(e); // 捕获异常
    return new Response((e as Error).message, {
      status: 500,
      statusText: (e as Error).name,
    });
  }
  // return NextResponse.json({});
}

async function processMarkdown(content: string) {
  const result = await remark()
    .use(html as any)
    .use(highlight as any)
    .process(content);
  return result.toString();
}
