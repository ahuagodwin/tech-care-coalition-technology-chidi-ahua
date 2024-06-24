

import { onfkQ } from '@/styles'
import { ImgIcon } from '@/constants'

const EarnMore = () => {
  return (
    <div className='bg-center bg-cover bg-no-repeat py-10 lg:py-0 my-10' style={{ backgroundImage: `url(${ImgIcon.VendorEarnMoreBg})`}}>
        <onfkQ.Container>
                <div className='block lg:flex justify-center items-center gap-20'>
                    <section className='flex justify-center items-center text-center lg:text-left lg:items-start flex-col w-full lg:w-[480px]'>
                        <span className='text-blackHeader text-30 lg:text-60 font-bold font-outfit'>EARN MORE</span>
                        <span className='text-blackHeader text-20 lg:text-24 py-4 font-outfit font-normal'>You no longer have to give away most of your earnings. We are committed to fair commission rates, ensuring majority of your earnings go to you.</span>
                        <onfkQ.Button label='Apply Now!' type='primary' />
                    </section>
                    <div className='flex justify-center items-center w-full lg:w-[568px] h-full lg:h-[523px] overflow-hidden pt-10 lg:pt-0'>
                        <img src={ImgIcon.VendorLearnMore} alt='' className='rounded-xl lg:rounded-none'  />
                    </div>
                </div>
        </onfkQ.Container>
    </div>
  )
}

export default EarnMore
