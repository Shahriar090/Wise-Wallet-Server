import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import config from "../../config/index.js";
import { USER_GENDER, USER_ROLES, USER_STATUS } from "./user.constants.js";
import type {
	ContactInfo,
	UserModel,
	UserName,
	UserType,
} from "./user.interface.js";

const userNameSchema = new Schema<UserName>(
	{
		firstName: { type: String, required: true, trim: true },
		middleName: { type: String, trim: true, required: false },
		lastName: { type: String, required: true, trim: true },
	},
	{ _id: false },
);

const contactInfoSchema = new Schema<ContactInfo>(
	{
		phone: { type: String, required: true },
		email: { type: String, required: true, unique: true, lowercase: true },
	},
	{ _id: false },
);

const userSchema = new Schema<UserType, UserModel>(
	{
		name: { type: userNameSchema, required: true },
		gender: { type: String, enum: Object.values(USER_GENDER), required: true },
		age: { type: Number, required: true },
		contactInfo: { type: contactInfoSchema, required: true },
		password: { type: String, required: true, select: false },
		preferences: {
			currency: { type: String, default: "BDT" },
			timezone: { type: String, default: "UTC" },
		},
		familyId: { type: Schema.Types.ObjectId, ref: "Family" },
		role: {
			type: String,
			enum: Object.values(USER_ROLES),
			default: USER_ROLES.Member,
		},
		status: {
			type: String,
			enum: Object.values(USER_STATUS),
			default: USER_STATUS.Active,
		},
		isDeleted: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

// static method: isUserExists

userSchema.statics.isUserExists = async function (email: string) {
	return await this.findOne({ "contactInfo.email": email }).select("+password");
};

// instance method: isPasswordMatched
userSchema.methods.isPasswordMatched = async function (
	plainTextPassword: string,
) {
	const user = this as UserType;
	return await bcrypt.compare(plainTextPassword, user.password);
};

// pre-save hook to hash the password before saving

userSchema.pre("save", async function () {
	if (!this.isModified("password")) {
		return;
	}
	this.password = await bcrypt.hash(this.password, config.bcrypt_salt_round);
});

// User Model
export const User = model<UserType, UserModel>("User", userSchema);
