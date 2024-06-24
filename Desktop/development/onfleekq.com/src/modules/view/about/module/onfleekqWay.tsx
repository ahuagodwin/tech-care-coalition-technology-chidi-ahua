import { ImgIcon } from "@/constants";
import { onfkQ } from "@/styles";

const OnfleekqWay = () => {
  return (
    <div className="py-20">
      <onfkQ.Container>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-10">
          <section className="flex justify-center items-center lg:items-start flex-col bg-card p-10 rounded-xl">
            <onfkQ.TwoColor primary="Way" secondary="The onfleekQ" />
            <p className="text-18 lg:text-24 text-blackHeader font-outfit font-normal text-justify pt-5">
              We are passionate about creating new things and ways; <br />{" "}
              <br />
              Empowering our minds, colleagues and customers to enable
              fulfillment of company mission and vision; <br /> <br />
              Achieving incremental and large successes; and we don’t forget to
              dream - no target is too big or unconquerable!
            </p>
          </section>
          <section>
            <img src={ImgIcon.AboutCulture} className="rounded-xl" />
          </section>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-10 mt-5 lg:mt-10 mb-5 lg:mb-10">
          <section className="flex justify-center items-center lg:items-start flex-col bg-card p-10 rounded-xl">
            <onfkQ.TwoColor secondary="The onfleekQ" primary="Values" />
            <p className="text-18 lg:text-24 text-blackHeader font-outfit font-normal text-justify pt-5">
            Our values D.R.II.VE our character as a company with the intention to Excel and promote best practices in all our dealings. We exemplify these values throughout our customer journey.
            </p>
          </section>
          <section>
            <img src={ImgIcon.AboutValue} className="rounded-xl" />
          </section>
        </div>
      </onfkQ.Container>
    </div>
  );
};

export default OnfleekqWay;
