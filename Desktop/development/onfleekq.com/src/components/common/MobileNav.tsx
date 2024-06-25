import { ImgIcon } from "@/constants";
import { headerData } from "@/data/layout.data";
import React from "react";
import { MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface MenuProps {
    close?: () => void;
}

const MobileNav:React.FC<MenuProps> = ({ close }) => {
    const variants = {
        hidden: { opacity: 0, x: "100%" },
        visible: { opacity: 1, x: "0%" },
        exit: { opacity: 0, x: "100%" },
      };

  return (
    <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-overlay z-50 overflow-hidden"
  >
    <div
      className="fixed top-0 right-0 bottom-0 w-full sm:w-[60%] md:w-2/4 lg:w-2/4 h-screen z-50 bg-cover bg-center bg-no-repeat px-6 py-6 overflow-hidden"
      style={{ backgroundImage: `url(${ImgIcon.SidebarBg})` }}
    >
      <div className="flex justify-center items-center flex-col w-full">
        <div className="flex justify-end items-end text-right w-full pt-4 pr-3" onClick={close}><ImgIcon.CloseIcon size={30} /></div>
        <img src={ImgIcon.Logo} className="my-5" />

        <div className="flex justify-between items-center shadow-custom h-[56px] p-5 bg-white w-full rounded-xl">
          <MdSearch size={40} color={`var(--colorGray500)`} />
          <input
            className="w-full bg-transparent px-2 text-14"
            type="text"
            placeholder="Search for product or services"
          />
          <span className="text-white bg-primary p-2 font-semibold font-outfit text-14 rounded-md">
            Search
          </span>
        </div>

        {headerData.map((item) => (
          <div className="flex justify-center items-start flex-col w-full py-10">
            {item.childrenLeft.map((item) => (
              <Link to={item?.path} className={`text-20 text-blackHeader font-outfit py-2 border-b border-white w-full ${window.location.pathname === item?.path ? "text-primary" : "inherit"}`}>{item?.title}</Link>
            ))}

            {item.childrenRight.map((item) => (
              <Link to={item?.path} className={`text-20 text-blackHeader font-outfit py-2 border-b border-white w-full ${window.location.pathname === item?.path ? "text-primary" : "inherit"}`}>{item?.title}</Link>
            ))}
          </div>
        ))}

        <div className='flex justify-center items-center space-x-5'>
            <ImgIcon.FacebookIcon size={25} color={`var(--colorPrimary)`} />
            <ImgIcon.Instagram size={25} color={`var(--colorPrimary)`} />
            <ImgIcon.LinkedinIcon size={25} color={`var(--colorPrimary)`} />
            <ImgIcon.TwitterIcon size={25} color={`var(--colorPrimary)`} />
            <ImgIcon.TiktokIcon size={25} color={`var(--colorPrimary)`} />
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default MobileNav;
