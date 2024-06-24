import { onfleekQ } from '@/config/config'
import React from 'react'



const Card:React.FC<CardsProps> = (props) => {
  return (
    <div className='service_card'>
        <img src={props.img} alt={onfleekQ.company.slogan} className='service_img' />
        <div className='card_overlay_bg'>{props.label}</div>
        <div className='card_overlay'></div>
    </div>
  )
}

export default Card
