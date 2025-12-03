import express from "express";
import newsRouter from "./routes/news.routes";
import { responseGuard } from "./middlewares/responseGuard";
import { errorHandler } from "./middlewares/errorHandler";
import { methodNotAllowed } from "./middlewares/methodGuard";
import * as z from "zod";
z.config(z.locales.zhCN());


const port = 10003;
const app = express();

app.use(express.json());
app.use(responseGuard);
app.use("/intranetServer", newsRouter);
app.use(errorHandler);
app.use(methodNotAllowed);

app.listen(port, () => console.log(`Server running on port: ${port}`));
