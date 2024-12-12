import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Scooters', href: '/scooters' },
    { name: 'Register', href: '/register' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/gogo.png"
                alt="GOGO Logo"
                width={100}
                height={40}
                priority
              />
            </Link>
          </div>

          <div className="hidden sm:flex sm:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-[#8B3A89] px-3 py-2 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

        
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="rounded-full bg-[#8B3A89] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#9F4A9D] transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}