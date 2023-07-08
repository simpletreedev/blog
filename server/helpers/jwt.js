import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import createError from "http-errors";
import client from "./connectRedis.js";

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRESIN,
  REFRESH_TOKEN_EXPIRESIN,
} = process.env;

export const signAccessToken = (userId) =>
  new Promise((resolve, reject) => {
    const payload = { userId };
    const secret = ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: ACCESS_TOKEN_EXPIRESIN,
    };

    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });

export const verifyAccessToken = (req, res, next) => {
  if (!req.headers["authorization"]) return next(createError.Unauthorized());
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return next(createError.Unauthorized(message));
    }
    req.payload = payload;
    next();
  });
};

export const signRefreshToken = (userId) =>
  new Promise((resolve, reject) => {
    const payload = { userId };
    const secret = REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: REFRESH_TOKEN_EXPIRESIN,
    };

    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
      }
      client.set(userId, token, "EX", 365 * 24 * 60 * 60, (err, reply) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
          return;
        }
        resolve(token);
      });
    });
  });

export const verifyRefreshToken = (refreshToken) =>
  new Promise((resolve, reject) => {
    JWT.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, payload) => {
      // if (err) return reject(createError.Unauthorized());
      if (err) return reject("Loi err: " + err);
      const userId = payload.userId;

      client.get(userId, (err, result) => {
        if (err) {
          console.log(err.message);
          reject("loi trong nay: " + err);
          return;
        }
        if (refreshToken === result) return resolve("kq: " + userId);
        // reject(createError.Unauthorized());
        reject("loi o cuoi: ");
      });
    });
  });
