

import { ImgIcon } from '@/constants/Images_Icon'
import React from 'react'
import { Link } from 'react-router-dom';

interface BlogProps {
    img?: string;
    title?: string;
    tag?: string;
    author?: string;
    date?: string;
    read?: string;
    name?: string;
    minutes?: string;
}

interface BlogData {
    blogs?: BlogProps[]
}
const BlogCard:React.FC<BlogData> = ({ blogs }) => {
  return (
        <>
            {blogs?.map((item, index) => (
                <div className='blog_card' key={index}>
                {/* <div  className='blog_img w-[263px] h-[377px]'> */}
                    <img src={item?.img} alt='Blog 1' className="blog_img" />
                {/* </div> */}
                <div className='blog_content'>
                    <span className='blog_tag'>{item?.tag}</span>
                    <span className='blog_title'>{item?.title?.slice(0, 50) + "..."}</span>
                 
                    <section className='blog_author'>
                        <img src={item?.author} alt='Blog 2' />
                        <div className='blog_author_details'>
                            <span className='name'>{item?.name}</span>
                            <span className='blog_date'>{item?.date} . {item?.minutes} Read</span>
                        </div>
                    </section>
                    <Link to={item.read ?? ''}><span className='blog_read'>Read More <ImgIcon.ChevronRight /></span></Link>
                </div>
            </div>
            ))}
        </>
  )
}

export default BlogCard
