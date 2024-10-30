// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {query} from "../../lib/db";
import bcrypt from "bcryptjs";


type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    const { username, password} = req.body;
    const salt = bcrypt.genSaltSync(7);
    const hashedPassword = bcrypt.hashSync(password, salt); 
    const result =  query(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, hashedPassword]);
    res.status(200).json({ name: "John Doe" });


}
