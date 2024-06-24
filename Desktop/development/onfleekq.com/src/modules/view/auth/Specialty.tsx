import { InputField } from "@/components"


const Specialty = () => {
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
      <span className="text-24 font-outfit text-blackHeader">Knowing your business specialty will help us tailor and personalize your needs.</span>
        <InputField padding="pt-8" label="Pick your Specialty" options={options} />
       <InputField padding="pt-5" label="Where will you be working" options={options} />
       <InputField padding="pt-5" label="How old is your business" options={options} />
       <InputField padding="pt-5" label="What state in Nigeria will you be working from" options={options} />
    </div>
  )
}

export default Specialty
