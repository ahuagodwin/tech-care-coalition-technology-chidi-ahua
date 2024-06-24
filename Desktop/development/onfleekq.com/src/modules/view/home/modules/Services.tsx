import { Cards, HeaderStroke } from "@/components/common";
import { ImgIcon } from "@/constants/Images_Icon";
import { serviceData } from "@/data/service.data";

const Services = () => {

  return (
    <div className="home_services pb-28 pt-5 lg:pt-20" style={{ background: `var(--colorWhite)`}}>
      <HeaderStroke
        img={ImgIcon.ServiceBg}
        title="What We Offer"
        label="Our Services"
        size="text-[40px] sm:text-[20px] lg:text-[160px] leading-[32.4px] lg:leading-[79.7px]"
        fontSize="text-[30px] lg:text-[60px] leading-[auto] lg:leading-[20px]"
      />
      <div className="onfleekq_container">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-20">
          {serviceData.map((item, index) => (
            <Cards img={item?.img} label={item?.label} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Services;
