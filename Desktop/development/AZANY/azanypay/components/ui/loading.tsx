import { StyleSheet, Animated, Modal, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { Circle } from 'react-native-animated-spinkit';

// Create a reusable loading modal component
const LoadingModal = ({ visible = false, color = "#FF0000" }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (visible) {
      // Fade in animation when modal becomes visible
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      // Reset opacity when modal is hidden
      fadeAnim.setValue(0);
    }
  }, [visible]);
  
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={visible}
      onRequestClose={() => {}}
      statusBarTranslucent={true}
    >
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.modalContent}>
          <Circle
            size={50}
            color={color}
          />
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9999, 
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default LoadingModal;