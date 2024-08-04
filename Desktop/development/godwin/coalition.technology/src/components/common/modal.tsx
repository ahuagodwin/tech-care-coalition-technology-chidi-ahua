import { Modal as AntModal } from 'antd'
import React from 'react'


const Modal:React.FC<ModalProps> = (props) => {
  return (
    <AntModal
        open={props.open}
        title={<div className='flex justify-between items-center'><span className='text-16 font-semibold font-outfit'>{props.title} </span> <span onClick={props.onClose}>{props.closeIcon}</span></div>}
        footer={props.footer || null}
        className={props.className}
        width={props.width}
        closeIcon={false}
    >
      {props.children}
    </AntModal>
  )
}

export { Modal }
