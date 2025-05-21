import { useFadeIn, usePressAnimation, useSlideIn } from "@/hooks/useAnimation"
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from "react-native"


const Header = () => {
  const fadeAnim = useFadeIn(500, 100)
  const slideAnim = useSlideIn("down", 15, 500, 100)
  const depositAnim = usePressAnimation()
  const transferAnim = usePressAnimation()
  const profileAnim = usePressAnimation()

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }, slideAnim]}>
      <Animated.View style={depositAnim}>
        <TouchableOpacity
          style={styles.depositButton}
          onPressIn={depositAnim.onPressIn}
          onPressOut={depositAnim.onPressOut}
        >
          <Text style={styles.depositButtonText}>Deposit Money</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={transferAnim}>
        <TouchableOpacity
          style={styles.transferButton}
          onPressIn={transferAnim.onPressIn}
          onPressOut={transferAnim.onPressOut}
        >
          <Text style={styles.transferButtonText}>Transfer Money</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={profileAnim}>
        <TouchableOpacity
          style={styles.profileButton}
          onPressIn={profileAnim.onPressIn}
          onPressOut={profileAnim.onPressOut}
        >
          <Image source={{ uri: "https://via.placeholder.com/40" }} style={styles.profileImage} />
          <View style={styles.dropdownIcon} />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  depositButton: {
    backgroundColor: "#f03e3e",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
  },
  depositButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,
  },
  transferButton: {
    backgroundColor: "#f03e3e",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    flex: 1,
  },
  transferButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,
    textAlign: "center",
  },
  profileButton: {
    marginLeft: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  dropdownIcon: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#333",
    marginLeft: 4,
  },
})

export default Header
