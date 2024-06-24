import { InputField } from "@/components"


const Business = () => {
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
        <span className="text-24 font-outfit text-blackHeader">Every Business is unique, we want to know about yours. If you  registered your business with CAC, make sure the information  you submit matches what is on your TIN & CAC documents</span>
        <InputField padding="pt-5" label="What  kind of Business are you?" options={options} />
       <InputField type="text" padding="pt-5" label="What is your business name?" />
       <InputField padding="pt-5" label="Proof of Identity" options={options} />
       <InputField padding="pt-5" type="text"  label="What is your business address" />
       <InputField padding="pt-5" label="What state do you reside" options={options} />
       <InputField padding="pt-5" label="Your LGA" options={options} />
       <InputField padding="pt-5" label="Your City" options={options} />
    </div>
  )
}

export default Business
