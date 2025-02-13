import type { RequestHandler } from "express";
import moneyRepository from "./moneyRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const money = await moneyRepository.readAll();
    res.json(money);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const moneyId = Number.parseInt(req.params.id);
    const money = await moneyRepository.read(moneyId);
    if (money == null) {
      res.sendStatus(404);
    } else {
      res.json(money);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const money: UpdatedMoneyType = {
      id: Number.parseInt(req.params.id),
      label: req.body.label,
      country: req.body.country,
      year: req.body.year,
      value: req.body.value,
      material: req.body.material || null,
      diameter: req.body.diameter || null,
      weight: req.body.weight || null,
      money_condition: req.body.money_condition,
      description: req.body.description,
      picture: req.body.picture,
      collection_id: req.body.collection_id,
      user_id: req.body.user_id,
    };

    const affectedRows = await moneyRepository.update(money);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const money: NewMoneyType = {
      label: req.body.label,
      country: req.body.country,
      year: req.body.year,
      value: req.body.value,
      material: req.body.material,
      diameter: req.body.diameter,
      weight: req.body.weight,
      money_condition: req.body.money_condition,
      description: req.body.description,
      picture: req.body.picture,
      collection_id: req.body.collection_id,
      user_id: req.body.user_id,
    };

    const insertId = await moneyRepository.create(money);

    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const moneyId = Number.parseInt(req.params.id);
    await moneyRepository.delete(moneyId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  read,
  edit,
  add,
  destroy,
};
