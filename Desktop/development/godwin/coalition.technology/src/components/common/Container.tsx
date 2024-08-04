import React from 'react'


const Container:React.FC<LayoutProps> = (props) => {
  return (
    <div className='dashboard_container p-4'>
      {props.children}
    </div>
  )
}

export { Container }
