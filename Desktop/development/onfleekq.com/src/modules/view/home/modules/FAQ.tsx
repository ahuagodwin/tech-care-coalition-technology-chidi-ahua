import { onfleekQ } from '@/config/config'
import { ImgIcon } from '@/constants/Images_Icon'
import { motion } from "framer-motion";
import { useHook } from '@/helper'
import { faqs } from '@/data/faqs.data';


const FAQs = () => {
    const { activeIndex, toggleContentVisibility } = useHook.useAccordion()
    const { variants } = useHook.useContentVariants()


  return (
    <div style={{ background: `var(--colorWhite)`}}>
        <div className='onfleekq_container py-[100px]'>
              <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-10'>
                <section className='w-full sm:w-full md:w-full lg:w-[603px] xl:w-[603px] 2xl:w-[603px] h-full sm:h-full md:h-full lg:h-[693px]'>
                    <img src={ImgIcon.FAQImg} alt={onfleekQ.company.name} className='w-full h-full' />
                </section>
              
                 <section className='flex justify-center flex-col' >
                 <h2 className='faq_caption'>Frequently Asked Questions <span>(FAQ)</span></h2>
                 {faqs.map((item, index) => (
                    <article key={index}>
      
                     <h1 className='onfleekq_faq_header'  onClick={() => toggleContentVisibility(index)}>
                         <span>{item?.title}</span>
                        {activeIndex === index ? <ImgIcon.MinusIcon /> : <ImgIcon.PlusIcon />}
                    </h1>
                 <motion.div
                     initial="hidden"
                     animate={activeIndex === index ? "visible" : "hidden"}
                     variants={variants}
                 >
                 <div className='onfleekq_faq_content'>
                     {item?.content}
                 </div>
                 </motion.div>
                    </article>
                        ))}
             </section>
           
              </div>
        </div>
    </div>
  )
}

export default FAQs
