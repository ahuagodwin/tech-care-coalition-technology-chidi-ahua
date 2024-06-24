import { onfkQ } from "@/styles";
import { HeaderStroke } from "@/components";
import { ImgIcon } from "@/constants";
import { onfleekQ } from "@/config";
import { useHook } from "@/helper";
import { motion } from 'framer-motion'

const BecomeVendor = () => {
    const appDownload = useHook.useAnimateOnInView();
    const profile = useHook.useAnimateOnInView();
    const createYour = useHook.useAnimateOnInView();

    const animationVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 2 } }
    };


  return (
    <div className="pt-10 pb-20">

        <motion.div ref={appDownload.ref} animate={appDownload.controls}  initial="hidden" variants={animationVariants}>

      <onfkQ.Container>
        <HeaderStroke
          title="Become a Vendor"
          label={
            <div>
              How to become a <span className="text-blackHeader">Vendor</span>{" "}
            </div>
          }
          size="text-40 lg:text-160 leading-middle lg:leading-large"
          fontSize="text-30 lg:text-60 leading-normal lg:leading-small"
        />
      </onfkQ.Container>

      <div className="bg-card py-10 mt-20">
        <onfkQ.Container>
          <div className="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-40 ">
                <section className="order-2 lg:order-1">
                    <img src={ImgIcon.VendorDownloadAPP} alt={onfleekQ.company.name} />
                </section>
                <section className="order-1 lg:order-2 flex justify-center text-center lg:text-left lg:items-start flex-col">
                    <span className="text-120 lg:text-200 font-bold font-outfit font-fill text-card leading-none">01</span>
                    <span className="text-30 lg:text-60 font-outfit font-bold text-primary">DOWNLOAD THE</span>
                    <span className="text-30 lg:text-60 font-outfit font-bold text-blackHeader">APPLICATION</span>
                    <span className="text-18 lg:text-30 font-outfit font-normal text-blackHeader">Download the onfleekQ App to get 
                    started.</span>
                </section>
          </div>

        </onfkQ.Container>
      </div>
      </motion.div>

      {/* grid two */}

     <motion.div ref={profile.ref} animate={profile.controls} initial="hidden" variants={animationVariants}>
     <div className="py-20">
          <onfkQ.Container>
                          {/* grid two */}
          <div className="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-40 ">
                <section className="order-2 lg:order-2">
                    <img src={ImgIcon.VendorVerification} alt={onfleekQ.company.name} />
                </section>
                <section className="order-1 lg:order-1 flex justify-center text-center lg:text-left lg:items-start flex-col">
                    <span className="text-120 lg:text-200 font-bold font-outfit font-fill text-white leading-none">02</span>
                    <span className="text-30 lg:text-60 font-outfit font-bold text-primary">COMPLETE PROFILE</span>
                    <span className="text-30 lg:text-60 font-outfit font-bold text-blackHeader">VERIFICATION</span>
                    <span className="text-18 lg:text-30 font-outfit font-normal text-blackHeader">We need to be sure you are ready to become our vendor. Here we verify your details and business to be sure they are in line with onfleekQ standards.</span>
                </section>
          </div>
          </onfkQ.Container>
      </div>
     </motion.div>


      {/* grid three */}
    <motion.div ref={createYour.ref} animate={createYour.controls} initial="hidden" variants={animationVariants}>
    <div className="bg-card py-20">
        <onfkQ.Container>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-40 ">
                <section className="order-2 lg:order-1">
                    <img src={ImgIcon.VendorPortfolio} alt={onfleekQ.company.name} />
                </section>
                <section className="order-1 lg:order-2 flex justify-center text-center lg:text-left lg:items-start flex-col">
                    <span className="text-120 lg:text-200 font-bold font-outfit font-fill text-card leading-none">03</span>
                    <span className="text-30 lg:text-60 font-outfit font-bold text-primary">CREATE YOUR</span>
                    <span className="text-30 lg:text-60 font-outfit font-bold text-blackHeader">PROFILE</span>
                    <span className="text-18 lg:text-30 font-outfit font-normal text-blackHeader">Once you have downloaded the onfleekQ App, go ahead to create your store profile.</span>
                </section>
          </div>

        </onfkQ.Container>
      </div>
    </motion.div>

    </div>
  );
};

export default BecomeVendor;
