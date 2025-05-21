import { NativeSyntheticEvent, Text, TextInput, TextInputFocusEventData, View } from "react-native";

interface InputFieldProps {
  placeholder?: string;
  label?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  secureTextEntry?: boolean;
  validate?: (value: string) => string | undefined;
  value?: string
  onChange?: ((text: string) => void)
  onBlur?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
  error?: string | boolean
  isPadding?: boolean
  isBordered?: boolean
}

const InputField:React.FC<InputFieldProps> = ({ onChange, isPadding, isBordered, onBlur, error, value, keyboardType, label, placeholder, secureTextEntry}) => {
  return (
    <View className={isPadding ? "" : "mt-4"}>
      <Text className="text-black font-semibold text-13">{label}</Text>
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        className={`${isBordered ? "" : "border border-gray-300"} h-[48px] rounded-lg px-4 mt-2 ${
          error ? "border-red-400" : ""
        }`}
      />
      {error && (
        <Text className="text-red-500 pt-1">{error}</Text>
      )}
  </View>
  )
}

export default InputField