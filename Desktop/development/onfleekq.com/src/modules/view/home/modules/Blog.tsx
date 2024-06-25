
import { BlogCard, HeaderStroke } from '@/components/common'
import { blogs } from '@/data/blogs.data'
import { onfkQ } from '@/styles'

const Blog = () => {


  return (
    <div className='blog_wrapper'>
        <onfkQ.Container>
          <HeaderStroke 
            title='Beauty Articles for you'
            size="text-[50px] sm:text-[50px] md:text-[50px] lg:text-[130px] leading-[40px] lg:leading-normal pb-5 lg:pb-0"
          />
          {/* blog description */}

          <div className='block sm:block md:flex lg:flex justify-center md:justify-between lg:justify-between items-center space-y-3 lg:space-y-0 pb-10'>
            <section className='flex justify-start items-start flex-col'>
              <span className='latest text-[40px] lg:text-[60px] text-center lg:text-left'>Our Latest Blogs</span>
              <span className='trending text-[24px] text-center lg:text-left'>Discover the trending news in the world of Beauty</span>
            </section>

            <span className='blog_view_all w-[7rem]'>View All</span>
          </div>

            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-10'>
              <BlogCard blogs={blogs} />
            </div>
        </onfkQ.Container>

    </div>
  )
}

export default Blog
