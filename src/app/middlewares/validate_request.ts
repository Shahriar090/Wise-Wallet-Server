import { asyncHandler } from "../utils/async_handler.js";

const validateRequest = (schema: any) => {
	return asyncHandler(async (req, _res, next) => {
		await schema.parseAsync({
			body: req.body,
			cookies: req.cookies,
		});
		next();
	});
};

export default validateRequest;
