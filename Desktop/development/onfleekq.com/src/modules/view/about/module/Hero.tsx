import { ImgIcon } from '@/constants'
import { onfkQ } from '@/styles'
import { useEffect, useState } from 'react';

const Hero = () => {
  const [screen, setScreen] = useState(window.screen.width <= 768);

  useEffect(() => {
const handleResize = () => {
setScreen(window.screen.width <= 768);
};

window.addEventListener("resize", handleResize);
return () => {
window.removeEventListener("resize", handleResize);
};
}, []);

  return (
    <div className='bg-center bg-cover bg-no-repeat' style={{ backgroundImage: `url(${ImgIcon.AboutHeroBg})`}}>
            <onfkQ.Container>
                <div  className='flex justify-center items-center flex-col'>
                    <section className='flex justify-center items-end lg:items-end flex-col pt-20'>
                        <span className='text-blackHeader text-40 lg:text-100 font-outfit font-semibold'>Book . Buy. Beautify</span>
                        <span className='flex justify-end items-end'><ImgIcon.HeroLineStyle width={screen ? "157" : "373"} height={screen ? "9" : "34"} /> </span>
                    </section>
                    <img src={ImgIcon.AboutHeroImg} />
                </div>
            </onfkQ.Container>
    </div>
  )
}

export default Hero
