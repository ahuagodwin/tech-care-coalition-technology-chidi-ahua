import { onfleekQ } from '@/config'
import { ImgIcon, paths } from '@/constants'
import { onfkQ } from '@/styles'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='onfleekq_white pt-20'>
        <onfkQ.Container>
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10'>
            <section className='flex justify-center text-center lg:text-left items-center lg:items-start flex-col'>
                <p className='text-blackHeader font-outfit font-bold text-30 lg:text-50 leading-[167%]'>Join Our Robust Network
                    of Beauty Service Providers & <span className='text-primary'>Vendors.</span></p>
                   
                <section className='flex justify-center items-center gap-3 pt-3 lg:pt-0'>
                <Link to={paths.vendorRegistration}><onfkQ.Button label='Apply Now!' type='primary' /></Link>
                    <div className='hidden lg:block justify-start items-start'>
                        <p className='text-blackHeader font-outfit font-normal'><span className='text-primary'>100%</span> Satisfaction Guaranteed</p>
                        <ImgIcon.SatisfactionArrowIcon />
                    </div>
                </section>
            </section>
            <section>
                <img src={ImgIcon.VendorHeroImg} alt={onfleekQ.company.name} className='w-full h-full' />
            </section>
        </div>
        </onfkQ.Container>
    </div>
  )
}

export default Hero
