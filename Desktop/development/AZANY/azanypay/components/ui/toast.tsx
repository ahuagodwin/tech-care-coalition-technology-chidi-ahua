import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Animated, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  ViewStyle,
  TextStyle
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Toast types
export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top' | 'bottom';

// Props for Toast component
interface ToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
  onClose?: () => void;
}

// Interface for a toast item
interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  position: ToastPosition;
  visible: boolean;
}

// Icons for different toast types
const Icons: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠️',
  info: 'ℹ️',
};

// Toast component
const Toast: React.FC<ToastProps> = ({ 
  visible, 
  message, 
  type = 'info', 
  duration = 3000, 
  position = 'top',
  onClose 
}) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Show toast animation
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Hide toast after duration
      const hideTimer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(hideTimer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: position === 'top' ? -100 : 100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onClose) onClose();
    });
  };

  const getBackgroundColor = (): string => {
    switch (type) {
      case 'success':
        return '#4CAF50';
      case 'error':
        return '#F44336';
      case 'warning':
        return '#FF9800';
      case 'info':
      default:
        return '#2196F3';
    }
  };

  const getPositionStyle = (): ViewStyle => {
    return {
      position: 'absolute',
      left: 16,
      right: 16,
      [position]: 16,
      transform: [{ translateY: translateY }],
      opacity: opacity,
    };
  };

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, getPositionStyle(), { backgroundColor: getBackgroundColor() }]}>
      <View style={styles.content}>
        <Text style={styles.icon}>{Icons[type]}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      <TouchableOpacity onPress={hideToast} style={styles.closeButton}>
        <Text style={styles.closeText}>x</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Toast Container - manages multiple toasts
export const ToastContainer: React.FC & {
  showSuccess?: (message: string, duration?: number, position?: ToastPosition) => string;
  showError?: (message: string, duration?: number, position?: ToastPosition) => string;
  showWarning?: (message: string, duration?: number, position?: ToastPosition) => string;
  showInfo?: (message: string, duration?: number, position?: ToastPosition) => string;
} = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (message: string, type: ToastType = 'info', duration = 3000, position: ToastPosition = 'top'): string => {
    const id = Date.now().toString();
    const newToast = { id, message, type, duration, position, visible: true };
    setToasts(prevToasts => [...prevToasts, newToast]);
    
    return id;
  };

  const removeToast = (id: string): void => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  // Exportable methods
  const showSuccess = (message: string, duration?: number, position?: ToastPosition): string => 
    addToast(message, 'success', duration, position);
  
  const showError = (message: string, duration?: number, position?: ToastPosition): string => 
    addToast(message, 'error', duration, position);
  
  const showWarning = (message: string, duration?: number, position?: ToastPosition): string => 
    addToast(message, 'warning', duration, position);
  
  const showInfo = (message: string, duration?: number, position?: ToastPosition): string => 
    addToast(message, 'info', duration, position);

  // Create a ref to store the toast methods
  ToastContainer.showSuccess = showSuccess;
  ToastContainer.showError = showError;
  ToastContainer.showWarning = showWarning;
  ToastContainer.showInfo = showInfo;

  return (
    <>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          visible={toast.visible}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          position={toast.position}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    maxWidth: Dimensions.get('window').width - 32,
  } as ViewStyle,
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  } as ViewStyle,
  icon: {
    fontSize: 18,
    marginRight: 8,
    color: 'white',
  } as TextStyle,
  message: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  } as TextStyle,
  closeButton: {
    marginLeft: 8,
  } as ViewStyle,
  closeText: {
    color: 'white',
    fontSize: 20,
  } as TextStyle,
});
