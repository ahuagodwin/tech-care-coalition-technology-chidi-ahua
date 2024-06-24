
import { onfkQ } from '@/styles'
import { ImgIcon } from '@/constants'

const WhatWeOffer = () => {
  return (
    <div className='bg-white'>
        <onfkQ.Container>
            <div className='flex justify-center items-center flex-col py-20'>
                <img src={ImgIcon.AboutOffer} alt="" />
            </div>
        </onfkQ.Container>
    </div>
  )
}

export default WhatWeOffer
