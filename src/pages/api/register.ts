// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { query } from "../../lib/db";

type Data = {
  name: string;
};

function checkFields(
  username: String,
  email: String,
  password: String,
  passwordConfirmation: String
): boolean {
  if (
    username === "" ||
    email === "" ||
    password === "" ||
    passwordConfirmation === ""
  ) {
    return false;
  }
  if (password !== passwordConfirmation) {
    return false;
  }

  //todo verify username is unique
  //todo verify email is unique

  return true;
}

//need to check for username uniqueness
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { username, email, password, passwordConfirmation } = req.body;
  if (password !== passwordConfirmation) {
    res.status(400).json({ name: "Passwords do not match" });
    return;
  }

  const salt = bcrypt.genSaltSync(7);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // console.log(hashedPassword);
  await query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(100) UNIQUE,
          password VARCHAR(100),
          email VARCHAR(100) UNIQUE
        );
      `);
  //insert into is good practice to prevent sql injection
  try {
    const query_result = await query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`,
      [username, email, hashedPassword]
    );
    res.status(200).json({ name: "Registration Successful!" });
  } catch {
    res.status(400).json({ name: "Registration Failed: Duplicate User Found" });
  }

}
