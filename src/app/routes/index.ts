import express, { type Router } from "express";
import { UserRoutes } from "../modules/user/user.routes.js";

const router: Router = express.Router();

const moduleRoutes = [
	{
		path: "/users",
		route: UserRoutes,
	},
];

moduleRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
