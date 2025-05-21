import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { Link } from 'expo-router'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useToast } from '@/hooks'
import { Input, Loading } from '@/components/ui'
import { Color } from '@/constant'


// Interface for form values
interface ProfileFormValues {
  firstName: string;
  lastName: string;
}

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
});

const ProfileSetup = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const toast = useToast()

  const pickImage = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant camera roll permissions to upload a photo');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      toast.showError('Failed to pick image!')
    }
  };

  const handleSubmit = async (
    values: ProfileFormValues, 
    { setSubmitting }: FormikHelpers<ProfileFormValues>
  ) => {
    if (!profileImage) {
      toast.showError('Please upload a profile photo!')
      setSubmitting(false);
      return;
    }

    setIsLoading(true);
    
    try {
      // Create FormData for image upload
      const formData = new FormData();
      
      // Correctly append the image in a React Native compatible way
      formData.append('profileImage', {
        uri: profileImage,
        type: 'image/jpeg',
        name: 'profile-image.jpg',
      } as unknown as Blob);
      
      //TODO: API call
      // const response = await fetch('your-api-endpoint', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });

      // Simulate successful API call
      setTimeout(() => {
        setIsLoading(false);
        setSubmitting(false);
    
      }, 1500);
      router.navigate("/success")
    } catch (error) {
      console.error('Error submitting profile:', error);
      toast.showError('Failed to save profile!')
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Formik
        initialValues={{ firstName: '', lastName: '' }}
        validationSchema={ProfileSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
            <View className="flex-1 justify-center items-center px-4">
              <View className="flex-row justify-start items-center w-full py-6 px-4 gap-10">
                <Link href="/verifySignup" className="bg-azany px-2 py-1 rounded-[10px]">
                  <AntDesign name="arrowleft" color="white" size={25} />
                </Link>
                <Text className="text-black text-20 font-semibold">Set up your Profile</Text>
              </View>

              <View className="flex-col justify-center items-center py-4">
                <Text className="text-gray-medium text-16">Please set up your profile</Text>
              </View>
              
              <TouchableOpacity 
                className="flex justify-center items-center w-32 h-32 rounded-full bg-azany my-8"
                onPress={pickImage}
              >
                {profileImage ? (
                  <Image 
                    source={{ uri: profileImage }} 
                    className="w-32 h-32 rounded-full border-2 border-border-stroke" 
                  />
                ) : (
                  <View className="flex justify-center items-center">
                    <Feather name="camera" size={32} color="white" />
                    <Text className="text-sm text-white mt-2">Add Photo</Text>
                  </View>
                )}
              </TouchableOpacity>

              <Text className="text-gray-medium mb-6">Click above to upload a profile photo</Text>

              {/* Form Fields */}
              <View className="w-full px-4 space-y-4">
                <Input
                  placeholder="Enter your first name"
                  value={values.firstName}
                  label="First Name"
                  onChange={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  error={touched.firstName && errors.firstName ? errors.firstName : undefined}
                />
                
                <Input
                  placeholder="Enter your last name"
                  value={values.lastName}
                  label="Last Name"
                  onChange={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  error={touched.lastName && errors.lastName ? errors.lastName : undefined}
                />
              </View>

              <View className="flex-row justify-center items-center w-full mt-8 px-4">
                <TouchableOpacity 
                  activeOpacity={0.7} 
                  className={`flex flex-row justify-center items-center w-full h-[48px] rounded-lg px-4 ${(isLoading || isSubmitting) ? 'bg-azany-light' : 'bg-azany'}`}
                  onPress={() => handleSubmit()}
                  disabled={isLoading || isSubmitting}
                >
                  {(isLoading || isSubmitting) ? (
                    <Text className="text-white text-base font-medium">Saving...</Text>
                  ) : (
                    <Text className="text-white text-base font-medium">Save Profile</Text>
                  )}
                   <Text className="text-white text-base font-medium">Save Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
   
        )}
      </Formik>
        {isLoading ? <Loading visible={isLoading} color={Color.primary} /> : null }
    </SafeAreaView>
  );
};

export default ProfileSetup;