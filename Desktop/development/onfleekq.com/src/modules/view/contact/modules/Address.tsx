
import { onfkQ } from '@/styles'
import { ImgIcon } from '@/constants/Images_Icon'

const Address = () => {
  return (
    <onfkQ.Container>
                {/* company call details */}
                <div className='contact_card_wrapper justify-center items-center gap-10 py-28'>
                        <section className='flex justify-center items-center flex-col contact_card'>
                            <img src={ImgIcon.EmailIcon} alt=""  className='w-[80px] h-[80px] icon' />
                            <span className='text-onfleekq font-medium text-2xl py-4'>Email</span>
                            <span className='onfleekq_blackHeader font-normal text-2xl'>support@onfleekq.com</span>
                        </section>

                        <section className='flex justify-center items-center flex-col contact_card'>
                            <img src={ImgIcon.CallIcon} alt="" className='w-[80px] h-[80px] icon' />
                            <span className='text-onfleekq font-medium text-2xl py-4 text-nowrap'>Phone Number</span>
                            <span className='flex justify-center items-center gap-2 onfleekq_blackHeader font-normal text-2xl'><img src={ImgIcon.NigeriaFlag} className='rounded-md' /> 02017003120</span>
                        </section>
                </div>
    </onfkQ.Container>
  )
}

export default Address
