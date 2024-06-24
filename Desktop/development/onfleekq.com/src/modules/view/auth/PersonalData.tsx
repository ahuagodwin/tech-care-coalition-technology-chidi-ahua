import { InputField } from "@/components"
import  { ImgIcon } from "@/constants"


const PersonalData = () => {
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
       <InputField type="text" label="Enter your first name" />
       <InputField padding="pt-5" type="text"  label="Enter your last name" />
       <InputField padding="pt-5" label="Gender" options={options} />
       <InputField padding="pt-5" label="Phone Number" type="text"  />
       <InputField padding="pt-5" label="Enter your date of birth (18 years & above)*" type="date" suffix={<ImgIcon.CalenderIcon />}  />
       <InputField padding="pt-5" label="Locale" options={options} />
    </div>
  )
}

export default PersonalData
