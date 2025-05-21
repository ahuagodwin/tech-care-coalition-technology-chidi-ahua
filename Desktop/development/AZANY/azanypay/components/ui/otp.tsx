import { Color } from '@/constant/Colors';
import React, { useRef, useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  inputStyle?: object;
  containerStyle?: object;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 4,
  value = '',
  onChange,
  autoFocus = false,
  inputStyle = {},
  containerStyle = {},
}) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));

  // Update internal OTP state when value changes externally
  useEffect(() => {
    const valueArray = value.split('').slice(0, length);
    const newOtp = Array(length).fill('');
    
    valueArray.forEach((digit, index) => {
      newOtp[index] = digit;
    });
    
    setOtp(newOtp);
  }, [value, length]);

  const handleOTPChange = async (index: number, digit: string) => {
    // If more than one character, likely a paste operation
    if (digit.length > 1) {
      try {
        // Filter only numbers and take only up to the length needed
        const filteredValue = digit
          .replace(/[^0-9]/g, '')
          .slice(0, length);
        
        // Create new OTP array with pasted values
        const newOtp = Array(length).fill('');
        filteredValue.split('').forEach((char, i) => {
          if (i < length) {
            newOtp[i] = char;
          }
        });
        
        setOtp(newOtp);
        onChange(newOtp.join(''));
        
        // Focus the appropriate input after pasting
        const nextIndex = Math.min(index + filteredValue.length, length - 1);
        setTimeout(() => {
          inputRefs.current[nextIndex]?.focus();
        }, 0);
      } catch (error) {
        console.error('Error handling paste:', error);
      }
      return;
    }

    // Handle single digit input
    const newOtp = [...otp];
    
    // Only accept numeric input
    if (/^[0-9]$/.test(digit) || digit === '') {
      newOtp[index] = digit;
      setOtp(newOtp);
      onChange(newOtp.join(''));
    }

    // Auto focus next input if current input is filled
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    // Handle backspace - focus previous input if current is empty
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {Array(length).fill(0).map((_, index) => (
        <TextInput
          key={`otp-input-${index}`}
          ref={(el) => (inputRefs.current[index] = el)}
          style={[
            styles.input, 
            otp[index] ? styles.inputFilled : {},
            inputStyle
          ]}
          maxLength={1}
          keyboardType="numeric"
          value={otp[index]}
          onChangeText={(value) => handleOTPChange(index, value)}
          onKeyPress={({ nativeEvent }: NativeSyntheticEvent<TextInputKeyPressEventData>) => 
            handleKeyPress(index, nativeEvent.key)
          }
          autoFocus={autoFocus && index === 0}
          textContentType="oneTimeCode" 
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 7,
  },
  input: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderColor: Color['border-stroke'],
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'white',
  },
  inputFilled: {
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    color: Color.primary
  },
});

export default OTPInput;