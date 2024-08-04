import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { coalT } from "@/coalition";

// Mapping of full month names to abbreviations
const monthAbbreviations: { [key: string]: string } = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec"
};

// Function to transform the data
const transformData = (data: any) => {
  if (!data) return [];

  const chartData = data.map((record: any) => ({
    month: `${monthAbbreviations[record.month]} ${record.year}`,
    systolic: record.blood_pressure?.systolic?.value,
    systolicLevel: record.blood_pressure?.systolic?.levels,
    diastolic: record.blood_pressure?.diastolic?.value,
    diastolicLevel: record.blood_pressure?.diastolic?.levels
  }));

  return chartData;
};

// BloodPressureChart Component
const BloodPressureChart = ({ diagnosisHistory }: { diagnosisHistory: any }) => {
  const data = transformData(diagnosisHistory);

  return (
    <ResponsiveContainer width="100%" height={300} aspect={3} className="font-normal text-12 text-blackHeader">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="systolic" stroke="#E66FD2" activeDot={{ r: 8 }} name="Systolic" />
        <Line type="monotone" dataKey="systolicLevel" stroke="#072635" name="Systolic Level" />
        <Line type="monotone" dataKey="diastolic" stroke="#8C6FE6" name="Diastolic" />
        <Line type="monotone" dataKey="diastolicLevel" stroke="#072635" name="Diastolic Level" />
      </LineChart>
    </ResponsiveContainer>
  );
};

const items = [
  {
    value: '1',
    label: "Last month"
  },

  {
    value: '2',
    label: "Last 6 Months"
  },
]

const App = ({ selectedPatientData }: { selectedPatientData: any }) => (

  <div className='w-full bg-white p-5 rounded-t-16 font-manrope'>
      <p className='text-24 font-extrabold text-blackHeader pb-5'>Diagnosis History</p>
      <div className='bg-[#F4F0FE] p-3 rounded-16'>
          <div className='flex justify-between items-center pb-5'>
            <span className='text-18 text-blackHeader font-bold'>Blood Pressure Chart</span>
            <coalT.Select
              options={items}
              defaultValue="2"
              className='bg-transparent'
              style={{ background: "transparent" }}
              variant="borderless"
            />
          </div>
        <BloodPressureChart diagnosisHistory={selectedPatientData} />
      </div>
  </div>
);

export default App;
