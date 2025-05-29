import { RouterContext, Status } from "@oak/oak";
import { getImage } from "../repositories/fileRepository.ts";

function isSafeFilename(filename: string): boolean {
  return /^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif)$/.test(filename);
}

export const getImageEndpoint = async (ctx: RouterContext<'/images/:filename', {filename: string;}>) => {
    if (isSafeFilename(ctx.params.filename)) {
        const image = await getImage(ctx.params.filename);
        
        if (image == null) {
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

            ctx.response.body = image;
        }
    } else {
        ctx.response.status = Status.BadRequest;
        ctx.response.body = 'Invalid filename, only alphanumerical characters, "_", "-" and basic image extension are allowed.';
    }
}