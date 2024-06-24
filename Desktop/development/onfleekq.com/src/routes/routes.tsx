import  { Suspense, lazy } from 'react';
import { paths } from "@/constants/paths";
import { Routes, Route } from "react-router-dom";
import { LoadingModal } from '@/components';
import { AuthCreateAccount, FormController } from '@/modules/view/auth';


// Lazy load components
const HomeIndex = lazy(() => import('@/modules/view/home/home'));
const AboutPage = lazy(() => import('@/modules/view/about/page'));
const ContactPage = lazy(() => import('@/modules/view/contact/page'));
const VendorPage = lazy(() => import('@/modules/view/vendor/page'));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingModal isLoading={true} />}>
      <Routes>
        <Route path={paths.homeIndex} index element={<HomeIndex />} />
        <Route path={paths.about} element={<AboutPage />} />
        <Route path={paths.contact} element={<ContactPage />} />
        <Route path={paths.vendor} element={<VendorPage />} />
        <Route path={paths.vendorRegistration} element={<AuthCreateAccount />} />
        <Route path={paths.vendorPersonal} element={<FormController />} />
      </Routes>
    </Suspense>
  );
};
