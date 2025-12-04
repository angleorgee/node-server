import express from "express";
import routes from "./routes/index.routes";
import { responseGuard } from "./middlewares/responseGuard";
import { errorHandler } from "./middlewares/errorHandler";
import { methodNotAllowed } from "./middlewares/methodGuard";
import * as z from "zod";
import './utils/modules/logs';
z.config(z.locales.zhCN());


const port = 10003;
const app = express();

app.use(express.json());
app.use(responseGuard);
app.use("/intranetServer", routes);
app.use(errorHandler);
app.use(methodNotAllowed);

app.listen(port, () => console.log(`Server running on port: ${port}`));
