// utils/auth.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from './jwt';
import cookie from 'cookie';

interface TokenPayload {
  id: number;
  username: string;
  email: string;
}

export const authenticate = (req: NextApiRequest, res: NextApiResponse): TokenPayload | null => {
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const token = cookies.token || null;

  if (!token) {
    res.status(401).json({ message: 'Authentication token missing.' });
    return null;
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({ message: 'Invalid or expired token.' });
    return null;
  }

  return decoded;
};
