import { onfleekQ } from '@/config/config'
import { ImgIcon } from '@/constants/Images_Icon'
import { onfkQ } from '@/styles'


const CountDown = () => {
    const count = [
        {
            img: ImgIcon.RegisteredVendor,
            title: 'Registered Vendor',
            count: 100
        },
        {
            img: ImgIcon.BookingPerDay,
            title: 'Booking Per Day',
            count: 50
        },
        {
            img: ImgIcon.DailyDownload,
            title: 'Daily App Downloads',
            count: 20
        },

        {
            img: ImgIcon.ClientVendor,
            title: 'Satisfied Clients & Vendors',
            count: 200
        },

    ]
  return (
    <div className='count_wrapper'>
        <onfkQ.Container>
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10'>
                    {count.map((item, index) => (
                        <section className='count_down_content' key={index}>
                            <img src={item?.img} alt={onfleekQ.company.name} /> 
                            <span className='count'>{item?.count}+</span>
                            <span className='title'>{item?.title}</span>
                    </section>
                    ))}
                </div>
        </onfkQ.Container>
    </div>
  )
}

export default CountDown
