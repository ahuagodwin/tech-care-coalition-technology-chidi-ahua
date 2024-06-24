
import React from 'react'
import Header_Web from './Header_Web'
import { OnfleekQFooter } from '.'



const PublicLayout:React.FC<LayoutProps> = (props) => {
  return (
    <div>
        <Header_Web />
        {props.children}
        <OnfleekQFooter />
    </div>
  )
}

export default PublicLayout
