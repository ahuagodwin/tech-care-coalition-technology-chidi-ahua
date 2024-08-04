import React from "react";
import { coalT } from "@/coalition";
import NavbarLayout from "./navbar.layout";



const DashboardLayout: React.FC<LayoutProps> = (props) => {
  return (
    <coalT.Container>
      <div className="sticky top-0 pt-4">
        <NavbarLayout />
      </div>
      {props.children}
    </coalT.Container>
  );
};

export default DashboardLayout;
