import { Stack } from 'expo-router';

export default function HistoryLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'History',
          headerStyle: {
            backgroundColor: '#f8f8f8',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      {/* <Stack.Screen 
        name="transaction-details"
        options={{ 
          title: 'Card Details',
          headerStyle: {
            backgroundColor: '#f8f8f8',
          },
          presentation: "fullScreenModal",
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      /> */}
    </Stack>
  );
}