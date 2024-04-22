import {
  SignedOut,
  SignedIn,
  UserButton,
  SignInButton,
  SignUpButton,
  SignOutButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import Hamburger from "hamburger-react";
import { useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <SignedIn>
        <nav className="relative px-4 py-4 flex justify-between items-center bg-primary">
          <a className="text-3xl font-bold leading-none" href="#">
            <h3>Mestres_Online</h3>
          </a>
          <div className={`lg:hidden ${isMenuOpen ? "hidden" : ""}`}>
            <Hamburger toggled={isMenuOpen} toggle={toggleMenu} />
          </div>
          <nav className="flex-1 px-7 justify-end hidden lg:flex">
          <ul>
                <li>
                  <Link to={"/publication"}>
                    <Button variant={"outlineBlue"}>Nova Publicação</Button>
                  </Link>
                </li>
              </ul>
          </nav>
          
          <div className="hidden lg:flex">
            <UserButton />
          </div>
        </nav>
        <div
          className={`navbar-menu relative z-50 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <div
            className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
            onClick={toggleMenu}
          ></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
            <div className="flex items-center justify-between w-full">
              <h3>LOGO</h3>
              <Cross2Icon
                className="h-10 w-10 text-red-600 font-bold cursor-pointer"
                onClick={toggleMenu}
              />
            </div>
            <div className="flex items-center flex-col mb-8 mt-4">
              <UserButton showName={true} />
            </div>
            {/* Botoes de navegação */}
            <div className="w-full flex justify-center">
              <ul className="w-full">
                <li className="w-full">
                  <Link to={"/publication"} className="w-full">
                    <Button className="w-full" variant={"outlineWhite"}>Nova Publicação</Button>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-auto">
              <div className="pt-6">
                <Button variant={"default"} className="w-full">
                  <SignOutButton>Sair da conta</SignOutButton>
                </Button>
              </div>
              <p className="my-4 text-xs text-center text-gray-400">
                <span>
                  Mestres_Online Copyright © {new Date().getFullYear()}
                </span>
              </p>
            </div>
          </nav>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="bg-primary w-screen flex justify-between items-center p-3 sm:justify-center">
          <div className="flex sm:max-w-7xl w-full justify-between items-center">
            <Link
              to={"/"}
              className="font-secondary text-white text-xl font-normal md:text-2xl"
            >
              Mestres_Online
            </Link>
            <div className="flex gap-4">
              <div className="h-9 px-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary shadow-sm hover:bg-secondary/80 text-primary">
                <SignInButton mode="modal">Login</SignInButton>
              </div>
              <div className="h-9 px-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary shadow-sm hover:bg-secondary/80 text-primary">
                <SignUpButton mode="modal">Register</SignUpButton>
              </div>
            </div>
          </div>
        </div>
      </SignedOut>
    </>
  );
};

export default NavBar;
