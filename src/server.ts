import dotenv from "dotenv";
import type { Server } from "http";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

let server: Server;

async function main() {
	try {
		if (!DB_URL) {
			throw new Error("ATABASE_URL is not defined in .env file");
		}
		await mongoose.connect(DB_URL);
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
