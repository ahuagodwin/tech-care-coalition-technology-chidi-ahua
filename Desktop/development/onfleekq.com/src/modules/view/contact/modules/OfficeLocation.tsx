
import { onfkQ } from '@/styles'
import { ImgIcon } from '@/constants/Images_Icon'

const OfficeLocation = () => {
  return (
    <div className='onfleekq_bg_light py-28'>
        <p className='flex justify-center items-center font60'>Our Office</p>
        <onfkQ.Container>
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 pt-4'>
                    <section className='rounded-l-xl'>
                        <img src={ImgIcon.ContactOffice} /> 
                    </section>

                    <section className='flex justify-center items-start flex-col bg-white p-9 rounded-r-xl'>
                        <p className='onfleekq_primary font-medium text-[30px] flex justify-center items-center pb-5'><ImgIcon.LocationIcon /> Abuja </p>
                        <span className='text-[30px] onfleekq_blackHeader w-full lg:w-[430px]'>A252, Kamal Adeyemi Crescent, Kings Park Royale , Kukwaba District Abuja.</span>
                    </section>
                </div>
        </onfkQ.Container>
    </div>
  )
}

export default OfficeLocation
