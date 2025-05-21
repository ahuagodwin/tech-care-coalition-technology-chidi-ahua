import { View, Image, TouchableOpacity, Text } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Images } from "@/constant/Images";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { apiServices } from "@/services";
import { ForgotAPIResponse } from "@/types/types";
import { Formik } from "formik";
import { schema } from "@/schema/Schema";
import { useAppDispatch, useAppSelector, useToast } from "@/hooks";
import { Loading, Password } from "@/components/ui";

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const toast = useToast()
  const { isForgotResetLoading } = useAppSelector((state) => state.forgot)
  const { email } = useLocalSearchParams();

  const emailValue = typeof email === 'string' ? email : '';
  const initialValues = {
    password: "",
    password_confirmation: "",
    email: emailValue
  }

  const handleResetPassword = async (values: ForgotAPIResponse) => {
      await dispatch(apiServices.forgotPasswordResetAction(values, toast))
  }

  return (
    <SafeAreaView className="flex 1 justify-start items-center bg-white">
      <View className="max-w-md p-5">
        {/* Logo */}
        <View className="items-start">
          <Image source={Images.Logo} className="w-24 h-10" resizeMode="contain" />
        </View>

        {/* Title */}
        <Text className="mt-8 text-[#2B2B2B] text-13 font-medium uppercase">Let's get you back on track</Text>
        <Text className="text-25 text-[#545454] font-bold mb-3">Reset Your Password</Text>

        <Formik
          initialValues={initialValues}
          validationSchema={schema.forgotResetSchema}
          onSubmit={async ( values: ForgotAPIResponse) => {
            await handleResetPassword(values)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <>
 
              {/* Password Input */}
              <Password
                label="Password"
                placeholder="********"
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                error={touched.password && errors.password}
              />

              {/* Confirm Password Input */}
              <Password
                label="Confirm Password"
                placeholder="********"
                value={values.password_confirmation}
                onChange={handleChange("password_confirmation")}
                onBlur={handleBlur("password_confirmation")}
                error={
                  touched.password_confirmation && errors.password_confirmation
                    ? errors.password_confirmation
                    : undefined
                }
              />

              <Text className="text-12 text-azany pt-1">
                Password Hint: Your password must include at least 1 capital letter and 1 number
              </Text>

              {/* Proceed Button */}
              <TouchableOpacity 
                className={`bg-azany rounded-lg py-5 mt-5`}
                onPress={() => handleSubmit()}
                disabled={isForgotResetLoading}
              >
                <Text className="text-white text-center text-13 font-semibold">
                  Reset Password
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        {/* Register Link */}
        <View className="flex-row justify-center gap-1 mt-3">
          <Text className="text-gray-600">Remember your password?  </Text>
          <Link href="/login">
            <Text className="text-azany font-semibold">LOGIN HERE</Text>
          </Link>
        </View>

      </View>
      {isForgotResetLoading ? <Loading visible={isForgotResetLoading} /> : null}
    </SafeAreaView>
  );
}


export default ResetPassword