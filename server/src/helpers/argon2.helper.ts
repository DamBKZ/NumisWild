import argon2 from "argon2";

const hashingOptions = {
  memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
  timeCost: 2,
  parallelism: 1,
};

export const hashPasswordHelper = async (hash_password: string) => {
  return await argon2.hash(hash_password, hashingOptions);
};

export const hashModifiedPasswordHelper = async (new_password: string) => {
  return await argon2.hash(new_password, hashingOptions);
};

export const verifyPasswordHelper = async (
  dbpassword: string,
  hash_password: string,
) => {
  return await argon2.verify(dbpassword, hash_password);
};
