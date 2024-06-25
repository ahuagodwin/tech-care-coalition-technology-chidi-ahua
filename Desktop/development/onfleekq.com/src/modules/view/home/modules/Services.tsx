import { Cards, HeaderStroke } from "@/components/common";
import { ImgIcon } from "@/constants/Images_Icon";
import { serviceData } from "@/data/service.data";
import { onfkQ } from "@/styles";

const Services = () => {
  return (
    <div
      className="home_services pb-28 pt-5 lg:pt-20"
      style={{ background: `var(--colorWhite)` }}
    >
      <HeaderStroke
        img={ImgIcon.ServiceBg}
        title="What We Offer"
        label="Our Services"
        size="text-[40px] sm:text-[20px] lg:text-[160px] leading-[32.4px] lg:leading-[79.7px]"
        fontSize="text-[30px] lg:text-[60px] leading-[20px] lg:leading-[20px]"
      />

      <onfkQ.Container>
        <div className="mt-10 lg:mt-20 flex justify-center items-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-5">
            {serviceData?.map((item, index) => (
              <Cards img={item?.img} label={item?.label} key={index} />
            ))}
          </div>
        </div>
      </onfkQ.Container>
    </div>
  );
};
export default Services;
