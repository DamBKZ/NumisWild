import type { RequestHandler } from "express";
import userRepository from "../modules/user/userRepository";

export const getUserByEmail: RequestHandler = async (
  req,
  res,
  next,
): Promise<void> => {
  try {
    const { email } = req.body;
    const user: UserType | null = await userRepository.readByEmail(email);
    if (!email) {
      res.status(400).json({
        message: "Le champ email est requis.",
      });
    }

    if (!user) {
      res.status(404).json({
        message: "Le couple email / mot de passe est incorrect.",
      });
      return;
    }

    req.body.dbpassword = user.hash_password;

    next();
  } catch (e) {
    next(e);
  }
};
