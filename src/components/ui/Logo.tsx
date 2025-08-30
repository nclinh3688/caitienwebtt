import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="logo-link">
      <div className="logo-container">
        <Image
          src="/images/logo/phuc-khiem-logo.jpg"
          alt="PHÚC KHIÊM Logo"
          width={48}
          height={48}
          className="logo-image-new"
          priority
        />
                            <div className="logo-text">
                      <span className="logo-acronym">PK</span>
                    </div>
      </div>
    </Link>
  );
} 