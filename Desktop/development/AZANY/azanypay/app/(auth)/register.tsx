import { View, Image, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Link } from "expo-router";
import { Images } from "@/constant/Images";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context"
import { Formik } from "formik";
import { schema } from "@/schema/Schema";
import { RegisterData } from "@/types/types";
import { useEffect, useState } from "react";
import { apiServices } from "@/services";
import { useAppDispatch, useAppSelector, useToast } from "@/hooks";
import { CheckBox, Input, Loading, Password, Select } from "@/components/ui";


const Register = () => {
  const dispatch = useAppDispatch()
  const toast = useToast()
  const { isRegisterLoading } = useAppSelector(state => state.register);
  const [ isChecked, setIsChecked ] = useState<boolean>(false);
  const { countries } = useAppSelector((state) => state.countries)

  const initialValues = {
    first_name: "",
    last_name: "", 
    email: "",
    password: "",
    country_id: ""
  }


  useEffect(() => {
    dispatch(apiServices.getAllCountriesAction(toast))
  },[dispatch])


  const handleSubmit = async (values: RegisterData) => {
    await dispatch(apiServices.createRegisterAction(values, toast));
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 max-w-md mx-auto px-5">
        {/* Logo */}
        <View className="items-start">
          <Image source={Images.Logo} className="w-24 h-10" resizeMode="contain" />
        </View>

        {/* Title */}
        <Text className="text-24 text-black font-bold mt-5 mb-5">Create your Account</Text>
        
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80, paddingTop: 5 }}
        >
          <Text className="text-[#2B2B2B] text-13 font-medium">Unlock your passage to seamless multi-currency finances today.</Text>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={100}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={schema.RegisterSchema}
              onSubmit={async (values: RegisterData) => {
                await handleSubmit(values);
              }}
            >
              {({ handleChange, handleBlur, setFieldValue, handleSubmit, values, errors, touched }) => (
                <>
                  <Input
                    label="First Name"
                    placeholder="enter first name"
                    keyboardType="default"
                    onChange={handleChange("first_name")}
                    value={values.first_name}
                    onBlur={handleBlur("first_name")}
                    error={touched.first_name && errors.first_name}
                  />
                  <Input
                    label="Last Name"
                    placeholder="enter last name"
                    keyboardType="default"
                    onChange={handleChange("last_name")}
                    value={values.last_name}
                    onBlur={handleBlur("last_name")}
                    error={touched.last_name && errors.last_name}
                  />
                  <Input
                    label="Email Address"
                    placeholder="enter your email address"
                    keyboardType="email-address"
                    onChange={handleChange("email")}
                    value={values.email}
                    onBlur={handleBlur("email")}
                    error={touched.email && errors.email}
                  />

                  {/* Password Input */}
                  <Password
                    label="Password"
                    placeholder="********"
                    onChange={handleChange("password")}
                    value={values.password}
                    onBlur={handleBlur("password")}
                    error={touched.password && errors.password}
                  />

                  <Select
                    label="Country"
                    data={countries?.data || []}
                    valueField="id"
                    labelField="name"
                    onSelect={(selectedItem) => {
                      setFieldValue("country_id", selectedItem.id);
                    }}
                    placeholder="Select your country"
                    searchable={true}
                    maxHeight={300}
                    error={touched.country_id && errors.country_id ? String(errors.country_id) : undefined}
                    defaultValue={countries?.data?.find(
                      (country) => country?.id === values?.country_id
                    )}
                  />

                  {/* Remember Me & Forgot Password */}
                  <View className="flex-row justify-between items-center mt-3">
                    <CheckBox label="I agree to the terms and condition" onChange={(checked) => setIsChecked(checked)} />
                  </View>

                  {/* Login Button */}
                  <TouchableOpacity
                    className="bg-azany rounded-lg py-5 mt-5"
                    disabled={!isChecked || isRegisterLoading}
                    onPress={() => handleSubmit()}
                  >
                    <Text className="text-white text-center text-13 font-semibold">
                      Create Account
                    </Text>
                  </TouchableOpacity>   
                </>
              )}
            </Formik>
          </KeyboardAvoidingView>

          {/* OR Separator */}
          <View className="flex-row items-center my-5">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-2 text-black">Or</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Social Login Buttons */}
          <View className="flex-row justify-center gap-3 space-x-2 px-2">
            <TouchableOpacity className="flex-row w-[48%] justify-center items-center border border-gray-300 rounded-lg p-4">
              <FontAwesome name="google" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row w-[48%] justify-center items-center border border-gray-300 rounded-lg p-4">
              <FontAwesome name="apple" size={20} color="black" />
            </TouchableOpacity>
          </View>

          {/* Register Link */}
          <View className="flex-row justify-center gap-1 mt-5 mb-5">
            <Text className="text-gray-600">Already have an account? </Text>
            <Link href="/login">
              <Text className="text-azany font-semibold">Login</Text>
            </Link>
          </View>
        </ScrollView>
      </View>
      {isRegisterLoading ? <Loading visible={isRegisterLoading} /> : null}
    </SafeAreaView>
  );
}

export default Register