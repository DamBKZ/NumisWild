import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { encodeJWT } from "../../helpers/jwt.helper";
import userRepository from "../user/userRepository";

export const login: RequestHandler = async (req, res, next) => {
  try {
    const user = req.body;
    const token = await encodeJWT(user);

    res.cookie("auth_token", token, {
      secure: false,
      httpOnly: true,
      maxAge: 86400000,
    });
    res.status(200).json({
      message: "Bienvenue sur NumisWild !",
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

export const verifyToken: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      res.status(403).json({ authentified: false });
    }

    const verifiedToken = jwt.verify(
      req.cookies.auth_token,
      process.env.APP_SECRET as string,
    );
    if (verifiedToken) {
      next();
    } else {
      res.json({ authentified: false });
      return;
    }
  } catch (err) {
    next(err);
  }
};

export const readRoleWithToken: RequestHandler = async (req, res, next) => {
  try {
    const tokenFromCookies = (await jwt.verify(
      req.cookies.auth_token,
      process.env.APP_SECRET as string,
    )) as PayloadType;

    const email: string = tokenFromCookies?.email;

    const roleId = await userRepository.readRoleByEmail(email);

    if (roleId !== 2) {
      res.json({ isAdmin: false, message: "tu n'es pas un admin" });
    }

    res.json({ isAdmin: true, message: "bienvenue admin" });
  } catch (err) {
    next(err);
  }
};
export const checkingToken: RequestHandler = (req, res) => {
  res.status(200).json({ authentified: true });
  return;
};

export const logout: RequestHandler = (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    path: "/",
  });
  res.status(200).json({ message: "Déconnexion réussie" });
};
