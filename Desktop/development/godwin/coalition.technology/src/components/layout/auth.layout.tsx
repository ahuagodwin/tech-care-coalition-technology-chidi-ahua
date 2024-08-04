import React from 'react'


interface LayoutProps {
    children: React.ReactNode
}

const AuthLayout:React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className='bg-bgAuthDesktop bg-cover bg-center bg-no-repeat absolute top-0 left-0 right-0 bottom-0 overflow-hidden'>
        <div className='flex justify-center items-center lg:justify-end lg:items-end'>
          {children}
        </div>
    </div>
  )
}

export default AuthLayout
