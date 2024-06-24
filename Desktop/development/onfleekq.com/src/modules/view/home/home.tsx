import { motion } from 'framer-motion';
import { PublicLayout } from '@/components/layout';
import { HomeAccordion, HomeBlog, HomeCTAPhone, HomeCount, HomeFAQ, HomeLocations, HomeServices, HomeTestimonial, HomeVendorInfo } from './modules';
import { useHook } from '@/helper';
import { LoadingModal, Slider } from '@/components';
import { useEffect, useState } from 'react';


const Home = () => {
  const [ isLoading, setIsLoading ] = useState<boolean>(true)
  const services = useHook.useAnimateOnInView();
  const accordion = useHook.useAnimateOnInView();
  const locations = useHook.useAnimateOnInView();
  const testimonial = useHook.useAnimateOnInView();
  const vendorInfo = useHook.useAnimateOnInView();
  const count = useHook.useAnimateOnInView();
  const ctaPhone = useHook.useAnimateOnInView();
  const blog = useHook.useAnimateOnInView();
  const faq = useHook.useAnimateOnInView();
  const slide = useHook.useAnimateOnInView();

  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 2 } }
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 3000));
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchData();
}, []);

  return (
   <>
      <LoadingModal isLoading={isLoading} />
      {!isLoading &&  (
         <PublicLayout>
         {/* <HomeHero /> */}
         <motion.div ref={slide.ref} initial="hidden" animate={slide.controls} variants={animationVariants}>
          <Slider />
         </motion.div>
         <motion.div ref={services.ref} initial="hidden" animate={services.controls} variants={animationVariants}>
           <HomeServices />
         </motion.div>
         <motion.div ref={accordion.ref} initial="hidden" animate={accordion.controls} variants={animationVariants}>
           <HomeAccordion />
         </motion.div>
         <motion.div ref={locations.ref} initial="hidden" animate={locations.controls} variants={animationVariants}>
           <HomeLocations />
         </motion.div>
         <motion.div ref={testimonial.ref} initial="hidden" animate={testimonial.controls} variants={animationVariants}>
           <HomeTestimonial/>
         </motion.div>
         <motion.div ref={vendorInfo.ref} initial="hidden" animate={vendorInfo.controls} variants={animationVariants}>
           <HomeVendorInfo />
         </motion.div>
         <motion.div ref={count.ref} initial="hidden" animate={count.controls} variants={animationVariants}>
           <HomeCount />
         </motion.div>
         <motion.div ref={ctaPhone.ref} initial="hidden" animate={ctaPhone.controls} variants={animationVariants}>
           <HomeCTAPhone />
         </motion.div>
         <motion.div ref={blog.ref} initial="hidden" animate={blog.controls} variants={animationVariants}>
           <HomeBlog />
         </motion.div>
         <motion.div ref={faq.ref} initial="hidden" animate={faq.controls} variants={animationVariants}>
           <HomeFAQ />
         </motion.div>
       </PublicLayout>
      )}
   </>
  );
}

export default Home;
