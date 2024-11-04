// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../lib/db";
import {serialize} from 'cookie';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
type Data = {
  message: string;
  token: string | null;
};

const SECRET_KEY: string = process.env.JWT_SECRET ?? '';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(7);
  const hashedPassword = bcrypt.hashSync(password, salt);


  try {
    const result = await query(
      `SELECT * FROM users WHERE username = $1;`,
      [username]
    );
  
    if (result.rows.length === 0 || !(await bcrypt.compare(password, result.rows[0].password))) {
      return res.status(400).json({ message: "Invalid username or password", token: null });
    }
  
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ token : null, message: "Internal server error" });
  }

  const payload = {
    username: username,
    password: hashedPassword,
  };

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "5m",
  });

  
  res.setHeader('Set-Cookie', serialize('token', token, {
    httpOnly: true,
    maxAge: 300, 
    sameSite: 'strict',
    path: '/',
  }));

  return res.status(200).json({ message: "Login successful!", token: token });
}
