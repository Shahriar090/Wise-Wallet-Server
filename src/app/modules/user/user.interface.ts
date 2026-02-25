import type { USER_GENDER, USER_ROLES, USER_STATUS } from "./user.constants.js";

export type UserName = {
	firstName: string;
	middleName?: string;
	lastName: string;
};

export type ContactInfo = {
	phone: string;
	email: string;
};

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type UserGender = (typeof USER_GENDER)[keyof typeof USER_GENDER];
export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];

export type UserType = {
	_id: string;
	name: UserName;
	gender: UserGender;
	age: number;
	contactInfo: ContactInfo;
	password: string;
	role: UserRole;
	status: UserStatus;
	isDeleted: boolean;
};
