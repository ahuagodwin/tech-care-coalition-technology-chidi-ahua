
import { onfkQ } from '@/styles'
import { ImgIcon } from '@/constants'

const FocusGoalVision = () => {
  return (
    <div className='bg-white py-10'>
        
        <onfkQ.Container>
                    <div className='block lg:flex justify-center items-center gap-20'>
                            <section className='flex justify-center items-center lg:items-start flex-col bg-card hover:bg-white border-0 border-transparent hover:border-card hover:border-2 hover:cursor-sw-resize transition-all duration-[3s] hover:transition-all hover:duration-[3s] ease-in-out rounded-xl w-full lg:w-[42rem] h-full lg:h-[28rem] p-10'>
                                <onfkQ.TwoColor primary="Focus" secondary="Our" />
                                <span className='text-18 lg:text-24 text-blackHeader font-outfit font-normal text-justify'>Finding quality beauty and personal care services should not be waiting all day, juggling multiple locations, and searching tirelessly for professional providers. With the onfleekQ app, whether you're at a hotel, on set, in the office, or at home, you can access top-rated beauty services and products in real-time. Our app quickly connects vendors with registered users, making the process easy and efficient.</span>
                            </section>
                            <img src={ImgIcon.AboutFocus} />
                    </div>

                    <div className='block lg:flex justify-center items-center gap-20 py-5'>
                            <section className='order-1 lg:order-2 flex justify-center items-center lg:items-start flex-col bg-card hover:bg-white border-0 border-transparent hover:border-card hover:border-2 hover:cursor-sw-resize transition-all duration-[3s] hover:transition-all hover:duration-[3s] ease-in-out rounded-xl w-full lg:w-[42rem] h-full lg:h-[28rem] p-10'>
                                <onfkQ.TwoColor primary="Goal" secondary="Our" />
                                <span className='text-18 lg:text-24 text-blackHeader font-outfit font-normal text-justify'>To provide premium and accessible platform for beauty service enthusiast to find and book beauty services near them, buy beauty products at affordable rates & allow vendors set up beauty stores within the app.</span>
                            </section>
                            <img src={ImgIcon.AboutGoal} className='order-2 lg:order-1' />
                    </div>

                    <div className='block lg:flex justify-center items-center gap-20'>
                            <section className='order-2 lg:order-2 flex justify-center items-center lg:items-start flex-col bg-card hover:bg-white border-0 border-transparent hover:border-card hover:border-2 hover:cursor-sw-resize transition-all duration-[3s] hover:transition-all hover:duration-[3s] ease-in-out rounded-xl w-full lg:w-[42rem] h-full lg:h-[28rem] p-10'>
                                <onfkQ.TwoColor primary="Vision" secondary="Our" />
                                <span className='text-18 lg:text-24 text-blackHeader font-outfit font-normal text-justify'>Become the one-stop booking platform and marketplace for all beauty and personal care needs.</span>
                            </section>
                            <img src={ImgIcon.AboutVision} className='order-2 lg:order-2' />
                    </div>

        </onfkQ.Container>
    </div>
  )
}

export default FocusGoalVision
