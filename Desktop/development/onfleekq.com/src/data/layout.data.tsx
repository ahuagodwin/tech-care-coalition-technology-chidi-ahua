
// header data json

import { onfleekQ } from "@/config/config";
import { ImgIcon } from "@/constants/Images_Icon";
import { paths } from "@/constants/paths";

export const headerData = [
    {
        title: <img src={ImgIcon.SearchIcon} alt="search icon" />,
        path: paths.search,
        childrenLeft: [
            {
                title: "Home",
                path: paths.homeIndex
            },
            {
                title: "About",
                path: paths.about
            },
            {
                title: "Contact",
                path: paths.contact
            },
        ],

        company: [
            {
                title: <img src={onfleekQ.company.logo} alt={onfleekQ.company.name || onfleekQ.company.slogan} />,
                path: paths.homeIndex,
            }
        ],
   

        childrenRight: [
            {
                title: "Blog",
                path: "#"
            },
            {
                title: "Career",
                path: "#"
            },
            {
                title: <span className="onfleekq_header_vendor hover:bg-blackHeader">Become a Vendor</span>,
                path: paths.vendor
            },
        ],
    }
]