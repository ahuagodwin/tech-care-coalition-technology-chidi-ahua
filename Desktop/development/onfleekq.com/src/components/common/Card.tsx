
import { ImgIcon } from '@/constants'
import React from 'react'



const Card:React.FC<CardsProps> = (props) => {
  return (
    <div className="group w-full bg-card h-[150px] sm:h-[190px] md:h-[190px] lg:h-[428px] relative">
              <img src={props?.img} alt={props?.label} className="w-full h-full" />
              <p className="flex justify-center items-center lg:hidden bg-primary text-white absolute bottom-0 right-0 left-0 text-[15px] lg:text-[20px] font-outfit font-medium py-1">
                {props?.label}
              </p>
              <div className="hidden cursor-pointer lg:absolute lg:top-0 lg:right-0 lg:left-0 lg:bottom-0 lg:bg-overlay lg:justify-center lg:items-center lg:group-hover:flex">
                <p
                  className="flex justify-center items-center w-40 h-40 text-white text-24 font-outfit font-bold p-3"
                  style={{
                    backgroundImage: `url(${ImgIcon.HoverRedBg})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  {props?.label}
                </p>
              </div>
            </div>
  )
}

export default Card
