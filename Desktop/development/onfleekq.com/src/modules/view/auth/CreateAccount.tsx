import { AuthLayout, LoadingModal } from "@/components";
import { ImgIcon, paths } from "@/constants";
import { onfkQ } from "@/styles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  const [ isLoading, setIsLoading ] = useState<boolean>(true)

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
          <AuthLayout isAuth={true} label="Let's Create an Account">
          <span className="flex justify-center items-center text-center text-16 lg:text-30 text-blackHeader font-outfit font-normal py-3">
            Signing up for onfleekQ is fast & Free - no commitments or long term
            contracts
          </span>
            <onfkQ.Container>
                    <div className="block lg:flex justify-between items-center py-10 gap-40">
                        <section className="space-y-4">
                        <div className="block lg:flex justify-center items-center gap-5">
                            <img src={ImgIcon.QuickSetupIcon} alt="" />
                            <section className="flex justify-start items-start flex-col">
                              <span className="text-20  lg:text-40 text-primary font-bold font-outfit">Quick Setup</span>
                              <span className="text-18 lg:text-24 w-full lg:w-[420px] text-blackHeader font-outfit font-normal">Fill out a few details and you will be 
                              on your way to taking payments in no time.</span>
                            </section>
                          </div>
    
                          <div className="block lg:flex justify-center items-center gap-5 my-5 lg:my-0">
                            <img src={ImgIcon.GetPaidIcon} alt="" />
                            <section className="flex justify-start items-start flex-col">
                              <span className="text-20  lg:text-40 text-primary font-bold font-outfit">Get Paid Fast</span>
                              <span className="text-18 lg:text-24 w-full lg:w-[420px] text-blackHeader font-outfit font-normal">See funds in your bank account in as little as one or two business days.</span>
                            </section>
                          </div>
    
                          <div className="block lg:flex justify-center items-center gap-5">
                            <img src={ImgIcon.PriceTag} alt="" />
                            <section className="flex justify-start items-start flex-col">
                              <span className="text-20  lg:text-40 text-primary font-bold font-outfit">Manage Your Bookings</span>
                              <span className="text-18 lg:text-24 w-full lg:w-[420px] text-blackHeader font-outfit font-normal">Set your schedule by choosing the days and hours that work best for you.</span>
                            </section>
                          </div>
    
                        </section>
    
                        <section className="mt-10 lg:mt-0">
                          <img src={ImgIcon.CreateAccountBg} alt="" />
                        </section>
                    </div>
                    <div className="flex justify-center items-center">
                      <Link to={paths.vendorPersonal}><onfkQ.Button label="Get Started" type="primary" /></Link>
                    </div>
            </onfkQ.Container>
        </AuthLayout>
        )}
    </>
  );
};

export default CreateAccount;
