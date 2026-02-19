import cookieParser from "cookie-parser";
import cors from "cors";
import express, {
	type Application,
	type Request,
	type Response,
} from "express";
import { globalErrorHandler } from "./app/middlewares/global_error_handler.js";
import router from "./app/routes/index.js";
import { notFound } from "./app/utils/not_found.js";

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		allowedHeaders: [
			"Content-Type",
			"Authorization",
			"X-Requested-With",
			"Accept",
		],
	}),
);

// app routes
app.use("/api/v1", router);

app.get("/", (_req: Request, res: Response) => {
	res.send("Hello From WiseWallet!");
});

app.get("/test-error", (_req: Request, res: Response, next) => {
	const err = new Error("Error Testing.!");

	next(err);
});

// not found route
app.use(notFound);

// global error handler
app.use(globalErrorHandler);

export default app;
