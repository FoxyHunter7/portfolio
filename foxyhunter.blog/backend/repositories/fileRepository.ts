import { marked } from "marked";
import { blogPost } from "../dtos/blogPostDTO.ts";
import { blogPostOverview } from "../dtos/blogPostOverviewDTO.ts";
import sanitizeHtml from "sanitize-html"

const DATA_DIR = `${Deno.cwd()}/data`

export async function findThumbnailUrl(base: string): Promise<string | null> {
    for await (const entry of Deno.readDir(`${DATA_DIR}/posts/thumbnails`)) {
        if (entry.isFile && entry.name.startsWith(base)) {
            return `/thumbnails/${entry.name}`; 
      }
    }

    return null;
}

export async function getThumbnail(filename: string): Promise<Uint8Array<ArrayBuffer> | null> {
    try {
        return await Deno.readFile(`${DATA_DIR}/posts/thumbnails/${filename}`)
    } catch {
        return null
    }
}

export async function getImage(filename: string): Promise<Uint8Array<ArrayBuffer> | null> {
    try {
        return await Deno.readFile(`${DATA_DIR}/posts/images/${filename}`)
    } catch {
        return null
    }
}

export async function getAllPosts(): Promise<Array<blogPostOverview>> {
    const posts: Array<blogPostOverview> = []

    for await (const entry of Deno.readDir(`${DATA_DIR}/posts`)) {
        if (entry.isFile && entry.name.endsWith('.md')) {
            const [dateTimeStr, titlePart] = entry.name.slice(0, -3).split('_', 2)
            const [year, month, day, hour, minute] = dateTimeStr.split('-').map(Number);
            posts.push({
                slug: entry.name.slice(0, -3),
                title: titlePart.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
                date: new Date(year, month, day, hour, minute),
                thumbnail_url: await findThumbnailUrl(titlePart)
            })
        }
    }

    posts.sort((a, b) => b.date.getTime() - a.date.getTime())

    return posts
}

export async function getPost(slug: string): Promise<blogPost> {
    const markdownStat = await Deno.stat(`${DATA_DIR}/posts/${slug}.md`)
    const markdownTime = markdownStat.mtime?.getTime() ?? 0

    let useCache = false
    try {
        const cacheStat = await Deno.stat(`${DATA_DIR}/cache/${slug}.html`)
        const cacheTime = cacheStat.mtime?.getTime() ?? 0
        useCache = cacheTime > markdownTime
    } catch {
        // no cache
    }

    let html: string
    if (useCache) {
        html = await Deno.readTextFile(`${DATA_DIR}/cache/${slug}.html`)
    } else {
        const markdown = await Deno.readTextFile(`${DATA_DIR}/posts/${slug}.md`)
        html = sanitizeHtml(marked.parse(markdown), {
            allowedTags: [
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                'blockquote', 'p', 'a', 'ul', 'ol', 'nl', 'li',
                'b', 'i', 'strong', 'em', 'strike', 'del', 'code', 'pre',
                'hr', 'br', 'img',
                'table', 'thead', 'tbody', 'tr', 'th', 'td'
            ],
            allowedAttributes: {
                a: [ 'href', 'name', 'target', 'title', 'rel' ],
                img: [ 'src', 'alt', 'title' ],
                th: [ 'colspan', 'rowspan' ],
                td: [ 'colspan', 'rowspan' ]
            },
            allowedSchemes: [ 'http', 'https' ],
            allowedSchemesByTag: {
                img: [ 'http', 'https', 'data' ]
            },
            allowProtocolRelative: false
        });

        await Deno.writeTextFile(`${DATA_DIR}/cache/${slug}.html`, html)
    }

    const [dateTimeStr] = slug.slice(0, -3).split('_', 1)
    const [year, month, day, hour, minute] = dateTimeStr.split('-').map(Number);

    return {
        slug: slug,
        date: new Date(year, month, day, hour, minute),
        html: html
    }
}