import type { Server } from "http";
import mongoose from "mongoose";
import config from "./app/config/index.js";
import app from "./app.js";

const PORT = config.port || 5000;

let server: Server;

async function main() {
	try {
		if (!config.db_url) {
			throw new Error("ATABASE_URL is not defined in .env file");
		}
		await mongoose.connect(config.db_url);
		console.log("DB Connected Successfully");

		server = app.listen(PORT, () => {
			console.log(
				`WiseWallet Server Is Listening On Port => http://localhost:${PORT}`,
			);
		});
	} catch (error) {
		console.error("Failed To Connect With DB", error);
		process.exit(1);
	}
}

main();
