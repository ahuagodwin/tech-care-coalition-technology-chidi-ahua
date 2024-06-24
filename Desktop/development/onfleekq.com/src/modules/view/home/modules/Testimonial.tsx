import { HeaderStroke } from "@/components";
import { onfkQ } from "@/styles";
import { ImgIcon } from "@/constants/Images_Icon";
import { useState } from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonial.data";

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);


  const variants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="onfleekq_bg_light pt-5 pb-28">
      <HeaderStroke
        title="Customers Stories"
        label="Testimonials & Reviews"
        size="caption_size_large"
        fontSize="caption_size_small"
      />

      <onfkQ.Container>
        {testimonials?.map((item, index) => (
         <motion.div
         initial="enter"
         animate={index === activeIndex ? "center" : "exit"}
         variants={variants}
         transition={{ duration: 0.5 }}
         className="mt-10"
         >
        <div className={`testimonials_wrapper ${index === activeIndex ? "block" : "hidden"}`} key={index}>
            <section
              className="testimonial_content"
            >
              <img src={ImgIcon.QuoteIcon} alt="" />
              <p className="words">{item?.quote}</p>
              <span className="name">{item?.name}</span>
              <span className="position">{item?.position}</span>

              <div className="flex justify-center items-center w-full pt-5 gap-2">
                {testimonials.map((_, index) => (
                  <span
                    key={index}
                    className={`test_paginate ${
                      index === activeIndex ? "active" : "inherit"
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                
                  </span>
                ))}
              </div>
            </section>
            <section className="customer_img">
              <img
                src={testimonials[activeIndex].customerImg}
                alt={item?.name}
              />
            </section>
          </div>
         </motion.div>
        ))}
      </onfkQ.Container>
    </div>
  );
};

export default Testimonial;
