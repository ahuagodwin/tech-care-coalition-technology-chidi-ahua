import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Platform, ViewStyle, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Color, Images } from '@/constant';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  scrollable?: boolean;
  headerRight?: ReactNode;
  contentContainerStyle?: ViewStyle;
  avatar?: string
}

/**
 * DashboardLayout - A reusable layout component for dashboard screens
 * Works with the existing Tabs navigation structure from expo-router
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  showBackButton = false,
  scrollable = true,
  headerRight,
  contentContainerStyle = {},
  avatar
}) => {
  const navigation = useNavigation();
  // const insets = useSafeAreaInsets();

  const handleBackPress = (): void => {
    navigation.goBack();
  };

  const renderContent = (): ReactNode => {
    if (scrollable) {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            contentContainerStyle,
            // Add bottom padding to account for tab bar (55px) plus extra space
            { paddingBottom: 70 }
          ]}
        >
          {children}
        </ScrollView>
      );
    }
    
    return (
      <View 
        style={[
          styles.contentContainer, 
          contentContainerStyle,
          // Add bottom padding to account for tab bar (55px) plus extra space
          { paddingBottom: 70 }
        ]}
      >
        {children}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {showBackButton ? (
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ) : null}

          {avatar ? <Image src={avatar} className="w-28 h-28 rounded-full" resizeMode="contain" /> : null }
         
          {title && <Text style={styles.headerTitle}>{title}</Text>}
        </View>
        
        {headerRight && (
          <View style={styles.headerRight}>
            {headerRight}
          </View>
        )}
      </View>
      
      {/* Main Content */}
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: Color.white
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2
  },
  backButton: {
    marginRight: 8,
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'medium', // Matching your app's font family
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    padding: 16,
  }
});

export default DashboardLayout;