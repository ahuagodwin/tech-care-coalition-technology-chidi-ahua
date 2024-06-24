import { motion } from 'framer-motion';
import { PublicLayout } from '@/components/layout';
import { useHook } from '@/helper';
import { ContactAddress, ContactGetInsight, ContactHeroBanner, ContactOffice } from './modules';
import { useEffect, useState } from 'react';
import { LoadingModal } from '@/components';


const ContactPage = () => {
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const heroBanner = useHook.useAnimateOnInView();
  const address = useHook.useAnimateOnInView();
  const officeLocation = useHook.useAnimateOnInView();
  const getInsight = useHook.useAnimateOnInView();


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
        <motion.div ref={heroBanner.ref} initial="hidden" animate={heroBanner.controls} variants={animationVariants}>
          <ContactHeroBanner />
        </motion.div>
  
        <motion.div ref={address.ref} initial="hidden" animate={address.controls} variants={animationVariants}>
          <ContactAddress />
        </motion.div>
  
        <motion.div ref={officeLocation.ref} initial="hidden" animate={officeLocation.controls} variants={animationVariants}>
          <ContactOffice />
        </motion.div>
        <motion.div ref={getInsight.ref} initial="hidden" animate={getInsight.controls} variants={animationVariants}>
          <ContactGetInsight />
        </motion.div>
      </PublicLayout>
      )}
    </>
  );
}

export default ContactPage;
