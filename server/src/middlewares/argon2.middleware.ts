import type { RequestHandler } from "express";
import { argonHash, argonVerifier } from "../helpers/argon2.helper";

export const hashingPassword: RequestHandler = async (req, res, next) => {
  const { password } = req.body;

  const hashedPassword: string = await argonHash(password);

  if (hashedPassword) {
    req.body.password = hashedPassword;
    next();
  }
};

export const verifyingPassword: RequestHandler = async (req, res, next) => {
  try {
    const { passwordFromDB, password } = req.body;

    const isValid = await argonVerifier(passwordFromDB, password);

    if (!isValid) {
      res.json({ message: "pseudo ou mot de passe incorrect" });
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
};
