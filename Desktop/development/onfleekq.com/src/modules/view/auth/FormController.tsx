import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout, LoadingModal } from "@/components";
import { ImgIcon, paths } from "@/constants";
import { onfkQ } from "@/styles";
import PersonalData from "./PersonalData";
import Business from "./Bussiness";
import ApplyingAs from "./ApplyingAs";
import Specialty from "./Specialty";
import BankSocial from "./Banks";

const stepContents = [
  {
    title: "Personal Data",
    content: <PersonalData />,
  },
  {
    title: "Tell us About your Business",
    content: <Business />,

  },
  {
    title: "What are you Applying as?",
    content: <ApplyingAs />,
  },
  {
    title: "Business Specialty?",
    content: <Specialty />
  },
  {
    title: "Bank & Social media availability",
    content: <BankSocial />
  },
];

const FormController = () => {
  const [ isLoading, setIsLoading  ] = useState<boolean>(true)
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => prev + 1);
  const prev = () => setCurrent((prev) => prev - 1);

  const items = stepContents.map((item) => ({
    key: item.title,
    title: item.title,
  }));


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
         <AuthLayout isSidebar={false}>
         <onfkQ.Container>
           <div className="flex justify-center items-center flex-col">
             <Link to={paths.homeIndex}>
               <img src={ImgIcon.Logo} alt="Logo" />
             </Link>
             <onfkQ.TwoColor
               primary={<div className="bg-primary text-white rounded-xl px-4">Started</div>}
               secondary="Welcome, let's get"
             />
             <div className="block lg:flex w-full mt-4 mx-auto ml-0 lg:ml-40 pt-10">
               <onfkQ.Steps
                 className="w-full lg:w-1/4 bg-sidebar p-5"
                 current={current}
                 items={items}
                 direction="vertical"
                 responsive={true}
               />
               <div className="p-0 lg:p-4 rounded w-full lg:w-6/12 ml-0 lg:ml-4 mx-auto">
                 {stepContents[current].content}
               </div>
             </div>
   
             <div className="mt-6">
               {current > 0 && (
                 <onfkQ.Button2
                   style={{ margin: "0 8px" }}
                   onClick={prev}
                   size="large"
                   danger
                   className="font-bold font-outfit w-[12rem] shadow-none"
                 >
                   Previous
                 </onfkQ.Button2>
               )}
               {current === stepContents.length - 1 ? (
                 <onfkQ.Button2
                   type="primary"
                   onClick={() => onfkQ.message.success("Processing complete!")}
                   size="large"
                   danger
                   className="font-bold font-outfit w-[12rem] shadow-none"
                 >
                   Done
                 </onfkQ.Button2>
               ) : (
                 <onfkQ.Button2
                   type="primary"
                   onClick={next}
                   size="large"
                   danger
                   className="font-bold font-outfit w-[12rem] shadow-none"
                 >
                   Next
                 </onfkQ.Button2>
               )}
             </div>
             <span className="pt-3 text-blackHeader text-16 font-outfit">Already have an account? <Link to={paths.homeIndex} className="text-primary font-bold">Sign in</Link></span>
           </div>
         </onfkQ.Container>
       </AuthLayout>
      )}
   </>
  );
};

export default FormController;
