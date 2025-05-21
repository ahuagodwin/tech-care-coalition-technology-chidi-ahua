import { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, ViewToken, ImageSourcePropType } from 'react-native';
import { useRouter } from 'expo-router';
import { saveToAsyncStorage } from '@/config/storage';
import { FontAwesome } from '@expo/vector-icons';
import { Images } from '@/constant';


const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  subtitle?: string;
  image: string | ImageSourcePropType;
  buttonText?: string;
  showSignInOptions?: boolean;
}

// Logo 
const LOGO = Images.AuthLogo;

// slides
const slides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Transfer with Ease',
    subtitle: 'Your Gateway to Global Funds',
    image: Images.Splash6,
    buttonText: 'Continue',
    showSignInOptions: false
  },
  {
    id: '2',
    title: 'The Smart Choice for',
    subtitle: 'Fast and Secure Remittances',
    image: Images.Splash4,
    buttonText: 'Let\'s Get Started',
    showSignInOptions: true
  },
  {
    id: '3',
    title: 'African Vision Card',
    subtitle: 'Security and Efficiency',
    image: Images.Splash5,
    buttonText: 'Sign in with Email',
    showSignInOptions: true
  },
];

const Onboarding = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollToNext = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = async () => {
    // Saving onboarding when completed
    await saveToAsyncStorage('@onboarding_completed', 'true');
    // Navigating to login screen
    router.replace("/login");
  };

  const handleButtonPress = () => {
    if (currentIndex === slides.length - 1) {
      completeOnboarding();
    } else {
      scrollToNext();
    }
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google sign-in logic
    console.log('Sign in with Google');
  };

  const handleAppleSignIn = () => {
    //TODO: Implement Apple sign-in logic
    console.log('Sign in with Apple');
  };

  // Get button style based on current slide index
  const getButtonStyle = () => {
    // For slide index 0 (id '1') and index 1 (id '2'): transparent with white border
    if (currentIndex === 0 || currentIndex === 1) {
      return styles.transparentButton;
    }
    // For slide index 2 (id '3'): white background
    else {
      return styles.whiteButton;
    }
  };

  // Get button text style based on current slide index
  const getButtonTextStyle = () => {
    // For slide index 0 (id '1') and index 1 (id '2'): white text
    if (currentIndex === 0 || currentIndex === 1) {
      return styles.whiteButtonText;
    }
    // For slide index 2 (id '3'): black text
    else {
      return styles.blackButtonText;
    }
  };

  // Get Google button style based on current slide index
  const getGoogleButtonStyle = () => {
    // For slide index 1 (id '2'): transparent with white border
    if (currentIndex === 1) {
      return styles.transparentSocialButton;
    }
    // For slide index 2 (id '3'): white background
    else {
      return styles.googleButton;
    }
  };

  // Get Apple button style based on current slide index
  const getAppleButtonStyle = () => {
    // For slide index 1 (id '2'): transparent with white border
    if (currentIndex === 1) {
      return styles.transparentSocialButton;
    }
    // For slide index 2 (id '3'): black background
    else {
      return styles.appleButton;
    }
  };

  // Get Google icon color based on current slide index
  const getGoogleIconColor = () => {
    return currentIndex === 1 && styles.defaultSocialIcon
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={LOGO}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      <FlatList
        data={slides}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            {/* Full screen background image */}
            <Image
              source={typeof item.image === 'string' ? { uri: item.image } : item.image}
              style={styles.image}
              resizeMode="cover"
            />
            
            {/* Text overlay */}
            <View style={styles.textContainer}>
              <Text style={styles.title} className='font-montserrat'>{item.title}</Text>
              {item.subtitle && (
                <Text style={styles.subtitle} className='font-montserrat'>{item.subtitle}</Text>
              )}
            </View>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />
      
      {/* Indicators */}
      <View style={styles.indicatorContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index ? styles.activeIndicator : styles.inactiveIndicator,
            ]}
          />
        ))}
      </View>
      
      {/* Primary button with conditional styling */}
      <TouchableOpacity 
        style={[styles.primaryButtonBase, getButtonStyle()]} 
        onPress={handleButtonPress}
      >
        <Text style={getButtonTextStyle()}>
          {slides[currentIndex].buttonText || 'Next'}
        </Text>
        {currentIndex === slides.length - 3 && (
          <FontAwesome 
            name="arrow-right" 
            size={16} 
            color={currentIndex === 1 ? 'white' : 'white'} 
            style={styles.buttonIcon} 
          />
        )}
      </TouchableOpacity>
      
      {/* Sign-in options with conditional styling */}
      {slides[currentIndex].showSignInOptions && (
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity 
            style={[styles.socialButtonBase, getGoogleButtonStyle()]} 
            onPress={handleGoogleSignIn}
          >
            <Image 
              source={Images.GoogleIcon}
              style={[styles.socialIcon, getGoogleIconColor()]} 
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.socialButtonBase, getAppleButtonStyle()]} 
            onPress={handleAppleSignIn}
          >
            <FontAwesome 
              name="apple" 
              size={24} 
              color={currentIndex === 1 ? 'white' : 'black'} 
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default Onboarding

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  logo: {
    width: 80,
    height: 40,
  },
  slide: {
    width,
    height: '100%',
  },
  image: {
    width,
    height: '100%',
    position: 'absolute',
  },
  textContainer: {
    position: 'absolute',
    bottom: 180,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'semibold',
    color: '#FDEEEE',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#FDEEEE',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 165,
    width: '100%',
  },
  indicator: {
    height: 4,
    width: 16,
    borderRadius: 2,
    marginHorizontal: 3,
  },
  activeIndicator: {
    backgroundColor: 'white',
  },
  inactiveIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  // Base button style for positioning and size
  primaryButtonBase: {
    paddingVertical: 16,
    borderRadius: 8,
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Transparent button with white border for slides 1 and 2
  transparentButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
  },
  // White button for slide 3
  whiteButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
  },
  // White text for transparent buttons
  whiteButtonText: {
    color: 'white',
    fontWeight: 'medium',
    fontSize: 16,
    textAlign: 'center',
  },
  // Black text for white button
  blackButtonText: {
    color: '#344054',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  // Base style for social buttons
  socialButtonBase: {
    paddingVertical: 15,
    borderRadius: 8,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Google button style (for slide 3)
  googleButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: "white"
  },
  // Apple button style (for slide 3)
  appleButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: "white"
  },
  // Transparent social button with white border (for slide 2)
  transparentSocialButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
  },
  // Default social icon style
  socialIcon: {
    width: 24,
    height: 24,
  },
  // White social icon for transparent buttons for google when i want to set initial color any color
  whiteSocialIcon: {
    tintColor: 'white',
  },
  // Default social icon color
  defaultSocialIcon: {
    tintColor: undefined,
  }
});