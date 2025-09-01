import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full backdrop-blur-md flex items-center justify-between px-6 py-0 z-50">
        <div className="text-2xl font-bold text-gray-900">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo RC Garage"
              width={50}
              height={50}
              className="m-1"
            />
          </Link>
        </div>

        <ul className="hidden md:flex space-x-8 text-white font-semibold">
          <li>
            <Link
              href="/"
              className="hover:text-blue-600 transition scroll-link [&.active]:text-blue-700 [&.active]:font-bold"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/nieuws"
              className="hover:text-blue-600 transition scroll-link [&.active]:text-blue-700 [&.active]:font-bold"
            >
              Nieuws
            </Link>
          </li>
        </ul>

        <button id="hamburger" aria-label="Open menu" className="md:hidden flex flex-col gap-1.5 focus:outline-none">
          <span className="block w-6 h-0.5 bg-white rounded"></span>
          <span className="block w-6 h-0.5 bg-white rounded"></span>
          <span className="block w-6 h-0.5 bg-white rounded"></span>
        </button>
      </nav>

      <div id="sidebar"
           className="fixed top-0 right-[-100%] h-full w-64 backdrop-blur-lg shadow-lg flex flex-col p-8 space-y-4 transition-right duration-300 z-50">
        <button id="closeBtn" aria-label="Close menu"
                className="self-end text-3xl font-bold text-white hover:text-blue-600 focus:outline-none">&times;</button>
        <Link
          href="/"
          className="text-white font-semibold text-lg hover:text-blue-600 transition scroll-link [&.active]:text-blue-700 [&.active]:font-bold"
        >
          Home
        </Link>
        <Link
          href="/nieuws"
          className="text-white font-semibold text-lg hover:text-blue-600 transition scroll-link [&.active]:text-blue-700 [&.active]:font-bold"
        >
          Nieuws
        </Link>
      </div>
    </>
  );
}