import express from "express";
import homeRouter from "./routes/homeRouter.js";
import cors from "cors";
import productsRouter from "./routes/productsRouter.js";
import { getErrorStatus } from "./controllers/404ErrorController.js";
import usersRouter from "./routes/usersRouter.js";
import { config } from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";
config();
const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:8080"],
  // credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  // optionSuccessStatus: 200,
};

app.use(cors());
app.use(express.json());
app.use("/", homeRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

app.get("*", getErrorStatus);

app.use(errorHandler);

app.listen(port, () => console.log(`Listening at port number ${port}`));

export default app;
