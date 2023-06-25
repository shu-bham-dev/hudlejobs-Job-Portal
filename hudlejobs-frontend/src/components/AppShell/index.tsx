import React from "react";
import Navbar from "../Navbar";

type AppProps = {
  children: React.ReactNode;
  showNavbar?: boolean;
};

const AppShell: React.FC<AppProps> = ({ children, showNavbar = true }) => {
  return (
    <>
      {showNavbar && (
        <div>
          <Navbar />
          {children}
        </div>
      )}
      {!showNavbar && { children }}
    </>
  );
};

export default AppShell;
