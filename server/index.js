import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import createError from "http-errors";
import { routes } from "./routes/index.js";
import session from "express-session";
import passport from "./controllers/passport.js";
import { connectMongoDB } from "./helpers/connectMongodb.js";
import client from "./helpers/connectRedis.js";

const { PORT, MONGO_URL } = process.env;

const app = express();
const port = PORT || 5000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(
  session({
    name: "sid",
    secret: "sdfasdf",
    resave: false,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use(routes());

// ERROR HANDLERS
app.use(async (req, res, next) => {
  // const error = new Error("Not found");
  // error.status = 404;
  // next(error);
  next(createError.NotFound("This route does not exist."));
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// CONNECT TO MONGODB
connectMongoDB(MONGO_URL);

app.listen(port, () => console.log(`Server is running on port ${port}`));
