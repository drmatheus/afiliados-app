import Link from "next/link";
import React, { ReactNode } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { MdOutlineExitToApp } from "react-icons/md";

interface IHeaderProps {
  isLogged?: boolean;
  children?: ReactNode;
}

export const Header = ({ isLogged, children }: IHeaderProps) => {
  const router = useRouter();

  return (
    <header className="w-full p-4 bg-blue-950 absolute left-0 top-0">
      <div className="max-w-4xl h-14 p-2 flex justify-between mx-auto">
        <span className="text-2xl h-fit my-auto ">PlanilhasNormalizer</span>
        {isLogged ? (
          <button
            onClick={() => {
              Cookies.remove("planilhasNormalizer@token");
              router.push("/login");
            }}
          >
            <MdOutlineExitToApp color="#fff" size={24} />
          </button>
        ) : (
          <>{children}</>
        )}
      </div>
    </header>
  );
};
