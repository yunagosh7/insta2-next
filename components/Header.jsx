import React from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  HeartIcon,
  PaperAirplaneIcon,
  Bars3Icon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between bg-white max-w-6xl mx-5 lg:mx-auto">
        {/* Logo de la página  */}
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid  w-24"
        >
          <Image
            src="https://links.papareact.com/ocw"
            alt="logo"
            fill
            style={{ objectFit: "contain", cursor: " pointer" }}
          />
        </div>
        <div
          onClick={() => router.push("/")}
          className="relative lg:hidden flex-shrink-0 w-10"
        >
          <Image
            src="https://links.papareact.com/jjm"
            alt="logo"
            fill
            style={{ objectFit: "contain", cursor: " pointer" }}
          />
        </div>
        {/* Buscador de la página */}
        <div className="max-w-xs">
          <div className="relative p-3 mt-1 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full  pl-10  sm:text-sm rounded-md border-gray-600 focus:border-black focus:ring-black"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {session ? (
          <div className="flex items-center space-x-4">
            <HomeIcon className="navBtn" />
            <Bars3Icon className="h-6 md:hidden cursor-pointer" />

            <div className="relative navBtn hover:!scale-100 !transition-none !cursor-not-allowed">
              <PaperAirplaneIcon
                style={{
                  fill: "transparent",
                  stroke: "#000",
                  strokeWidth: "2px",
                }}
                className="-rotate-45 "
              />
              <div className="absolute -top-1 -right-2 text-xs w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white">
                3
              </div>
            </div>

            <PlusCircleIcon
              onClick={() => {
                setOpen(true);
              }}
              className="navBtn"
            />
            <UserGroupIcon className="navBtn hover:!scale-100 !transition-none !cursor-not-allowed" />
            <HeartIcon className="navBtn hover:!scale-100 !transition-none !cursor-not-allowed" />
            <img
              onClick={signOut}
              src={session.user.image}
              alt={session.user.name}
              className="h-10 w-10 rounded-full cursor-pointer"
            />
          </div>
        ) : (
          <button onClick={signIn}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Header;
