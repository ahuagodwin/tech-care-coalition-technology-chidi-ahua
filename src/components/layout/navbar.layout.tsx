import { Icons, paths } from '@/constants'

import { Link, useNavigate } from 'react-router-dom';
import { coalT } from "@/coalition";
import { Images } from '@/assets/img';
import { mockdata } from '@/data/routes.data';
import type { MenuProps } from 'antd';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '@/api/store';
import { useDispatch } from 'react-redux';
import { apiService } from '@/services';


const NavbarLayout = () => {
const dispatch: ThunkDispatch<RootState, void, any> =  useDispatch()
const navigate = useNavigate();

const handleLogout = () => {
  dispatch(apiService.logout());
  navigate(paths.login);
}

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <span className="font-outfit text-15 font-medium text-blackHeader border-b-2 border-b-sidebar pb-2 cursor-pointer">
        godwincahua@gmail.com
      </span>
    ),
    icon: <Icons.EmailIcon />
  },
  {
    key: '2',
    label: (
      <span className="font-outfit text-15 font-medium text-blackHeader cursor-pointer">
        Snr. Frontend Developer
      </span>
    ),
    icon: <Icons.SettingsIcon />
  },

  {
    key: '3',
    label: (
      <span onClick={() => handleLogout()} className="font-outfit text-15 font-medium text-blackHeader cursor-pointer">
        Logout
      </span>
    ),
    icon: <Icons.SignOutIcon />
  },
];
  

  return (
    <nav className={`bg-white w-full px-5 py-[14px] font-outfit flex justify-between items-center rounded-full`}>
            <span className="font-medium text-20 uppercase text-blackHeader hidden sm:flex">
                <coalT.Image src={Icons.TestLogo} preview={false} width={211} height={48}/>
            </span>

            <Icons.MenuIcon className='flex sm:hidden text-primary cursor-pointer' size={30} />

            <div className='flex justify-center items-center gap-4 font-manrope'>
             {mockdata?.map((item) => (
               <Link to={item?.path} className={`flex justify-center items-center gap-2 text-14 font-bold text-blackHeader ${location.pathname === '/' && item?.path === '/' ? item?.activeBg : (location.pathname.startsWith(item?.path) && item?.path !== '/') ? item?.activeBg : item?.resetActive}`}>
                    <span>{item?.icon}</span>
                    <span>{item?.label}</span>
               </Link>
             ))}
            </div>
            
            <div className="flex justify-center items-center gap-4 font-manrope">
              <coalT.Dropdown
                menu={{items}}
                placement="bottomRight"
                arrow
              >
                <div className="flex justify-start items-center gap-3 cursor-pointer">
                  <coalT.Badge count={<Icons.ActiveIcon size={20} color={`var(--colorSuccess)`} />}  offset={[-2, 3]}><coalT.Avatar src={Images.AuthBg} size={38} /></coalT.Badge>
                <section className="hidden sm:flex justify-start items-start flex-col">
                    <span className="text-14 font-bold text-blackHeader">Godwin Ahua</span>
                    <span className="text-11 font-medium text-gray -mt-1">Snr. Frontend Dev.</span>
                </section>
                <Icons.SettingsIcon />
                <Icons.ChevronDownIcon size={18} className="text-14 text-gray" />
                </div>
              </coalT.Dropdown>
            </div>

    </nav>
  )
}

export default NavbarLayout
