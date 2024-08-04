import { Icons } from '@/constants'
import React from 'react'
import { coalT } from "@/coalition";


const PatientBiodata:React.FC<PatientBiodataProps> = ({ selectedPatientData }) => {
  return (
    <div className="w-[600px]">
    <article className="w-full bg-white rounded-16 h-full p-4 font-manrope">
      <div className="flex justify-center items-center">
        <coalT.Image
          src={selectedPatientData?.profile_picture}
          width="200px"
          height="200px"
          preview={false}
          alt={selectedPatientData?.name}
        />
      </div>
      <span className="flex justify-center items-center text-24 font-extrabold text-blackHeader py-6">
        {selectedPatientData?.name}
      </span>
      {[
        { label: 'Date of Birth', value: selectedPatientData?.date_of_birth, icon: <Icons.CalendarIcon /> },
        { label: 'Gender', value: selectedPatientData?.gender, icon: <Icons.GenderIcon /> },
        { label: 'Contact Info', value: selectedPatientData?.phone_number, icon: <Icons.CallIcon /> },
        { label: 'Emergency Contacts', value: selectedPatientData?.emergency_contact, icon: <Icons.CallIcon />},
        { label: 'Insurance Provider', value: selectedPatientData?.insurance_type, icon: <Icons.InsuranceIcon /> },
      ].map((item, index) => (
        <div key={index} className="flex gap-2 pb-6">
          <coalT.Avatar icon={item?.icon} size={42} className="bg-iconBg text-blackHeader" />
          <section className="flex flex-col text-14 font-manrope">
            <span className="text-blackHeader font-medium">{item?.label}</span>
            <span className="font-bold text-blackHeader capitalize">{item?.value}</span>
          </section>
        </div>
      ))}
      <coalT.Button
        type="primary"
        shape="round"
        style={{ background: `var(--colorShowAll)`, color: `var(--colorBlackHeader)` }}
        className="w-full text-14 font-bold font-manrope"
      >
        Show All Information
      </coalT.Button>
    </article>

    <article className="bg-white w-full rounded-16 p-4 font-manrope h-[405px] overflow-y-hidden mt-5">
      <span className="flex justify-start items-start text-24 text-blackHeader font-manrope font-extrabold pb-5">
        Lab Result
      </span>
      <div className="h-[300px] overflow-y-auto">
        {selectedPatientData?.lab_results?.map((item, index) => (
          <section className="flex justify-between items-center pb-3 cursor-pointer" key={index}>
            <span className="text-13 font-normal">{item}</span>
            <Icons.DownloadIcon aria-label="Download Lab Results" />
          </section>
        ))}
      </div>
    </article>
  </div>
  )
}

export default PatientBiodata
