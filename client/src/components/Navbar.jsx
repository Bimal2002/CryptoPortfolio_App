import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { FaGithub } from "react-icons/fa";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer hover:text-purple-300 transition-colors duration-200 ${classprops}`}>
    {title}
  </li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4 glass-card rounded-xl">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
            <SiEthereum className="text-white text-xl" />
          </div>
          <a href="/" className="text-white text-2xl font-bold cursor-pointer hover:text-purple-300 transition-colors duration-200">
            CryptoPortfolio
          </a>
        </div>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Portfolio", "Transactions", "Analytics", "About"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
        <li className="mx-4">
          <a
            href="https://github.com/Bimal2002/CryptoPortfolio_App"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors duration-200"
          >
            <FaGithub className="text-xl" />
            <span>GitHub</span>
          </a>
        </li>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer hover:text-purple-300 transition-colors duration-200" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer hover:text-purple-300 transition-colors duration-200" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md glass-card text-white animate-slideInLeft"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose
                onClick={() => setToggleMenu(false)}
                className="cursor-pointer hover:text-purple-300 transition-colors duration-200"
              />
            </li>
            {["Portfolio", "Transactions", "Analytics", "About"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
            )}
            <li className="my-2">
              <a
                href="https://github.com/Bimal2002/CryptoPortfolio_App"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors duration-200"
              >
                <FaGithub className="text-lg" />
                <span>GitHub</span>
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
