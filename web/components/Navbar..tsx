import Link from "next/link";
import Buttons from "./Buttons";

const Navbar = () => {
  const home = [
    { name: "home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/" },
    { name: "News", href: "/news" },
    { name: "Tickets", href: "/" },
  ];

  return (
    <>
      <div className="max-w-screen  flex justify-center items-center  relative z-10">
        <div className="flex items-center text-center justify-between uppercase h-8 md:h-11 w-full text-xs md:text-normal bg-[#002511]/80 pr-6">
          <ul className="flex items-center h-full ">
            {home.map((l) => (
              <Link
                href={l.href}
                key={l.name}
                className="flex justify-center items-center h-full px-5 text-white hover:text-black hover:bg-white  nth-[1]:px-7 font-bold nth-[1]:bg-white nth-[1]:text-black nth-[1]:hover:text-white nth-[1]:hover:bg-[#002511] max-sm:text-[10px] max-sm:px-2"
              >
                {l.name}
              </Link>
            ))}
          </ul>

          <Buttons />
        </div>
      </div>
    </>
  );
};

export default Navbar;
