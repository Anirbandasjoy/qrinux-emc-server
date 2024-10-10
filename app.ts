import express from "express";
import passport from "passport";
import session from "express-session";
import {
  cors,
  createError,
  Request,
  Response,
  NextFunction,
  cookieParser,
} from "./helper/import";
import { errorResponse } from "./helper/response";
import userRouter from "./routes/user.router";
import authRouter from "./routes/auth.router";
import "./config/passport";
import categoryRouter from "./routes/category.router";
import productRouter from "./routes/product.router";
import wishlistRouter from "./routes/wishlist.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://qrinux.com"],
    credentials: true,
  })
);

app.use(
  session({
    secret: "session_secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello, Qrinux Ecommerce.",
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404, "route not found"));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

export default app;
