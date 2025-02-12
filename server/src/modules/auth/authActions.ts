import type { RequestHandler } from "express";
import { tokenGenerator } from "../../helpers/jwt.helper";

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    const payload = { email };
    const token = await tokenGenerator(payload);

    res
      .status(200)
      .cookie("auth_token", token, {
        secure: false,
        httpOnly: true,
        maxAge: 36000000,
      })
      .json({
        message: "utilisateur connecté",
      });
  } catch (err) {
    next(err);
  }
};
