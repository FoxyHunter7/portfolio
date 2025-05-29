import { Router } from "@oak/oak";
import { getPostsEndpoint } from "../endpoints/postsEndpoint.ts";
import { getThumbnailEndpoint } from "../endpoints/thumbnailEndpoint.ts";
import { getPostEndpoint } from "../endpoints/postEndpoint.ts";
import { getImageEndpoint } from "../endpoints/imageEndpoint.ts";

const router = new Router();

router.get('/posts', getPostsEndpoint);
router.get('/posts/:slug', getPostEndpoint);
router.get('/thumbnails/:filename', getThumbnailEndpoint);
router.get('/images/:filename', getImageEndpoint)

export default router;