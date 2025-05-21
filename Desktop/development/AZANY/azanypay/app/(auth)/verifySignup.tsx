import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { Images } from '@/constant/Images'
import { AntDesign } from '@expo/vector-icons'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { Formik } from 'formik'
import { schema } from '@/schema/Schema'
import { VerifyAPIResponse } from '@/types/types'
import { apiServices } from '@/services'
import { Color } from '@/constant/Colors'
import { useAppDispatch, useAppSelector, useToast } from '@/hooks'
import { Loading, OTPInput } from '@/components/ui'


const VerifySignup = () => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useAppDispatch()
  const { email } = useLocalSearchParams();
  const { isVerifyLoading } = useAppSelector((state) => state.verify)
  const { isRegisterResendOTPLoading } = useAppSelector((state) => state.register)

  const emailValue = typeof email === 'string' ? email : '';
  
  const handleResendCode = async () => {
    const payload = {
      email: emailValue
    }
    await dispatch(apiServices.registerResendOTPAction(payload))
  };

  return (
    <SafeAreaView className='flex-1 justify-start items-center'>
      <View className="flex-row justify-start items-center w-full py-6 px-5 gap-10">
        <Link href="/register" className="bg-azany px-2 py-1 rounded-[10px]">
          <AntDesign name="arrowleft" color="white" size={25} />
        </Link>
        <Text className="text-black text-20 font-semibold">Verify your email</Text>
      </View>
      <ScrollView className='flex-1 max-w-md' contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        <View className="flex justify-center items-center">
          <Image source={Images.EmailOTPIcon} width={100} height={100} className='w-40 h-40' />
        </View>

        <View className='flex flex-col justify-center items-center py-10'>
          <Text className='text-16 font-medium text-black'>Please check your email.</Text>
          <Text className='text-gray-500 pt-2'>We've sent a code to {email}</Text>
        </View>

        <Formik
          initialValues={{ code: '' }}
          validationSchema={schema.verificationSchema}
          onSubmit={ async (values: VerifyAPIResponse) => {
                await dispatch(apiServices.verifyRegisterCodeAction(values, toast))
          }}
        >
          {({ handleSubmit, values, errors, touched, setFieldValue }) => (
            <>
              {/* OTP Input */}
              <View className="flex-row justify-center gap-2 space-x-2">
                <OTPInput
                  length={4}
                  value={values.code || ''}
                  onChange={(code) => setFieldValue('code', code)}
                  autoFocus={true}
                  inputStyle={{
                    width: 80,
                    height: 80,
                    fontSize: 25,
                  }}
                />
              </View>

              {errors.code && touched.code && (
                <Text className="text-red-500 text-center mt-2">{errors.code}</Text>
              )}

              <View className='flex flex-row justify-center items-center gap-2 py-10'>
                <Text className='text-gray-medium'>Didn't get a code? </Text>
                <TouchableOpacity onPress={handleResendCode} disabled={isRegisterResendOTPLoading}>
                  {isRegisterResendOTPLoading ? (
                    // <ActivityIndicator size="small" color={Color.primary} />
                    <Text className='text-azany font-semibold'>sending...</Text>
                  ) : (
                    <Text className='text-azany font-semibold'>Click to resend.</Text>
                  )}
                </TouchableOpacity>
              </View>

              <View className='flex flex-row justify-center items-center gap-2'>
                <TouchableOpacity 
                  activeOpacity={1} 
                  onPress={() => router.back()}
                  className='flex flex-row cursor-pointer justify-center items-center w-[40%] bg-white border-gray-medium border h-[48px] rounded-[10px] px-4 mr-2'
                >
                  <Text className='text-black text-16 font-medium'>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => handleSubmit()} 
                  disabled={isVerifyLoading}
                  activeOpacity={1} 
                  className={`flex cursor-pointer flex-row justify-center items-center w-[40%] bg-azany h-[48px] rounded-[10px] px-4`}
                >
                  <Text className='text-white text-16 font-medium'>Verify</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
      {isVerifyLoading ? <Loading visible={isVerifyLoading} /> : null}
    </SafeAreaView>
  )
}

export default VerifySignup