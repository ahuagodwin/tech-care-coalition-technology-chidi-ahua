import { Color, Images } from "@/constant";
import { useAppSelector } from "@/hooks";
import { Redirect, Tabs } from "expo-router";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabIconProps = {
  color: string;
  size: number;
  focused: boolean;
}

export default function AppLayout() {
  const { token } = useAppSelector(state => state.auth);
  const insets = useSafeAreaInsets();
  
  if (!token) {
    return <Redirect href="/login" />;
  }

  // Calculate bottom padding based on safe area insets
  const bottomTabHeight = Platform.OS === "ios" ? 80 : 50;
  const tabBarHeight = bottomTabHeight + insets.bottom;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Color.primary,
        tabBarInactiveTintColor: "#8E8E93",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          fontFamily: "medium",
          marginBottom: Platform.OS === "ios" ? 0 : 10,
        },
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "white",
          borderTopColor: '#fff',
          shadowOffset: { width: 0, height: 2 }, 
          shadowOpacity: 0.1,
          shadowRadius: 3, 
          elevation: 5, 
          height: tabBarHeight,
          paddingTop: 5,
          paddingBottom: insets.bottom,
        },
        tabBarItemStyle: {
          backgroundColor: "white",
          borderColor: "white",
          borderRadius: 0,
          height: bottomTabHeight - 10
        },

        // Add this to properly handle bottom insets
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size, focused }: TabIconProps) => (
            <Image
              source={Images.HomeIcon}
              style={{
                width: size,
                height: size,
                tintColor: focused ? "white" : color,
                backgroundColor: focused ? Color.primary : "white",
                borderWidth: 2,
                borderColor: focused ? "#531500" : "#8E8E93",
                borderRadius: 5,
                padding: 5,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size, focused }:TabIconProps) => (
            <Image
              source={Images.HistoryIcon}
              style={{
                width: size,
                height: size,
                tintColor: focused ? "white" : color,
                backgroundColor: focused ? Color.primary : "white",
                borderWidth: 2,
                borderColor: focused ? "#531500" : "#8E8E93",
                borderRadius: 5,
                padding: 5,
              }}
            />
          ),
        }}
      />

       <Tabs.Screen
        name="card"
        options={{
        title:"",
          tabBarIcon: () => (
            <View style={styles.centerButtonContainer}>
              <View style={[styles.centerButton, { backgroundColor: Color.primary }]}>
               <Text style={[styles.plusIcon, styles.centerButtonInner]}></Text>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: "Rewards",
          tabBarIcon: ({ color, size, focused }: TabIconProps) => (
            <Image
              source={Images.RewardsIcon}
              style={{
                width: size,
                height: size,
                tintColor: focused ? "white" : color,
                backgroundColor: focused ? Color.primary : "white",
                borderWidth: 2,
                borderColor: focused ? "#531500" : "#8E8E93",
                borderRadius: 5,
                padding: 5,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="currencies"
        options={{
          title: "Currencies",
          tabBarIcon: ({ color, size, focused }: TabIconProps) => (
            <Image
              source={Images.CurrenciesIcon}
              style={{
                width: size,
                height: size,
                 tintColor: focused ? "white" : color,
                backgroundColor: focused ? Color.primary : "white",
                borderWidth: 2,
                borderColor: focused ? "#531500" : "#8E8E93",
                borderRadius: 5,
                padding: 5,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  activeIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Color.primary,
    marginTop: 4,
  },
  centerButtonContainer: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height:50,
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
   plusIcon: {
    fontSize: 20,
    fontWeight: "medium",
    color: Color.primary,
  },

   centerButtonInner: {
    flexDirection: "row",
    width: 30,
    height: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    backgroundColor: Color.white,
  },
})