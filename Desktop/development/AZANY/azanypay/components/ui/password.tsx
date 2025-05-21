import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";

type PasswordProps = {
  label?: string;
  error?: boolean | string;
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
};

const Password: React.FC<PasswordProps> = ({
  label,
  error,
  placeholder,
  value,
  onChange,
  onBlur,
}) => {
  const [secureText, setSecureText] = useState<boolean>(true);
  return (
    <View className="mt-4">
      <Text className="text-black font-semibold text-13">{label}</Text>
      <>
        <View
          className={`flex-row items-center h-[47px] border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-lg px-4 mt-2`}
        >
          <TextInput
            placeholder={placeholder}
            secureTextEntry={secureText}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            className="flex-1"
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <FontAwesome
              name={secureText ? "eye-slash" : "eye"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        {error && <Text className="text-red-500 pt-1">{error}</Text>}
      </>
    </View>
  );
};

export default Password;