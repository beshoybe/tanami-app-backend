import { connectDb } from "../DB/connection.js";
import { globalErrorHandler } from "./utils/asyncHandling.js";
import cors from "cors";
import authRouter from "./modules/auth/user/auth.user.router.js";
import localeMiddleware from "i18next-http-middleware";
import i18next from "./i18n.js";
import { protectRoute } from "./middleware/auth.middleware.js";
import homeController from "./modules/home/home.controller.js";

const appRouter = (app, express) => {



  // Enable CORS
  app.use(cors({ origin: true, credentials: true }));

  // Enable JSON parsing
  app.use(express.json());

  // Enable i18n middleware
  app.use(localeMiddleware.handle(i18next));

  app.get("/", (req, res) => {
    return res.status(200).json({ message: req.t("welcome") });
  });

  // Define routes
  app.use("/auth", authRouter);

  app.get("/home",protectRoute,homeController);

  // Handle invalid routes
  app.all("*", (req, res) => {
    return res.status(404).json({ message: req.t("invalidPath") });
  });

  // Connect to the database
  connectDb();

  // Global error handler
  app.use(globalErrorHandler);
};

export default appRouter;
