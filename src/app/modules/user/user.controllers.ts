import httpStatus from "http-status";
import { asyncHandler } from "../../utils/async_handler.js";
import { sendResponse } from "../../utils/send_response.js";
import { UserServices } from "./user.services.js";

// create user / signup
const createUser = asyncHandler(async (req, res) => {
	const result = await UserServices.createUserIntoDb(req.body.user);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: "User Created Successfully",
		data: result,
	});
});

// update user info
const updateUserInfo = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const payload = req.body.user;
	const result = await UserServices.updateUserIntoDb(id as string, payload);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "User Information Updated Successfully",
		data: result,
	});
});

// get all users
const getAllUser = asyncHandler(async (_req, res) => {
	const result = await UserServices.getAllUsersFromDb();

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "All Users Get Successfully",
		data: result,
	});
});

// get a single user
const getSingleUser = asyncHandler(async (req, res) => {
	const { userId } = req.params;

	const result = await UserServices.getSingleUserFromDb(userId as string);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "User Data Get Successfully",
		data: result,
	});
});
export const UserControllers = {
	createUser,
	updateUserInfo,
	getAllUser,
	getSingleUser,
};
