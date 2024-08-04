import { Icons } from '@/constants'
import { coalT } from "@/coalition";


const PatientsPatients = ({ data, selectedPatient, handlePatientClick } : { data: Patient[], selectedPatient: number, handlePatientClick: (index: number) => void }) => {
  return (
    <aside className="w-[600px] bg-white rounded-16 h-[1125px] p-4 overflow-y-hidden">
    <section className="flex justify-between items-center text-24 text-blackHeader font-manrope font-extrabold">
      <span>Patient</span>
      <Icons.SearchIcon aria-label="Search" />
    </section>

    <div className="pt-4 overflow-y-scroll h-[1040px]">
      {data?.map((patient, index) => (
        <div
          key={index}
          className={`flex justify-between items-center py-3 px-3 cursor-pointer ${
            selectedPatient === index ? "bg-activeState" : ""
          }`}
          onClick={() => handlePatientClick(index)}
        >
          <div className="flex justify-center items-start gap-2">
            <coalT.Avatar src={patient?.profile_picture} size={48} alt={`User ${index + 1}`} />
            <section className="flex flex-col text-14 font-manrope">
              <span className="font-bold">{patient.name}</span>
              <span className="text-gray font-normal -mt-1 capitalize">{patient?.gender}, {patient?.age}</span>
            </section>
          </div>
          <Icons.ThreeDotIcon aria-label="More options" />
        </div>
      ))}
    </div>
  </aside>
  )
}

export default PatientsPatients
