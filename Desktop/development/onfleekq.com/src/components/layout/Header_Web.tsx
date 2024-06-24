

import { headerData } from '@/data/layout.data'
import { Link } from 'react-router-dom'
import { onfkQ } from "@/styles"
import { ImgIcon } from '@/constants/Images_Icon'
import { useEffect, useState } from 'react'
import { MobileNav } from '../common'
import { AnimatePresence } from 'framer-motion'


const Header_Web = () => {
    const [ open, setOpen ] = useState<boolean>(false)

    const handleClick = () => {
        setOpen(!open)
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 999) {
                setOpen(false)
            }
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

  return (
    <>
        <div className='onfleekq_header'>
        {headerData?.map((item, index) => (
            <onfkQ.Container>
                <div className='onfleekq_header_wrapper' key={index}>
                    <Link to={item?.path}>{item?.title}</Link>
                    {item?.childrenLeft?.map((child, index) => (
                        <Link to={child?.path} key={index} className={`onfleekq_nav_items ${window.location.pathname === child.path ? "active" : "inherit"}`}>{child?.title}</Link>
                    ))}
                    {item?.company?.map((company, index) => (
                        <Link to={company?.path} key={index}>{company?.title}</Link>
                    ))}
                    {item?.childrenRight?.map((child, index) => (
                        <Link to={child?.path} key={index} className={`onfleekq_nav_items ${window.location.pathname === child.path ? "active" : "inherit"}`}>{child?.title}</Link>
                    ))}
                    <ImgIcon.MenuIcon size={30} className='onfleekq_menu_icon cursor-pointer' onClick={() => handleClick()} />
                </div>
            </onfkQ.Container>
        ))}
    </div>

   <AnimatePresence>
   {open && (
            <MobileNav close={() => handleClick()} />
        )}
   </AnimatePresence>
    </>
  )
}

export default Header_Web
