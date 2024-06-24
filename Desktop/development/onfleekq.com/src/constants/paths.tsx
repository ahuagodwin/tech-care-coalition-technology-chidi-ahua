

// custom app routes

export const homePrefix = '/';
export const authPrefix = '/auth';
export const adminPrefix = '/admin';
export const vendorPrefix = '/vendor';
export const clientPrefix = '/client';


export const paths = {
    homeIndex: homePrefix ,
    contact: homePrefix + 'contact',
    about: homePrefix + 'about',
    authLogin: authPrefix + '/login',
    vendor: homePrefix + 'vendor',
    vendorRegistration: vendorPrefix + '/registration',
    vendorRegisterStart: vendorPrefix + '/registration/start/?',
    vendorPersonal: vendorPrefix + '/registration/personal', // vendor personal data submission url
    vendorBusiness: vendorPrefix + '/registration/business', // vendor business data submission url
    vendorPreference: vendorPrefix + '/registration/preference', // vendor preference data submission url
    vendorSpecification: vendorPrefix + '/registration/specifications', // vendor business specification url
    vendorSocialHandle: vendorPrefix + '/registration/availability',
    search: homePrefix + "search?search",
    clientDashboard: clientPrefix + '/dashboard'

}