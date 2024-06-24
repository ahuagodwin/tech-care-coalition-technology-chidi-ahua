import { LoadingModal, PublicLayout } from '@/components'
import { HomeCTAPhone } from '../home/modules'
import { VendorBecome, VendorEarnMore, VendorGift, VendorHero } from './module'
import { useHook } from '@/helper';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Page = () => {
  const [ isLoading, setIsLoading ] = useState<boolean>(true)
  const vendorHero = useHook.useAnimateOnInView();
  const gift = useHook.useAnimateOnInView();
  const earnMore = useHook.useAnimateOnInView();
  const cta = useHook.useAnimateOnInView();

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
    {!isLoading && (
      <PublicLayout>
       <motion.div ref={vendorHero.ref} animate={vendorHero.controls} initial="hidden" variants={animationVariants}>
       <VendorHero />
       </motion.div>

       <motion.div ref={gift.ref} animate={gift.controls} initial="hidden" variants={animationVariants}>
       <VendorGift />
       </motion.div>

        <motion.div ref={earnMore.ref} animate={earnMore.controls} initial="hidden" variants={animationVariants}>
        <VendorEarnMore />
        </motion.div>

        <VendorBecome />
       
       <motion.div ref={cta.ref} animate={cta.controls} initial="hidden" variants={animationVariants}>
       <HomeCTAPhone />
       </motion.div>
    </PublicLayout>
    )}
   </>
  )
}

export default Page
