import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class MoneyRepository {
  async create(money: NewMoneyType) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO money (label, country, year, value, material, diameter, weight, money_condition, description, picture, collection_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        money.label,
        money.country,
        money.year,
        money.value,
        money.material,
        money.diameter,
        money.weight,
        money.money_condition,
        money.description,
        money.picture,
        money.collection_id,
        money.user_id,
      ],
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM money ORDER BY created_at DESC",
    );
    return rows as MoneyType[];
  }

  async read(id: number) {
    if (!id || Number.isNaN(id)) {
      throw new Error("ID de la pièce de monnaie invalide");
    }
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM money WHERE id = ?",
      [id],
    );
    return rows.length > 0 ? (rows[0] as MoneyType) : null;
  }

  async update(money: NewMoneyType & { id: number }) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE money SET label = ?, country = ?, year = ?, value = ?, material = ?, diameter = ?, weight = ?, money_condition = ?, description = ?, picture = ?, collection_id = ?, user_id = ? WHERE id = ?",
      [
        money.label,
        money.country,
        money.year,
        money.value,
        money.material,
        money.diameter,
        money.weight,
        money.money_condition,
        money.description,
        money.picture,
        money.collection_id,
        money.user_id,
        money.id,
      ],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM money WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new MoneyRepository();
