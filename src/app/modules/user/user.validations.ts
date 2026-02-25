import { z } from "zod";
import { USER_GENDER, USER_ROLES, USER_STATUS } from "./user.constants.js";

// name sub validation schema
const userNameBaseValidationSchema = z.object({
	firstName: z.string().min(1, "First Name Is Required").trim(),
	middleName: z.string().optional(),
	lastName: z.string().min(1, "Last Name Is Required").trim(),
});

// contact sub validation schema
const contactValidationSchema = z.object({
	phone: z.string().min(1, "Contact Number Is Required").trim(),
	email: z.email("Invalid Email Format").min(1, "Email Is Required").trim(),
});

const userBaseValidationSchema = z.object({
	name: userNameBaseValidationSchema,
	gender: z.enum([USER_GENDER.Male, USER_GENDER.Female, USER_GENDER.Others]),
	age: z.number().int().min(18, "Age Must Be At Least 18"),
	contactInfo: contactValidationSchema,
	password: z.string().min(6, "Password Must Be At Least 6 Characters Long"),
	role: z
		.enum([USER_ROLES.Admin, USER_ROLES.Member])
		.optional()
		.default(USER_ROLES.Member),
	status: z
		.enum([USER_STATUS.Active, USER_STATUS.Blocked])
		.optional()
		.default(USER_STATUS.Active),
	isDeleted: z.boolean().optional().default(false),
});

// actual schemas
const createUserValidationSchema = z.object({
	body: z.object({
		user: userBaseValidationSchema,
	}),
});

const updateUserValidationSchema = z.object({
	body: z.object({
		user: userBaseValidationSchema.partial(),
	}),
});

export const UserValidations = {
	createUserValidationSchema,
	updateUserValidationSchema,
};
