

import { coalT } from "@/coalition";

const PatientDiagnosis = ({ record } : { record: DiagnosisItem[]}) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {record?.map((item, index) => (
                <div
                  className={`flex justify-start items-start flex-col ${item?.bg} p-5 rounded-lg font-manrope w-[265px]`}
                  key={index}
                >
                  <coalT.Image src={item?.icon} preview={false} />
                  <span className="text-16 font-medium text-blackHeader pt-2">
                    {item?.name}
                  </span>
                  <span className="text-30 font-extrabold text-blackHeader">
                    {item?.value}
                  </span>
                  <div className="flex justify-between items-center pt-3">
                  <span className="text-14 font-normal text-blackHeader">
                    {item?.status}
                  </span>
                  <span className="text-14 font-bold text-blackHeader ">
                   {item?.month}
                  </span>
                  </div>
                </div>
              ))}
            </div>
    </div>
  )
}

export default PatientDiagnosis
