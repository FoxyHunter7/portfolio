import { Application } from '@oak/oak'
import slsy from "./middleware/slsy.ts"
import router from "./routes/router.ts";

const app = new Application();

app.use(slsy);
app.use(router.routes());
app.use(router.allowedMethods())

await app.listen({ port: 8000 });
