import argon from "argon2";

const hashingOptions = {
  memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
  timeCost: 2,
  parallelism: 1,
};

export const argonHash = async (password: string) => {
  return (await argon.hash(password, hashingOptions)) as string;
};

export const argonVerifier = async (
  hashedPassword: string,
  password: string,
) => {
  return await argon.verify(hashedPassword, password);
};
