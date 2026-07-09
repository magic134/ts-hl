import express from "express";
import cors from "cors";
import routes from "./routes";
import { fail } from "./utils/response";
import { PORT } from "./config";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((err: any, _req: any, res: any, _next: any) => {
    console.error(err);
    res.json(fail(500, err.message || "服务器内部错误"));
});

app.listen(PORT, () => {
    console.log(`HTTP server listening on http://localhost:${PORT}`);
});
