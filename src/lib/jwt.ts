import jwt, {JwtPayload} from 'jsonwebtoken';

const SECRET_KEY : string = process.env.JWT_SECRET || 'default_secret_key'
interface TokenPayload extends JwtPayload {
  id: number;
  username: string;
  email: string;
}

export const signToken = (payload : string) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '5m' });
};

export const verifyToken = (token : string) : TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as TokenPayload;
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
};
