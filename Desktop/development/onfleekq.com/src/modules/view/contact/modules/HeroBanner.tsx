import { onfleekQ } from '@/config/config'
import { ImgIcon } from '@/constants/Images_Icon'
import { onfkQ } from '@/styles'

const HeroBanner = () => {
    const wind = window.screen.width

    console.log("wind:", wind)
  return (
    <div  className='flex justify-center items-center flex-col'>
        <section className='w-full  max-h-[93px] sm:max-h-[93px] md:max-h-[216px] lg:max-h-[216px]  contact_card_banner'>
            <img src={ImgIcon.ContactBg} alt={onfleekQ.company.slogan} className='w-full h-full' />
        </section>

        <div className='clearfix'></div>
        <onfkQ.Container>
                <section className='flex justify-center items-center max-h-[656px] mt-20 2xl:pt-28'>
                    <img src={ImgIcon.ContactBanner} alt={onfleekQ.company.name} />
                </section>
        </onfkQ.Container>
    </div>
  )
}

export default HeroBanner
