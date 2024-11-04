// import cookie from 'cookie';
import {parse} from 'cookie';
import { verifyToken } from '../lib/jwt';
import Image from 'next/image';
import Logo from '@/components/ui/logo';

export default function Gallery() {


  return (
    <div>
      <Logo/>
      <Image src="/images/corgi_gallery.jpg" height={1280} width={720} alt="Corgi picture">
      </Image>

    </div>
  );
}
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const cookiesParsed = parse(req.headers.cookie || '');
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