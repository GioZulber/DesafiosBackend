import { Application, config } from './config/deps.ts';
// import { router } from './routes/index.ts';
import { router } from './components/products/index.ts';
const app = new Application();
const { PORT } = config();

app.use(router.routes());

app.listen({ port: Number(PORT) });
