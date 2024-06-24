import { ImgIcon } from "@/constants";
import React from "react";


const AuthLayout: React.FC<LayoutProps> = (props) => {
  return (
    <div className={`bg-white flex justify-center items-center mx-auto ${props.isSidebar ? null : "py-10"} px-0  ${props.isSidebar ? null : "lg:p-10"} flex-col`}>
      {props.isAuth ? (
        <>
          <img src={ImgIcon.Logo} />
          <span className="text-22 sm:text-25 md:text-30 lg:text-80 text-blackHeader font-outfit font-bold leading-normal">
            {props.label}
          </span>
        </>
      ) : null}

      <form onSubmit={props.onSubmit} className="flex justify-center items-center flex-col w-5/6 mx-auto">
        {props.children}
      </form>
    </div>
  );
};

export default AuthLayout;
