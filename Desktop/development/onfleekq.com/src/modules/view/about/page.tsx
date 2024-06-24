import { LoadingModal, PublicLayout } from '@/components'
import { AboutCulture, AboutHero, AboutOffer, AboutVisionFocus, AboutWhoWeAre } from './module'
import { useHook } from '@/helper';
import { motion } from "framer-motion"
import { HomeCTAPhone } from '../home/modules';
import { useEffect, useState } from 'react';

const Page = () => {
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const bookBuy = useHook.useAnimateOnInView();
    const whoWeAre = useHook.useAnimateOnInView()
    const offer = useHook.useAnimateOnInView()
    const visionFocus = useHook.useAnimateOnInView()
    const culture = useHook.useAnimateOnInView()
    const cta = useHook.useAnimateOnInView()

  
    const animationVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 2 } }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 5000));
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
            <motion.div ref={bookBuy.ref} animate={bookBuy.controls} initial="hidden" variants={animationVariants}>
                <AboutHero />
            </motion.div>

            <motion.div ref={whoWeAre.ref} animate={whoWeAre.controls} initial="hidden" variants={animationVariants}>
                <AboutWhoWeAre />
            </motion.div>

            <motion.div ref={offer.ref} animate={offer.controls} initial="hidden" variants={animationVariants}>
                <AboutOffer />
            </motion.div>

            <motion.div ref={visionFocus.ref} animate={visionFocus.controls} initial="hidden" variants={animationVariants}>
                <AboutVisionFocus />
            </motion.div>

            <motion.div ref={culture.ref} animate={culture.controls} initial="hidden" variants={animationVariants}>
                <AboutCulture />
            </motion.div>

            <motion.div ref={cta.ref} animate={cta.controls} initial="hidden" variants={animationVariants}>
                <HomeCTAPhone />
            </motion.div>
        </PublicLayout>
    )}
</>
  )
}

export default Page
