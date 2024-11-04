import {useEffect } from 'react';
import cookie from 'cookie';
import {useRouter} from 'next/router';
import {verifyToken} from '../lib/jwt';

export default function Gallery() {
  const router = useRouter();

  return (
    <div>
      <h1>Gallery Page where it will be protected</h1>
    </div>
  );
}
export async function getServerSideProps(context: { req: any; }) {
  const { req } = context;
  const cookiesParsed = cookie.parse(req.headers.cookie || '');
  const token = cookiesParsed.token || null;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { user: decoded },
  };
}