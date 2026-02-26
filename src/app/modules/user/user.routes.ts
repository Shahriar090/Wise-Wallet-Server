import express, { type Router } from "express";
import validateRequest from "../../middlewares/validate_request.js";
import { UserControllers } from "./user.controllers.js";
import { UserValidations } from "./user.validations.js";

const router: Router = express.Router();

// create user / signup
router
	.route("/signup")
	.post(
		validateRequest(UserValidations.createUserValidationSchema),
		UserControllers.createUser,
	);

// update user info
router
	.route("/update/:id")
	.patch(
		validateRequest(UserValidations.updateUserValidationSchema),
		UserControllers.updateUserInfo,
	);

export const UserRoutes = router;
