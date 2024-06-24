import { ImgIcon } from "@/constants/Images_Icon";
import { paths } from "@/constants/paths";



export const onfleekQ = {
    apiBaseUrl: import.meta.env.VITE_APP_API_URL,
    before_auth_path: paths.vendorRegistration,
    after_auth_path: paths.clientDashboard,
    company: {
        name: 'onfleekQ',
        url: 'onfleekq.com',
        full_url: 'https://onfleekq.com',
        slogan: 'Premium Booking Platform for Beauty',
        logo: ImgIcon.Logo,
        copyright: "All Rights Reserved",
        headerKey: import.meta.env.VITE_APP_SECRET_URL
    }
}