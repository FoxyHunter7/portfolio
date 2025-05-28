import { Context } from "@oak/oak";

const BLOGPOSTS_DATA_DIR = '/data/blog/posts'

export const getPosts = async (ctx: Context) => {
    const posts = []

    for await (const entry of Deno.readDir(BLOGPOSTS_DATA_DIR)) {
        if (entry.isFile && entry.name.endsWith('.md')) {

        }
    }
}