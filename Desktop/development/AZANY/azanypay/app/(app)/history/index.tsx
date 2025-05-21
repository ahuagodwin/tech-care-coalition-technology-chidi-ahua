import { View, Text } from 'react-native'
import React from 'react'
import { useAppSelector } from '@/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';


const history = () => {
    const { auth } = useAppSelector(state => state.auth)

  return (
      <SafeAreaView className='flex-1 bg-white'>
                    <View className='flex-1 p-5 justify-center items-center'>
                      <Text className='text-28 font-bold mb-2'>Coming Soon</Text>
                      <Text className='text-16 text-gray text-center'>Hi {auth?.first_name || 'there'}, we're working on this feature.</Text>
                    </View>
              </SafeAreaView>
  );
}

export default history