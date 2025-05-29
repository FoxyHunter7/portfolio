import { Router } from "@oak/oak";
import { getPosts } from "../endpoints/blog/posts.ts";

const blogRouter = new Router();

blogRouter.get('/posts', getPosts);

export default blogRouter