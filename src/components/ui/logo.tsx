import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Logo(): JSX.Element {
    const router = useRouter();

    const goHome = () => {
        router.push('/'); // Navigate to the homepage
    };
    return (
        <div onClick={goHome} style={{ cursor: 'pointer' }}>
            <Image
                src="/favicon.ico"
                alt="Home Logo"
                width={32}
                height={32}

            />
        </div>
    );
};