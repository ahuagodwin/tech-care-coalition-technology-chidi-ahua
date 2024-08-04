import { Icons } from "@/constants"

export const diagnostic_list = [
    {
        title: 'Problem/Diagnosis',
        dataIndex: 'name',
        key: 'name',
        width: 150,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
]

  
  // updating diagnosis_history to handle undefined data
  export const diagnosis_history = (data?: DiagnosisHistory[]): DiagnosisItem[] => {
    // return empty array if data is undefined
    if (!data) {
      return [];
    }
  
    // processing each record in the data array
    return data.flatMap((record) => [
      {
        icon: Icons.RespiratoryRateIcon,
        name: "Respiratory Rate",
        status: record.respiratory_rate?.levels || "N/A",
        value: `${record.respiratory_rate?.value || 0} bpm`,
        month: record?.month,
        bg: "bg-respiratoryBg"
      },
      {
        icon: Icons.TemperatureRateIcon,
        name: "Temperature Rate",
        status: record.temperature?.levels || "N/A",
        value: `${record.temperature?.value || 0} °F`,
        month: record?.month,
        bg: "bg-temperatureBg"
      },
      {
        icon: Icons.HeartRateIcon,
        name: "Heart Rate",
        status: record.heart_rate?.levels || "N/A",
        value: `${record.heart_rate?.value || 0} bpm`,
        month: record?.month,
        bg: "bg-heartBg"
      }
    ]);
  };

  
  