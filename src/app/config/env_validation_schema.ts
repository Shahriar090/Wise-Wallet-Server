import { z } from "zod";

const numEnv = () => z.preprocess((val) => Number(val), z.number().int());

export const envValidationSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]),
	PORT: numEnv(),
	MONGODB_URL: z.string(),
});
