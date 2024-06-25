
import { HeaderStroke } from "@/components/common";
import { ImgIcon } from "@/constants/Images_Icon";
import { motion } from "framer-motion";
import { accordionItems } from "@/data/accordion.data";
import { useHook } from "@/helper";


const Accordion = () => {
    const { activeIndex, toggleContentVisibility} = useHook.useAccordion()
    const { variants } = useHook.useContentVariants()


  return (
    <div
      className="home_service pt-[0.5px] lg:pt-3 pb-24"
      style={{ background: `var(--colorCard)` }}
    >
      <HeaderStroke
        title="Get Started"
        label="Get Started with these simple steps"
        size="text-40 sm:text-60 md:text-60 leading-[auto] lg:text-160 lg:leading-[96.5px]"
        fontSize="text-20 sm:text-30 md:text-24 leading-[8px] lg:text-60 lg:leading-[60px]"
      />

      <section className="onfleekq_container ">
        {/* Accordion tab */}
       {accordionItems.map((item, index) => (
         <div key={index}>
         <div className={`flex justify-between items-center onfleekq_acc_border cursor-pointer ${activeIndex === index ? "mt-16" : "mt-16"}`}  onClick={() => toggleContentVisibility(index)}>
           <section className="flex justify-center items-center gap-2 space-x-0 lg:space-x-2">
             <span className="onfleekq_acc_number text-11 sm:text-20 md:text-20 lg:text-32">{item?.number}</span>
             <span className="onfleekq_acc_title text-11 sm:text-20 md:text-20 lg:text-32">{item?.title}</span>
           </section>
 
           {activeIndex !== index && (
             <section className="flex justify-start items-start space-x-2 lg:space-x-3 text-left w-full lg:w-[32rem] ml-2 lg:ml-10">
               <span className="onfleekq_acc_title text-11 sm:text-20 md:text-20 lg:text-32">{item?.contentNumber}</span>
               <span className="onfleekq_acc_subtitle text-11 sm:text-20 md:text-20 lg:text-32">{item?.subtitle}</span>
             </section>
           )}
 
           <section
             className="cursor-pointer"
           >
             {activeIndex === index ? <ImgIcon.MinusIcon /> : <ImgIcon.PlusIcon />}
           </section>
         </div>
 
         {/* Accordion content */}
         <motion.div
           initial="hidden"
           animate={activeIndex === index ? "visible" : "hidden"}
           variants={variants}
           className={`${activeIndex === index ? "-mt-8 " : "-mt-14"} lg:-mt-16`}
         >
           <div className="block lg:flex sm:justify-center md:justify-center lg:justify-end xl:justify-end items-start pt-5 px-5 space-x-6 mr-0 lg:mr-12">
             <section className="w-full sm:w-full md:w-full lg:w-[414px] xl:w-[414px] 2xl:w-[414px]">
               <img
                  src={item.imageSrc}
                 alt="Create Account"
                 width="100%"
                 height="100%"
               />
             </section>
             <section className={`flex justify-center items-center space-x-6 ${activeIndex === index ? "md:-mt-2 lg:-mt-8" : "-mt-8"}`}>
               <section className="onfleekq_acc_content flex justify-center items-center space-x-3">
                 <span className="content_number text-40 sm:text-40 md:text-40 lg:text-72 pt-2">{item?.contentNumber}</span>
                 <span className="content_title text-10 sm:text-20 md:text-20 lg:text-24 pt-2">{item?.contentTitle}</span>
               </section>
             </section>
           </div>
         </motion.div>
         </div>
       ))}
      </section>
    </div>
  );
};

export default Accordion;
