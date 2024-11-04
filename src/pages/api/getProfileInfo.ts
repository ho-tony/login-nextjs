import { query } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from '../../lib/auth';
type Data = {
    username: string,
    email: string,
};


// since this is protected by cookies, for the sake of development speed, I'll just query by username (since they are unique)
// obviously, not best practice 
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== "GET") {
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    const authUser = authenticate(req, res);
    if (!authUser) {
        return;
    }
    const queryResult = await query("SELECT * from users where (username = $1)", [authUser.username]);
    const user = queryResult.rows[0];

    return res.status(200).json({username: user.username, email:user.email});
}