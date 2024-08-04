import React from 'react'


const Caption:React.FC<CaptionProps> = (props) => {
  return (
    <p className={`text-20 font-outfit font-bold text-blackHeader pt-10 pb-4 ${props.position}`}>{props.label} <span className='text-primary'>{props.text}</span></p>
  )
}

export default Caption
