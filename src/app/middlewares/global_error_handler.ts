import type { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
	error: any,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	const statusCode = 500;
	const message = error.message || "Something went wrong!";

	return res.status(statusCode).json({
		success: false,
		message,
		error,
	});
};
