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

// update user info
const updateUserIntoDb = async (userId: string, payload: UserType) => {
	// separating primitive and non primitive data
	const { name, contactInfo, preferences, ...remainingData } = payload;

	const modifiedUpdatedData: Record<string, unknown> = {
		...remainingData,
	};

	// updating name object
	if (name && typeof name === "object" && Object.keys(name).length) {
		for (const [key, value] of Object.entries(name)) {
			modifiedUpdatedData[`name.${key}`] = value;
		}
	}

	// updating contact info object
	if (
		contactInfo &&
		typeof contactInfo === "object" &&
		Object.keys(contactInfo).length
	) {
		for (const [key, value] of Object.entries(contactInfo)) {
			modifiedUpdatedData[`contactInfo.${key}`] = value;
		}
	}

	// updating preferences
	if (
		preferences &&
		typeof preferences === "object" &&
		Object.keys(preferences).length
	) {
		for (const [key, value] of Object.entries(preferences)) {
			modifiedUpdatedData[`preferences.${key}`] = value;
		}
	}

	const result = await User.findByIdAndUpdate(userId, modifiedUpdatedData, {
		new: true,
	});

	if (!result) {
		throw new AppError(
			httpStatus.NOT_FOUND,
			"User Not Found",
			"UserNotFoundError",
		);
	}

	return result;
};

// get all users
const getAllUsersFromDb = async () => {
	return await User.find();
};

export const UserServices = {
	createUserIntoDb,
	updateUserIntoDb,
	getAllUsersFromDb,
};
