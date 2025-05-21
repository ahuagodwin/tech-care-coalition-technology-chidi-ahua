import { useEffect, useState } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { Provider } from 'react-redux';
import { setAuthToken } from '@/api/connect';
import { persistor, store } from '@/store';
import "@/global.css"
import { PersistGate } from 'redux-persist/integration/react';
import { asyncStorageAuthKey, getFromAsyncStorage } from '@/config/storage';
import { useAppSelector } from '@/hooks';
import { Loading, ToastContainer } from '@/components/ui';
import PullToRefresh from '@/components/common/pullToRefresh';


function RootLayoutNav() {
  const { isLoading, token } = useAppSelector((state) => state?.auth);
  const segments = useSegments();
  const router = useRouter()


  useEffect(() => {
    // On initial mount, check AsyncStorage first
    const checkStoredToken = async () => {
      const storedToken = await getFromAsyncStorage(asyncStorageAuthKey);
      if (storedToken && !token) {
        setAuthToken(storedToken);
      }
    };
    checkStoredToken();
  }, []);
  
  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);


  // Handle protected routes
  useEffect(() => {
    if (isLoading) return;
    
    const inAuthGroup = segments[0] === "(auth)";
    const inAppGroup = segments[0] === "(app)";
    
    // Specifically handle onboarding, which is part of auth group but shouldn't redirect to home
    const isOnboardingScreen = segments[0] === "(auth)" && segments[1] === "onboarding";
    
    if (!token && !inAuthGroup && segments.length > 0) {
      // If the user is not signed in and not in auth group, redirect to sign-in page
      router.replace("/login");
    } else if (token && inAuthGroup && !isOnboardingScreen) {
      // If the user is signed in and in auth group (but not onboarding), redirect to dashboard
      router.replace("/dashboard");
    } else if (!token && inAppGroup) {
      // If user is not signed in but trying to access app routes, redirect to login
      router.replace("/login");
    }
  }, [token, segments, isLoading, router]);

  // Show loading screen during initial authentication check
  if (isLoading && segments.length < 1) {
    return <Loading />;
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
           <RootLayoutNav />
            <ToastContainer />
        </PersistGate>
    </Provider>
  );
}
