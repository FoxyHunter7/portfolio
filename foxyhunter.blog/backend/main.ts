import { Application } from '@oak/oak'
import slsy from "./middleware/slsy.ts"
import blogRouter from "./routes/blog.ts";

const app = new Application();

app.use(slsy);
app.use(blogRouter.routes());
app.use(blogRouter.allowedMethods())

await app.listen({ port: 8000 });
