
import { onfkQ } from "@/styles";
import { HeaderStroke } from "@/components";
import { ImgIcon } from "@/constants";


const VendorGift = () => {
  return (
    <div className="py-20">
      <onfkQ.Container>
        <HeaderStroke title="What we Offer" label="What our Vendor Get" size="text-50 lg:text-160 leading-middle lg:leading-large" fontSize="text-30 lg:text-60 leading-normal lg:leading-small" />

    {/* grid one */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-10 lg:mt-20">
            <section className="flex justify-center items-start flex-col p-7 bg-card border border-primary rounded-lg">
               <img src={ImgIcon.VendorIncreaseSale} alt="" />
               <span className="font-outfit text-20 lg:text-25 text-primary font-bold py-3">Increased Sales</span>
               <span className="text-blackHeader text-18 lg:text-24 font-outfit text-justify">By listing products or services on onfleekQ, vendors can increase their sales and revenue by reaching new customers and expanding their market.</span>
            </section>
            <section className="flex justify-center items-start flex-col p-7 bg-card border border-primary rounded-lg">
               <img src={ImgIcon.VendorTakeHome} alt="" />
               <span className="font-outfit text-20 lg:text-25 text-primary font-bold py-3">Take Home More</span>
               <span className="text-blackHeader text-18 lg:text-24 font-outfit text-justify">Reach new clients, build brand awareness, and become 
               a trusted beauty pro by joining the onfleekQ network.</span>
            </section>
        </div>

        {/* grid two */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-5">
            <section className="flex justify-center items-start flex-col p-7 bg-card border border-primary rounded-lg">
               <img src={ImgIcon.VendorMarketing} alt="" />
               <span className="font-outfit text-20 lg:text-25 text-primary font-bold py-3">Marketing Support</span>
               <span className="text-blackHeader text-18 lg:text-24 font-outfit text-justify">onfleekQ offer vendors marketing support, such as email, social media promotions, & other Marketing tools.</span>
            </section>
            <section className="flex justify-center items-start flex-col p-7 bg-card border border-primary rounded-lg">
               <img src={ImgIcon.VendorFlexible} alt="" />
               <span className="font-outfit text-20 lg:text-25 text-primary font-bold py-3">Flexible Working Schedule</span>
               <span className="text-blackHeader text-18 lg:text-24 font-outfit text-justify">When you sign up with us, you have the flexibility to choose your working days and hours...</span>
            </section>

            <section className="flex justify-center items-start flex-col p-7 bg-card border border-primary rounded-lg">
               <img src={ImgIcon.VendorPayment} alt="" />
               <span className="font-outfit text-20 lg:text-25 text-primary font-bold py-3">Fast & Easy Payment Processing</span>
               <span className="text-blackHeader text-18 lg:text-24 font-outfit text-justify">At onfleekQ, we understand the value of your time and effort to provide prompt and fair compensation. </span>
            </section>
        </div>


      </onfkQ.Container>
    </div>
  );
};

export default VendorGift;
