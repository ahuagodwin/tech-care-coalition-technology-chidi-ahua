import { ImgIcon } from "@/constants";
import { onfkQ } from "@/styles";

const WhoWeAre = () => {
  return (
    <div className="bg-card py-20">
      <onfkQ.Container>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-20">
          <section className="flex justify-center items-start flex-col">
            <p className="flex justify-center items-center lg:items-start text-center lg:text-left text-30 lg:text-60 font-outfit font-bold text-primary pb-4  gap-4">
              <span className="text-blackHeader">Who We</span> Are
            </p>
            <div className="flex justify-center items-center lg:items-start gap-10 text-justify lg:text-left">
              <span className="hidden lg:flex"><ImgIcon.SideLineStyle /></span>
              <span className="text-18 lg:text-24 text-blackHeader font-outfit font-medium">
                onfleekQ Technologies Limited is a Beauty Technology Company
                utilizing technology to meet everyday consumer needs in the
                Beauty, Personal Care and Wellness Sector. 
                < br /> < br />
                The trademarked brand
                and product “onfleekQ” is our flagship on-demand Booking
                Platform for Beauty and Personal Care Services & Products.
              </span>
            </div>
          </section>
          <img src={ImgIcon.AboutWhoWeAre} />
        </div>
      </onfkQ.Container>
    </div>
  );
};

export default WhoWeAre;
