import express, { type Router } from "express";

const router: Router = express.Router();

const moduleRoutes = [
	{
		path: "/users",
		route: "", // TODO: implement route
	},
];

moduleRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
