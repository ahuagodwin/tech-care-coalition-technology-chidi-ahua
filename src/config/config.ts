
import { Icons, paths } from "@/constants";

export const coalition = {
    apiBaseUrl: import.meta.env.VITE_APP_COALITION_BASE_URL,
    before_auth_path: paths.login,
    after_auth_path: paths.dashboardPatients,
    company: {
        name: 'coalition',
        url: 'coalitiontechnologies.com',
        full_url: 'https://coalitiontechnologies.com',
        slogan: 'SEO, PPC, Web Design and Service Company',
        logo: Icons.Logo,
        copyright: "All Rights Reserved",
        instagram: "http://instagram.com/coalitiontech",
    }
}