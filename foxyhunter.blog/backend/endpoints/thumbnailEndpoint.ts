import { RouterContext, Status } from "@oak/oak";
import { getThumbnail } from "../repositories/fileRepository.ts";

function isSafeFilename(filename: string): boolean {
  return /^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif)$/.test(filename);
}

export const getThumbnailEndpoint = async (ctx: RouterContext<'/thumbnails/:filename', {filename: string;}>) => {
    if (isSafeFilename(ctx.params.filename)) {
        const thumbnail = await getThumbnail(ctx.params.filename);
        
        if (thumbnail == null) {
            ctx.response.status = Status.NotFound;
            ctx.response.body = 'Thumbnail not found';
        } else {
            if (ctx.params.filename.endsWith('.png')) {
                ctx.response.type = 'png';
            } else if (ctx.params.filename.endsWith('.jpg') || ctx.params.filename.endsWith('.jpeg')) {
                ctx.response.type = 'jpeg';
            } else if (ctx.params.filename.endsWith('.gif')) {
                ctx.response.type = 'gif';
            } else {
                ctx.response.type = 'application/octet-stream'; // fallback
            }

            ctx.response.body = thumbnail;
        }
    } else {
        ctx.response.status = Status.BadRequest;
        ctx.response.body = 'Invalid filename, only alphanumerical characters, "_", "-" and basic image extension are allowed.';
    }
}