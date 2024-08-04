import { RootState } from "@/api/store";
import { DashboardLayout } from "@/components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PatientBiodata from "./modules/Biodata.Patient";
import PatientsPatients from "./modules/Patients.Patients";
import { coalT } from "@/coalition";
import { diagnosis_history, diagnostic_list } from "@/data/patients.data";
import PatientDiagnosis from "./modules/Diagnosis.Patient";
import BloodPressureChart from "./modules/Chart.Patient";

const Patients = () => {
  const { authUser } = useSelector((state: RootState) => state.authUser) as any;
  const [selectedPatient, setSelectedPatient] = useState<number>(3);
  const patients: Patient[] = authUser || [];

  // Initializing state with the ID of the patient outlined in the documentation

  useEffect(() => {
    // Setting the initial selected patient to the first one
    if (patients.length > 0) {
      setSelectedPatient(3);
    }
  }, [patients]);

  const handlePatientClick = (index: number) => {
    setSelectedPatient(index);
  };

  const selectedPatientData = patients[selectedPatient] || null;


  const heartRecord = selectedPatientData?.diagnosis_history
    ? diagnosis_history(selectedPatientData?.diagnosis_history)
    : [];

    const diagnosisHistory = selectedPatientData?.diagnosis_history || [];


  return (
    <DashboardLayout>
      <div className="flex justify-between items-start py-5 gap-5">
        <PatientsPatients
          data={patients}
          selectedPatient={selectedPatient}
          handlePatientClick={handlePatientClick}
        />
        <main className="flex justify-center items-center flex-col w-full">

        {selectedPatientData && (
            <BloodPressureChart selectedPatientData={diagnosisHistory}/>
          )}

          <div className="bg-white px-5 pb-5 pt-2 h-[284px] overflow-y-hidden mb-5 w-full">
              {/* scroll */}
              <section className="overflow-y-scroll h-[250px]">
              <PatientDiagnosis record={heartRecord} />
              </section>
          </div>

          <div className="bg-white rounded-16 p-4 h-[349px] overflow-y-hidden">
            <p className="font-manrope capitalize text-blackHeader font-extrabold text-24 mb-3">
              Diagnostic List
            </p>
            <coalT.Table
              dataSource={selectedPatientData?.diagnostic_list}
              columns={diagnostic_list}
              pagination={false}
              scroll={{ x: true, y: 240 }}
            />
          </div>
        </main>

        {selectedPatientData && (
          <PatientBiodata selectedPatientData={selectedPatientData} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Patients;
