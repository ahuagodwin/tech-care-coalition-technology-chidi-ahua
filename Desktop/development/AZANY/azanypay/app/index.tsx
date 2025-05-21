import { getFromAsyncStorage } from '@/config/storage';
import { Color, Images } from '@/constant';
import { Redirect } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { ImageBackground, Animated, StyleSheet } from 'react-native';
import { Circle } from 'react-native-animated-spinkit';

export default function Index() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    // Start the fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const loadApp = async () => {
      try {
        // Check if onboarding has been completed
        const onboardingStatus = await getFromAsyncStorage('@onboarding_completed');
        
        // Add a longer minimum delay to show splash screen (3 seconds)
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Only update states after both checks are complete and delay has passed
        setOnboardingComplete(onboardingStatus === 'true');
        setLoading(false);
      } catch (error) {
        // Fallback in case of errors
        setOnboardingComplete(false);
        setLoading(false);
      }
    };
    
    loadApp();
  }, []);

  if (loading) {
    return (
      <ImageBackground
        source={require("@/assets/images/splash_screen.png")}
        style={styles.backgroundImage}
      >
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <Circle 
            size={50} 
            color={Color.primary}
            style={styles.spinner}
          />
        </Animated.View>
      </ImageBackground>
    );
  }

  // If onboarding has been completed, redirect to login
  // Otherwise, redirect to onboarding
  return <Redirect href={onboardingComplete ? "/login" : "/onboarding"} />;
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.3)', 
  },
  spinner: {
    marginTop: 40,
  },
});
