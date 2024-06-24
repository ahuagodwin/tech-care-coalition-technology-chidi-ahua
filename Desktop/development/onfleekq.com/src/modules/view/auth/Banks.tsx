import { InputField } from "@/components"


const BankSocial = () => {
    const options = [
        {
            label: "Male",
            value: "Male",
        },
        {
            label: "Female",
            value: "Female",
        }
    ]
  return (
    <div className="w-full">
      <span className="text-24 font-outfit text-blackHeader">Verify your bank and social media availability.</span>
        <InputField padding="pt-8" label="Do you have a bank account?" options={options} />
       <InputField padding="pt-5" label="Do you have a social media account?" options={options} />
    
    </div>
  )
}

export default BankSocial
