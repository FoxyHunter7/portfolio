import { RouterContext } from "@oak/oak";
import { getAllPosts } from "../repositories/fileRepository.ts";

export const getPostsEndpoint = async (ctx: RouterContext<'/posts'>) => {
    ctx.response.type = 'json';
    ctx.response.body = JSON.stringify(await getAllPosts());
}