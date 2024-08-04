import { coalition } from '@/config'
import { Icons } from '@/constants'
import React from 'react'

const AuthForm:React.FC<AuthFormProps> = (props) => {
  return (
    <div className='flex-col bg-white w-full lg:w-3/12 p-5 absolute top-0 right-0 bottom-0'>
        <div className='w-full'>
            <form onSubmit={props.onSubmit}>
                <section><img src={Icons.Logo}  alt='coalition technology logo' width={80} height={20}/> </section>
                {props.children}
                <div className='absolute bottom-5 left-5 right-5 font-outfit'>
                    <section className='flex justify-between items-center'>
                        <a className='flex justify-between items-center gap-1 text-12 font-normal text-primary' target='_blank' href={coalition.company.instagram}><Icons.InstagramIcon size={20} /> coalition</a>
                        <span className='flex justify-between items-center gap-2 text-12 font-normal text-gray500'>©{coalition.company.name} {new Date().getFullYear()}</span>
                    </section>
                </div>
                </form>
        </div>
    </div>
  )
}

export default AuthForm
