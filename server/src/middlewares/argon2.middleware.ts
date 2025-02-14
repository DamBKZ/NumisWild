import type { RequestHandler } from "express";
import {
  hashModifiedPasswordHelper,
  hashPasswordHelper,
  verifyPasswordHelper,
} from "../helpers/argon2.helper";

export const hashPassword: RequestHandler = async (req, res, next) => {
  const { hash_password } = req.body;

  try {
    const newPassword: string = await hashPasswordHelper(hash_password);
    if (newPassword) {
      req.body.hash_password = newPassword;
      next();
    }
  } catch (err) {
    res.status(500);
  }
};

export const hashModifiedPassword: RequestHandler = async (req, res, next) => {
  const { new_password } = req.body;

  if (new_password) {
    try {
      const hashedPassword: string =
        await hashModifiedPasswordHelper(new_password);

      req.body.new_password = hashedPassword;
      next();
    } catch (err) {}
  } else {
    next();
  }
};

export const comparePassword: RequestHandler = async (req, res, next) => {
  try {
    const { dbpassword, hash_password } = req.body;

    const isValid = await verifyPasswordHelper(dbpassword, hash_password);
    if (!isValid) {
      req.body.dbpassword = undefined;

      res.status(403).json({
        message: "Le couple email / mot de passe est incorrect.",
      });
      return;
    }

    next();
  } catch (e) {
    res.status(500).json({
      message: "Une erreur est survenue. Veuillez réessayer ultérieurement.",
    });
  }
};
