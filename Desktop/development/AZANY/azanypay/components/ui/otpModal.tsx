import { Images } from "@/constant/Images";
import { View, Modal, Text, TouchableOpacity, Image } from "react-native";
import OTPInput from "./otp";
import { apiServices } from "@/services";
import { VerifyAPIResponse } from "@/types/types";
import { Formik } from "formik";
import { schema } from "@/schema/Schema";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector, useToast } from "@/hooks";

interface OtpModalProps {
  isVisible: boolean;
  onClose: () => void;
  email: string;
}

const OTPModal:React.FC<OtpModalProps> = ({ isVisible, onClose, email }) => {
  const dispatch = useAppDispatch();
  const toast = useToast()
  const { isForgotOtpLoading, isForgotLoading } = useAppSelector((state) => state.forgot)
  const router = useRouter()

  const initialValues = {
    verification_code: ""
  }

  const handleVerifyOTP = async (values: VerifyAPIResponse) => {
    const navigateToReset = () => {
      router.navigate({
        pathname: "/resetPassword",
        params: { email }
      });
    };

    await dispatch(apiServices.forgotPasswordVerifyAction(values, navigateToReset, toast));
  };

  const handleResendCode = async () => {
    const payload = {
      email: email
    }
      await dispatch(apiServices.forgotPasswordResendOTPAction(payload, toast))
  }

  return (
    <Modal visible={isVisible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-[#000000]/25">
        <View className="bg-white p-6 rounded-[20px] w-96 shadow-lg">
          <View className="flex justify-center items-center">
            <Image source={Images.OTPModalIcon} />
          </View>

          {/* Email */}
          <Text className="text-15 font-medium text-center mb-2">Please check your email.</Text>
          <Text className="text-12 text-[#667085] text-center mb-4 leading-[16.7px]">
            We've sent a code to <Text className="font-semibold">{email}</Text>
          </Text>

          <Formik
            initialValues={initialValues}
            validationSchema={schema.forgotVerifySchema}
            onSubmit={async (values: VerifyAPIResponse) => {
              await handleVerifyOTP(values)
            }}
          >
            {({ values, errors, touched, handleSubmit, setFieldValue }) => (
              <>
                {/* OTP Input */}
                <View className="flex-row justify-center gap-2 space-x-2">
                  <OTPInput
                    length={4}
                    value={values.verification_code || ''}
                    onChange={(code) => setFieldValue("verification_code", code)}
                    autoFocus={true}
                    inputStyle={{
                      width: 68,
                      height: 68,
                      fontSize: 25,
                    }}
                  />
                </View>

                {/* Error message */}
                {errors.verification_code && touched.verification_code && (
                  <Text className="text-red-500 text-xs mt-1 text-center">
                    {errors.verification_code}
                  </Text>
                )}

                {/* Resend Code */}
                <View className="flex flex-row justify-center gap-3 mt-2">
                  <Text className="text-gray-600 text-sm mt-2">Didn't get a code?</Text>
                  <TouchableOpacity onPress={() => handleResendCode()}>
                    <Text className="text-azany text-center text-sm mt-2">{isForgotLoading ? "resending..." : "Click to resend"}</Text>
                  </TouchableOpacity>
                </View>

                {/* Buttons */}
                <View className="flex-row justify-between mt-4">
                  <TouchableOpacity
                    className="flex justify-center items-center border border-gray-400 rounded-lg px-4 py-2 w-[45.8%]"
                    onPress={onClose}
                  >
                    <Text className="text-gray-600">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex justify-center items-center bg-azany rounded-lg px-4 py-2 w-[45.8%]"
                    onPress={() => handleSubmit()}
                    disabled={isForgotOtpLoading}
                  >
                    <Text className="text-white">
                      {isForgotOtpLoading ? "Verifying..." : "Verify"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
}

export default OTPModal