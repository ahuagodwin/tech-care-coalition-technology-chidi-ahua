import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ImgIcon } from "@/constants";
import { onfkQ } from "@/styles";
import { VideoPlayer } from "./VideoPlayer";
import { onfleekQ } from "@/config";

interface Slide {
  id?: number;
  bgImage?: string;
  content?: JSX.Element;
  nextIconColor?: string;
  prevIconColor?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    bgImage: ImgIcon.HeroBg,
    nextIconColor: `var(--colorWhite)`,
    prevIconColor: `var(--colorPrimary)`,
    content: (
      <div className="">
        <section className="flex justify-center items-center lg:items-start flex-col h-full">
          <span className="text-center lg:text-left text-40 lg:text-82 font-normal font-imprint custom-grad leading-none lg:leading-[6rem]">
            Need Fast & Reliable Beauty Services or Products?
          </span>

          <div className="block lg:flex justify-center items-start">
            <section className="flex justify-center items-center lg:items-start flex-col">
              <span className="hidden lg:flex text-18 lg:text-24 text-blackHeader font-outfit font-normal py-10 w-full lg:w-[538px] text-justify">
                Look no further for fast and reliable beauty services and
                products! We understand the importance of feeling and looking
                your best, which is why we have curated a selection of top-notch
                services and products to meet your beauty needs.
              </span>
              <div className="button_flex gap-2 lg:gap-5 pt-4">
              <onfkQ.Button
                type="onfleekq"
                bgColor="bg-primary hover:bg-blackHeader"
                color="onfleekq_white"
                name="Apple Store"
                label="Download on the"
                icon={
                  <ImgIcon.ArrowIcon width="28" color="var(--colorWhite)" />
                }
                storeIcon={
                  <ImgIcon.AppleIcon size={45} color="text-blackHeader" />
                }
                border="shadow-custom1"
              />
              <onfkQ.Button
                type="onfleekq"
                bgColor="bg-card hover:bg-blackHeader"
                color="onfleekq_primary"
                name="Apple Store"
                label="Download on the"
                icon={
                  <ImgIcon.ArrowIcon width="28" color="var(--colorPrimary)" />
                }
                storeIcon={<img src={ImgIcon.GoogleIcon} />}
                border="border-2 border-primary hover:border-blackHeader shadow-custom1"
              />
            </div>
            </section>

            <div className="w-full h-screen lg:h-full relative">
              <img
                src={ImgIcon.HeroLady}
                alt="hero"
                className="m-0 lg:-mt-32 lg:-ml-20 w-full h-full"
              />
              <div className="onfleekq_slogan_spin">
                <img
                  className="main_circle_rotate"
                  src={ImgIcon.BeautyRotate}
                  alt={onfleekQ.company.slogan}
                />
                <span className="main_circle">
                  {" "}
                  <img src={ImgIcon.Slogan1} alt={onfleekQ.company.slogan} />
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    ),
  },

  {
    id: 2,
    bgImage: ImgIcon.Slider2Bg,
    nextIconColor: `var(--colorPrimary)`,
    prevIconColor: `var(--colorPrimary)`,
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 lg:gap-20">
        <section className="flex justify-center items-center lg:items-start flex-col">
          <span className="text-center lg:text-left text-45 lg:text-80 font-medium font-outfit leading-[3rem] lg:leading-[6rem]">
            Your Journey to * Timeless Beauty Begins Here
          </span>

          <p className="text-blackHeader font-normal text-25 lg:text-41 py-3">
            Book. Buy. <span className="text-primary">Beautify</span>
          </p>
          <div className="button_flex gap-2 lg:gap-5 pt-4">
            <onfkQ.Button
              type="onfleekq"
              bgColor="bg-primary hover:bg-blackHeader"
              color="onfleekq_white"
              name="Apple Store"
              label="Download on the"
              icon={<ImgIcon.ArrowIcon width="28" color="var(--colorWhite)" />}
              storeIcon={
                <ImgIcon.AppleIcon size={45} color="text-blackHeader" />
              }
              border="shadow-custom1"
            />
            <onfkQ.Button
              type="onfleekq"
              bgColor="bg-card hover:bg-blackHeader"
              color="onfleekq_primary"
              name="Apple Store"
              label="Download on the"
              icon={
                <ImgIcon.ArrowIcon width="28" color="var(--colorPrimary)" />
              }
              storeIcon={<img src={ImgIcon.GoogleIcon} />}
              border="border-2 border-primary hover:border-blackHeader shadow-custom1"
            />
          </div>
        </section>
        <section className="flex justify-center items-center gap-5">
          <img src={ImgIcon.Slider2} alt="" className="h-[430px] lg:h-[auto]" />
          <p className="hidden lg:flex justify-center items-center flex-col w-[100%] h-[177px] space-y-96">
            <span className="text-blackHeader text-24 font-outfit font-normal">
              Easy to use
            </span>
            <VideoPlayer videoId="g9DoQlCJ1yQ" />
          </p>
        </section>
      </div>
    ),
  },

  {
    id: 3,
    bgImage: ImgIcon.Slider3Bg,
    nextIconColor: `var(--colorPrimary)`,
    prevIconColor: `var(--colorPrimary)`,
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 lg:gap-20">
        <div className="flex justify-center items-center gap-7">
          <section className="flex justify-center items-center lg:items-start flex-col">
            <onfkQ.TwoColor secondary="No. 1 Booking App" />
            <span className="text-center lg:text-left text-45 lg:text-90 font-bold font-outfit text-primary leading-[3rem] lg:leading-[6rem]">
              for Beauty & Personal Care
            </span>
            <div className="button_flex gap-2 lg:gap-5 pt-4">
              <onfkQ.Button
                type="onfleekq"
                bgColor="bg-primary hover:bg-blackHeader"
                color="onfleekq_white"
                name="Apple Store"
                label="Download on the"
                icon={
                  <ImgIcon.ArrowIcon width="28" color="var(--colorWhite)" />
                }
                storeIcon={
                  <ImgIcon.AppleIcon size={45} color="text-blackHeader" />
                }
                border="shadow-custom1"
              />
              <onfkQ.Button
                type="onfleekq"
                bgColor="bg-card hover:bg-blackHeader"
                color="onfleekq_primary"
                name="Apple Store"
                label="Download on the"
                icon={
                  <ImgIcon.ArrowIcon width="28" color="var(--colorPrimary)" />
                }
                storeIcon={<img src={ImgIcon.GoogleIcon} />}
                border="border-2 border-primary hover:border-blackHeader shadow-custom1"
              />
            </div>
          </section>
        </div>
        <section className="flex justify-center items-center gap-5">
          <img src={ImgIcon.Slider3} alt="" />
        </section>
      </div>
    ),
  },

  {
    id: 4,
    bgImage: ImgIcon.Slider4Bg,
    nextIconColor: `var(--colorWhite)`,
    prevIconColor: `var(--colorWhite)`,
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
        <section className="flex justify-center items-center lg:items-start flex-col pt-24">
          <span className="text-center lg:text-left text-45 lg:text-80 font-bold font-outfit leading-[3rem] lg:leading-[5rem] text-white">
            Your Journey to * Timeless Beauty Begins Here
          </span>

          <p className="text-white font-semibold text-25 lg:text-41 py-3">
            Book. Buy. <span className="text-primary">Beautify</span>
          </p>
          <div className="button_flex gap-2 lg:gap-5 pt-4">
            <onfkQ.Button
              type="onfleekq"
              bgColor="bg-primary hover:bg-blackHeader"
              color="onfleekq_white"
              name="Apple Store"
              label="Download on the"
              icon={<ImgIcon.ArrowIcon width="28" color="var(--colorWhite)" />}
              storeIcon={
                <ImgIcon.AppleIcon size={45} color="text-blackHeader" />
              }
              border="shadow-custom1"
            />
            <onfkQ.Button
              type="onfleekq"
              bgColor="bg-card hover:bg-blackHeader"
              color="onfleekq_primary"
              name="Apple Store"
              label="Download on the"
              icon={
                <ImgIcon.ArrowIcon width="28" color="var(--colorPrimary)" />
              }
              storeIcon={<img src={ImgIcon.GoogleIcon} />}
              border="border-2 border-primary hover:border-blackHeader shadow-custom1"
            />
          </div>
        </section>
      </div>
    ),
  },

  {
    id: 5,
    bgImage: ImgIcon.Slider5Bg,
    nextIconColor: `var(--colorWhite)`,
    prevIconColor: `var(--colorWhite)`,
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
        <div className="flex justify-center items-center gap-7">
          <section className="flex justify-center items-center lg:items-start flex-col pt-24">
            <span className="text-30 lg:text-60 text-white lg:text-blackHeader font-outfit font-bold">No. 1  Booking App</span>
            <span className="text-center lg:text-left text-45 lg:text-90 font-bold font-outfit text-white leading-[3rem] lg:leading-[6rem]">
              for Beauty & Personal Care
            </span>
            <div className="button_flex gap-2 lg:gap-5 pt-4">
              <onfkQ.Button
                type="onfleekq"
                bgColor="bg-primary hover:bg-blackHeader"
                color="onfleekq_white"
                name="Apple Store"
                label="Download on the"
                icon={
                  <ImgIcon.ArrowIcon width="28" color="var(--colorWhite)" />
                }
                storeIcon={
                  <ImgIcon.AppleIcon size={45} color="text-blackHeader" />
                }
                border="shadow-custom1"
              />
              <onfkQ.Button
                type="onfleekq"
                bgColor="bg-card hover:bg-blackHeader"
                color="onfleekq_primary"
                name="Apple Store"
                label="Download on the"
                icon={
                  <ImgIcon.ArrowIcon width="28" color="var(--colorPrimary)" />
                }
                storeIcon={<img src={ImgIcon.GoogleIcon} />}
                border="border-2 border-primary hover:border-blackHeader shadow-custom1"
              />
            </div>
          </section>
        </div>
      </div>
    ),
  },
];

const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const variants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };



  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="relative overflow-hidden h-screen lg:h-[869px] bg-center bg-cover bg-no-repeat">
      <AnimatePresence initial={false} custom={direction}>
        {slides.map((slide, index) =>
          index === currentSlide ? (
            <motion.div
              key={slide.id}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-0 right-0 bottom-0 w-full h-full pt-10 lg:pt-20 justify-center items-center"
              style={{
                backgroundImage: `url(${slide.bgImage})`,
                backgroundPosition: `center`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <onfkQ.Container>
                <div className="h-full flex items-center justify-center">
                  {slide.content}
                </div>
              </onfkQ.Container>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      
            <ImgIcon.ChevronLeft
              color={slides[currentSlide]?.prevIconColor}
              className="cursor-pointer hidden lg:flex  absolute top-1/2 left-10 transform -translate-y-1/2 z-10"
              onClick={handlePrev}
              size={30}
            />
            <ImgIcon.ChevronRight
              color={slides[currentSlide]?.nextIconColor}
              className="cursor-pointer hidden lg:flex  absolute top-1/2 right-10 transform -translate-y-1/2 z-10"
              onClick={handleNext}
              size={30}
            />
    
    </div>
  );
};

export default Slider;
