
import { onfkQ } from '@/styles'
import { ImgIcon } from '@/constants/Images_Icon'
import { onfleekQ } from '@/config/config'
import { Button } from "@/components"


const CTAs = () => {
  return (
    <div className='bg-white bg-center bg-no-repeat bg-cover py-28 -mt-20'>
    <div className='bg-center bg-no-repeat bg-cover cta_wrapper' style={{ backgroundImage: `url(${ImgIcon.CTABg})`}}>
    <onfkQ.Container>
       <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-col-2 lg:grid-cols-2'>
            <section className='cta_content'>
                <span className='cta_title'>Download</span>
                <span className='cta_desc'>For faster, easier & exclusive  bookings.</span>
                <section className='cta_btn'>
                 <Button type="download" storeIcon={<ImgIcon.AppleIcon size={40} />} label="Download on the" name="Apple Store" />
                 <Button type="download" storeIcon={<img src={ImgIcon.GoogleIcon} />} label="Download from" name="Google Play" />
                </section>
            </section>
            <section className='w-[601px] onfleekQ_app'>
                <img src={ImgIcon.CTAPhone} alt={onfleekQ.company.name} className='w-full h-full' />
            </section>
        </div>
       </onfkQ.Container>
    </div>
    </div>
  )
}

export default CTAs
