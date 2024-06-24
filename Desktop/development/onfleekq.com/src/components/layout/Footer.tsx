import { onfleekQ } from '@/config/config'
import { ImgIcon } from '@/constants/Images_Icon'
import { paths } from '@/constants/paths'
import { Link } from 'react-router-dom'
import { onfkQ } from '@/styles'


const Footer = () => {

    const company = [
        {
            title: 'Home',
            path: paths.homeIndex
        },
        {
            title: 'About',
            path: paths.about
        },
  
        {
            title: "Careers",
            
        },
        {
            title: 'Contact',
            path: paths.contact
        },
        {
            title: 'Become a Vendor',
            path: paths.vendor
        },
   
    ]

    const terms = [
        {
            title: "Policy",
            path: "#"
        },
        {
            title: "FAQ",
            path: "#"
        },
        {
            title: "Booking Policy",
            path: "#"
        },
        {
            title: "Promo Policy",
            path: "#"
        }
    ]

  return (
        <div style={{ background: `var(--colorCard)`, paddingTop: "4rem"}}>
              <onfkQ.Container>
              <footer className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-[41px]'>
                    <section className='onfleekq_footer'>
                        <span className='footer_header'>
                            <img src={ImgIcon.Logo} alt={onfleekQ.company.name} />
                        </span>
                        <div className='flex justify-start items-center flex-col onfleekq_footer_content'>
                            <span>Stay updated with us on all
                            our social media channels.</span>

                            <div className='flex justify-center items-center lg:items-start space-x-3 mt-5'>
                                <ImgIcon.FacebookIcon size={40} color={`var(--colorPrimary)`} />
                                <ImgIcon.Instagram size={40} color={`var(--colorPrimary)`} />
                                <ImgIcon.LinkedinIcon size={40} color={`var(--colorPrimary)`} />
                                <ImgIcon.TwitterIcon size={40} color={`var(--colorPrimary)`} />
                                <ImgIcon.TiktokIcon size={40} color={`var(--colorPrimary)`} />
                            </div>
                        </div>

                    </section>

                    {/* line two */}
                    <section className='onfleekq_footer'>
                        <span className='footer_header'>
                            Company
                        </span>
                        <div className='flex justify-start items-start flex-col onfleekq_footer_content'>
                            {company.map((item, index) => (
                                <Link to={item?.path ?? ''} key={index}>{item?.title}</Link>
                            ))}
                        </div>

                    </section>

                    {/* line three */}
                    <section className='onfleekq_footer'>
                        <span className='footer_header'>
                            Terms & Conditions
                        </span>
                        <div className='flex justify-start items-start flex-col onfleekq_footer_content'>
                        {terms.map((item, index) => (
                                <Link to={item?.path ?? ''} key={index}>{item?.title}</Link>
                            ))}
                        </div>

                    </section>

                    {/* line four */}
                    <section className='onfleekq_footer'>
                        <span className='footer_header'>
                            Subscribe
                        </span>
                        <div className='flex justify-start items-center flex-col onfleekq_footer_content'>
                            <span>Beauty tips, special offers, 
                                and our latest services 
                                & products
                            </span>
                            <div className='subscribe_button'>
                                <input className='px-[24px]' type="text" placeholder='subscribe' />
                                <ImgIcon.SubscribeIcon />
                            </div>
                        </div>

                    </section>
                </footer>

                <div className='flex justify-center items-center'>
                        <section className='onfleekq_footer_copyright'>
                                Copyright © {new Date().getFullYear()} {onfleekQ.company.name} | {onfleekQ.company.slogan} | {onfleekQ.company.copyright}
                        </section>
                </div>
              </onfkQ.Container>
        </div>
  )
}

export default Footer
