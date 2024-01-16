import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="m-auto my-10 max-w-screen-xl px-3 py-2">
      <ClerkProvider>{children}</ClerkProvider>
    </main>
  );
};

export default Layout;
