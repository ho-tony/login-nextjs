import { query } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../../lib/auth";
type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const authUser = authenticate(req, res);
  if (!authUser) {
    return res.status(400).json({ message: "Authentication failed" });;
  }
  const { username, email } = req.body;
  try {
    await query(`UPDATE users SET email=$1 WHERE username=$2`, [
      email,
      username,
    ]);
  } catch (error: unknown) {
    console.log(error);
    return res.status(400).json({ message: "Profile update failed" });
  }

  return res.status(200).json({ message: "Profile update successful!" });
}
