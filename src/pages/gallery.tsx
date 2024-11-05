import { parse } from 'cookie';
import { verifyToken } from '../lib/jwt';
import Image from 'next/image';
import Logo from '@/components/ui/logo';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
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
};

export default function Gallery() {
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: '/images/corgi_gallery1.jpg',
      alt: 'Corgi picture',
      title: 'Cute Corgi',
      description: 'A beautiful corgi enjoying the day',
    },
    {
      id: 2,
      src: '/images/corgi_gallery2.png',
      alt: 'Another corgi',
      title: 'Playful Corgi',
      description: 'Corgi playing in the park',
    },
    {
      id: 3,
      src: '/images/corgi_gallery3.png',
      alt: 'Third corgi',
      title: 'Sleeping Corgi',
      description: 'Corgi taking a nap',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 uppercase tracking-wider">
          Gallery
        </h1>
        <Logo/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
          >
            <Image
              src={image.src}
              height={1280}
              width={720}
              alt={image.alt}
              className="transform transition-all duration-500 hover:scale-110 object-cover w-full h-[300px]"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-lg font-semibold">{image.title}</h3>
              <p className="text-gray-200 text-sm">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
