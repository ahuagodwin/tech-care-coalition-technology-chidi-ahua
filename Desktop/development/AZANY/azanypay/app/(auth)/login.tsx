import { View, Image, TouchableOpacity, Text } from "react-native";
import { Images } from "@/constant/Images";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context"
import { Link } from "expo-router";
import { Formik } from "formik";
import { schema } from "@/schema/Schema";
import { apiServices } from "@/services";
import { CheckBox, Input, Loading, Password } from "@/components/ui";
import { LoginCredentials } from "@/types/types";
import { useAppDispatch, useAppSelector, useToast } from "@/hooks";


const Login = () => {
  const toast = useToast()
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth)

  const handleLogin = async (values: LoginCredentials) => {
    await dispatch(apiServices.loginUser(values, toast));
  };

  const initialValues = { 
    email: "", 
    password: "", 
    rememberMe: false 
  }

  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <View className="max-w-md p-5">
        {/* Logo */}
        <View className="items-start">
          <Image source={Images.Logo} className="w-24 h-10" resizeMode="contain" />
        </View>

        {/* Title */}
        <Text className="text-24 text-black font-bold mt-9 mb-5">Welcome Back</Text>

        <Formik
          initialValues={initialValues}
          validationSchema={schema.LoginSchema}
          onSubmit={ async ( values: LoginCredentials) => {
            await handleLogin(values)
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <>
              {/* Email Input */}
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
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                error={touched.password && errors.password}
              />

              {/* Remember Me & Forgot Password */}
              <View className="flex-row justify-between items-center mt-3">
                <CheckBox 
                  label="Remember me" 
                  checked={values.rememberMe}
                  onChange={(isChecked) => setFieldValue("rememberMe", isChecked)} 
                />

                <Link href="/forgot">
                  <Text className="text-azany text-[12.83px] font-medium">Forgot Password?</Text>
                </Link>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                className={`bg-azany rounded-lg py-5 mt-10`}
                onPress={() => handleSubmit()}
                disabled={isLoading}
              >
                <Text className="text-white text-center text-13 font-semibold">
                  Login
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        {/* OR Separator */}
        <View className="flex-row items-center my-4">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-2 text-black">Or</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Social Login Buttons */}
        <View className="flex-row justify-center gap-3 space-x-4 px-2">
          <TouchableOpacity className="flex-row w-[50%] justify-center items-center border border-gray-300 rounded-lg p-4">
            <Image source={Images.GoogleIcon} className="w-5 h-5" resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row w-[50%] justify-center items-center border border-gray-300 rounded-lg p-4">
            <FontAwesome name="apple" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Register Link */}
        <View className="flex-row justify-center gap-1 mt-6">
          <Text className="text-gray-600">Don't have an account? </Text>
          <Link href="/register">
            <Text className="text-azany font-semibold">Create Account</Text>
          </Link>
        </View>
      </View>
      {isLoading ? <Loading visible={isLoading} /> : null}
    </SafeAreaView>
  );
}

export default Login