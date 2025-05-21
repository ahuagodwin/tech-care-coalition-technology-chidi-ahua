import { Image, SafeAreaView, Text, View, Animated, Easing } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Images, Color } from '@/constant'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const Success = () => {
  // Animation values
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const textOpacityAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter()

  useEffect(() => {
    // Scale animation for the check circle
    Animated.sequence([
      // First appear with a bounce effect
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(2)),
      }),
      // Scale back to normal size
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();

    // Rotation animation
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start();

    // Opacity animation for the check circle
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    // Text fade-in animation (delayed)
    Animated.timing(textOpacityAnim, {
      toValue: 1,
      duration: 500,
      delay: 300,
      useNativeDriver: true,
    }).start();

    const redirectTimer = setTimeout(() => {
      router.replace('/login');
    }, 5000);
  
    return () => clearTimeout(redirectTimer);
  }, [router]);

  // Interpolate rotation value to create the rotation animation
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-45deg', '0deg'],
  });

  return (
    <SafeAreaView className='flex-1'>
      <View className='max-w-md p-5'>
        <View className="items-start">
          <Image source={Images.Logo} className="w-24 h-10" resizeMode="contain" />
        </View>

        <View className='flex flex-row justify-center items-center py-24'>
          <Animated.View
            style={{
              transform: [
                { scale: scaleAnim },
                { rotate: rotation }
              ],
              opacity: opacityAnim
            }}
          >
            <AntDesign name="checkcircle" size={180} color={Color.primary} />
          </Animated.View>
        </View>

        <Animated.View className='flex flex-col justify-center items-center' style={{ opacity: textOpacityAnim }}>
          <Text className='text-azany text-40 font-montserrat font-bold'>Congrats</Text>
          <Text className='text-azany font-semibold text-16'>Account Registered</Text>
           <Text className='text-azany font-semibold text-16'>Successfully</Text>
        </Animated.View>

        
        <Animated.View className='flex flex-row justify-center items-center pt-5' style={{ opacity: textOpacityAnim }}>
              <Text className='text-azany'>Redirecting, please wait...</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  )
}

export default Success