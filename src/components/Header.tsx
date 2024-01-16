import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="m-auto max-w-screen-xl px-3 py-5">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image src={logo} alt="Connect job logo" width={40} height={40} />
        </Link>

        <Button asChild>
          <Link href="/jobs/new">post a job</Link>
        </Button>
      </nav>
    </header>
  );
};

export default Header;
