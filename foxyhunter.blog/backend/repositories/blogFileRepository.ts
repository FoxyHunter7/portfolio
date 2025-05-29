import { blogPost } from "../dtos/blog.ts";

const BLOG_DATA_DIR = `${Deno.cwd()}/data/blog`

export async function findThumbnailName(base: string): Promise<string | null> {
  for await (const entry of Deno.readDir(`${BLOG_DATA_DIR}/posts/thumbnails`)) {
    if (entry.isFile && entry.name.startsWith(base)) {
      return `/thumbnails/${entry.name}`; 
    }
  }

  return null;
}
  
export async function getAllPosts(): Promise<Array<blogPost>> {
    const posts: Array<blogPost> = []

    for await (const entry of Deno.readDir(`${BLOG_DATA_DIR}/posts`)) {
        if (entry.isFile && entry.name.endsWith('.md')) {
            const [dateTimeStr, slug] = entry.name.slice(0, -3).split('_', 2)
            const [year, month, day, hour, minute] = dateTimeStr.split('-').map(Number);
            posts.push({
                slug: slug,
                title: slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
                date: new Date(year, month, day, hour, minute),
                thumbnail_url: await findThumbnailName(slug)
            })
        }
    }

    return posts
}