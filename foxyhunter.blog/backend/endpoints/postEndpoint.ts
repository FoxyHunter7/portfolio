import { RouterContext, Status } from "@oak/oak";
import { getPost } from "../repositories/fileRepository.ts";

function isSafeSlug(slug: string): boolean {
  return /^[a-zA-Z0-9_-]+$/.test(slug);
}

export const getPostEndpoint = async (ctx: RouterContext<'/posts/:slug', {slug: string;}>) => {
    if (isSafeSlug(ctx.params.slug)) {
        try {
            ctx.response.body = JSON.stringify(await getPost(ctx.params.slug))
        } catch (error) {
            if (error instanceof Deno.errors.NotFound) {
                ctx.response.status = Status.NotFound;
                ctx.response.body = 'Post not found';
            } else {
                ctx.response.status = Status.InternalServerError;
                ctx.response.body = 'Internal Server Error' + error;
            }
        }
    } else {
        ctx.response.status = Status.BadRequest;
        ctx.response.body = 'Invalid slug, only alphanumerical characters, "_" and "-" are allowed';
    }
}