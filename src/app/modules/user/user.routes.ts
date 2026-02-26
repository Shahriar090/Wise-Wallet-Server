import express, { type Router } from "express";
import validateRequest from "../../middlewares/validate_request.js";
import { UserControllers } from "./user.controllers.js";
import { UserValidations } from "./user.validations.js";

const router: Router = express.Router();

router
	.route("/signup")
	.post(
		validateRequest(UserValidations.createUserValidationSchema),
		UserControllers.createUser,
	);

export const UserRoutes = router;
