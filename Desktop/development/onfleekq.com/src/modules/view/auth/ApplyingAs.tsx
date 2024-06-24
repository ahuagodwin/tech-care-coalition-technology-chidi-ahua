import { InputField } from "@/components"


const ApplyingAs = () => {
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
        <span className="text-24 font-outfit text-blackHeader">No matter what you sell, onfleekQ has the tools to take your business where you want to go.</span>
        <InputField padding="pt-10" label="Applying As?" options={options} />
    </div>
  )
}

export default ApplyingAs
