import { Context } from "@oak/oak";
import { getAllPosts } from "../../repositories/blogFileRepository.ts";

export const getPosts = async (ctx: Context) => {
    ctx.response.type = 'json';
    ctx.response.body = JSON.stringify(await getAllPosts());
}