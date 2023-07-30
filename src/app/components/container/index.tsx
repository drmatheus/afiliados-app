import React, { ReactNode } from "react";

export const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen max-w-full lg:max-w-4xl p-8 m-auto bg-white flex flex-col gap-4">
      {children}
    </div>
  );
};
