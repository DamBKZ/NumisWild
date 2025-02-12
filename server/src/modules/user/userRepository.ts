import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class UserRepository {
  async create(user: NewUserType) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (firstname, lastname, email, hash_password) VALUES (?, ?, ?, ?)",
      [user.firstname, user.lastname, user.email, user.hash_password],
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM user");
    return rows as UserType[];
  }

  async read(id: number) {
    if (!id || Number.isNaN(id)) {
      throw new Error("ID utilisateur invalide");
    }
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE id = ?",
      [id],
    );
    return rows[0] as UserType;
  }

  async update(user: NewUserType) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET firstname = ?, lastname = ?, email = ?, hash_password = ? WHERE id = ?",
      [user.firstname, user.lastname, user.email, user.hash_password, user.id],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM user WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }

  async checkUniqueEmail(userEmail: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email= ?",
      [userEmail],
    );
    return rows as UserType[];
  }

  async readByEmail(email: string): Promise<UserType | null> {
    const [user] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email = ?",
      [email],
    );

    const result = user as UserType[];
    return result.length > 0 ? result[0] : null;
  }

  async readRoleByEmail(email: string) {
    const [roleId] = await databaseClient.query<Rows>(
      `
    SELECT role_id
    FROM user 
    WHERE email = ?
    `,
      [email],
    );

    return roleId.length > 0 ? roleId[0].role_id : null;
  }
}

export default new UserRepository();
