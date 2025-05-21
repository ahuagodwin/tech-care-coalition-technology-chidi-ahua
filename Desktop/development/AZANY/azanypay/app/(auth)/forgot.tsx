import { View, Image, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { Images } from "@/constant/Images";
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useState } from "react";
import { apiServices } from "@/services";
import { ForgotAPIResponse } from "@/types/types";
import { Formik } from "formik";
import { schema } from "@/schema/Schema";
import { useAppDispatch, useAppSelector, useToast } from "@/hooks";
import { Input, Loading, OTPModal } from "@/components/ui";
import { Color } from "@/constant";


const Forgot = () => {
  const dispatch = useAppDispatch();
  const toast = useToast()
  const { isForgotLoading, isActive } = useAppSelector((state) => state.forgot);
  const [ email, setEmail] = useState("");

  const initialValues = {
    email: ""
  };

  const handleSubmit = async (values: ForgotAPIResponse) => {
    if (values.email) {
      setEmail(values.email);
    }
    await dispatch(apiServices.forgotPasswordAction(values, toast));
  };

  return (
    <SafeAreaView className="flex-1 justify-start items-center bg-white">
      <View className="max-w-md p-5">
        {/* Logo */}
        <View className="items-start">
          <Image source={Images.Logo} className="w-24 h-10" resizeMode="contain" />
        </View>

        {/* Title */}
        <Text className="mt-8 text-[#2B2B2B] text-13 font-medium uppercase">Let's get you back on track</Text>
        <Text className="text-25 text-[#545454] font-bold">Reset Your Password</Text>
        <Text className="text-[#424242] text-13 font-medium my-5">Enter your email, and we will send a 4-digit OTP to verify your identity.</Text>

        <Formik
          initialValues={initialValues}
          validationSchema={schema.forgotSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              {/* Email Input */}
              <Input
                label="Email Address"
                placeholder="example@gmail.com"
                keyboardType="email-address"
                value={values.email}
                onChange={handleChange('email')}
                error={touched.email && errors.email}
              />

              {/* Proceed Button */}
              <TouchableOpacity 
                className="bg-azany rounded-lg py-5 mt-5"
                onPress={() => handleSubmit()}
                accessible={true}
                accessibilityLabel="Proceed button"
                accessibilityHint="Submit your email to receive an OTP"
                accessibilityRole="button"
              >
              <Text className="text-white text-center text-13 font-semibold">Proceed</Text>
             
              </TouchableOpacity>
            </>
          )}
        </Formik>

        {/* Register Link */}
        <View className="flex-row justify-center gap-1 mt-3">
          <Text className="text-gray-600">Remember your password? </Text>
          <Link href="/login" accessible={true} accessibilityLabel="Login link">
            <Text className="text-azany font-semibold">LOGIN HERE</Text>
          </Link>
        </View>

        {/* OTP Modal */}
        <OTPModal 
             email={email} 
             isVisible={isActive} 
             onClose={() => dispatch(apiServices.setIsForgotActive(false))}
         />
      </View>

      {isForgotLoading ? <Loading visible={isForgotLoading} color={Color.primary} /> : null }
    </SafeAreaView>
  );
}

export default Forgot