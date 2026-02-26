import httpStatus from "http-status";
import AppError from "../../errors/app_error.js";
import type { UserType } from "./user.interface.js";
import { User } from "./user.model.js";

// create new user into db
const createUserIntoDb = async (payload: UserType) => {
	// check if the user is alreay exist
	const isUserExist = await User.isUserExists(payload.contactInfo.email);

	if (isUserExist) {
		throw new AppError(
			httpStatus.CONFLICT,
			"User Already Exists With This Email.!",
			"UserAlreadyExists",
		);
	}

	return await User.create(payload);
};

export const UserServices = {
	createUserIntoDb,
};
