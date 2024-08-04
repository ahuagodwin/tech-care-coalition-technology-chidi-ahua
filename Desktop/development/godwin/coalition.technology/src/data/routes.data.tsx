
import {  Icons, paths } from "@/constants";


export const mockdata = [
  {
    label: "Overview",
    icon: <Icons.DashboardIcon />,
    path: "#",
    activeBg: "active",
    resetActive: "text-blackHeader",
  },
  {
    label: "Patient",
    icon: <Icons.UserIcon />,
    activeBg: "active",
    resetActive: "text-blackHeader",
    path: paths.dashboardPatients,
  },
  {
    label: "Schedule",
    icon: <Icons.CalendarIcon/>,
    activeBg: "active",
    resetActive: "text-blackHeader",
    path: "#",
  },
  {
    label: "Message",
    icon: <Icons.MessageIcon />,
    activeBg: "active",
    resetActive: "text-blackHeader",
    path: "#",
  },
  {
    label: "Transactions",
    icon: <Icons.TransactionIon />,
    activeBg: "active",
    resetActive: "text-blackHeader",
    path: "#",
  },
];
