import React from 'react'


const Header_Stroke:React.FC<HeaderStrokeProps> = (props) => {
  return (
    <section className='home_service_header' style={{ backgroundImage: `url(${props.img})`}}>
    <p className={`caption ${props.size}`} >{props.title}</p>
    <span className={`caption_subtitle ${props.fontSize}`}>{props.label}</span>
</section>
    
  )
}

export default Header_Stroke