import { ImgIcon } from '@/constants/Images_Icon'
import { onfkQ } from '@/styles'
import { InputField } from '@/components'

const GetInsight = () => {
  return (
    <div className='onfleekq_bg_primary py-20'>
        <onfkQ.Container>
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-20 lg:gap-40'>
            <section className='flex justify-center items-center lg:items-start flex-col'>
                <span className='text-[40px] lg:text-[60px] font-bold text-white'>Get Insight Weekly</span>
                <span className='text-[30px] font-normal text-white py-4'>Subscribe to our newsletter</span>
                <InputField style="mb-3" type="custom" />
                <onfkQ.Button label="Submit" type='btn_cta' />
            </section>
            <section>
                <img src={ImgIcon.ContactCTA} />
            </section>
        </div>
        </onfkQ.Container>
        
    </div>
  )
}

export default GetInsight
