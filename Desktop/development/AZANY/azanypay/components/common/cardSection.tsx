import { useFadeIn, usePressAnimation, useScale } from "@/hooks/useAnimation"
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"


const CardSection = () => {
  const fadeAnim = useFadeIn(800, 300)
  const scaleAnim = useScale(0.95, 800, 300)
  const requestCardAnim = usePressAnimation()

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }, scaleAnim]}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>AZAYPAY</Text>
          <Text style={styles.cardTitle}>My Card</Text>
        </View>
        <View style={styles.currencyContainer}>
          <View style={styles.flagContainer}>
            <Text>🇳🇬</Text>
          </View>
          <Text style={styles.currencyText}>Nigeria Naira</Text>
        </View>
      </View>

      <Text style={styles.balance}>NGN 20,000.00</Text>

      <View style={styles.checkIcon}>
        <Text style={styles.checkText}>✓</Text>
      </View>

      <View style={styles.cardDetails}>
        <View>
          <Text style={styles.cardHolderName}>Williams Godwin O.</Text>
          <View style={styles.accountInfoRow}>
            <Text style={styles.accountLabel}>ACC/NO: </Text>
            <Text style={styles.accountNumber}>3340077807</Text>
          </View>
          <Text style={styles.expiryDate}>EXP: 04/24</Text>
        </View>
        <View style={styles.bankLogo}>
          <Text style={styles.bankLogoText}>FirstBank</Text>
          <Text style={styles.bankLogoStar}>★</Text>
        </View>
      </View>

      <View style={styles.visaAccountRow}>
        <Text style={styles.visaText}>Visa Account</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Need to spend physically?</Text>
        <Animated.View style={requestCardAnim}>
          <TouchableOpacity onPressIn={requestCardAnim.onPressIn} onPressOut={requestCardAnim.onPressOut}>
            <Text style={styles.requestCardText}>Request Physical Card</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffcdd2",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginTop: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  currencyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  flagContainer: {
    marginRight: 4,
  },
  currencyText: {
    fontSize: 12,
  },
  balance: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  checkIcon: {
    position: "absolute",
    right: 16,
    top: 60,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  checkText: {
    color: "green",
    fontWeight: "bold",
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  cardHolderName: {
    fontSize: 14,
    fontWeight: "500",
  },
  accountInfoRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  accountLabel: {
    fontSize: 12,
    color: "#666",
  },
  accountNumber: {
    fontSize: 12,
  },
  expiryDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  bankLogo: {
    flexDirection: "row",
    alignItems: "center",
  },
  bankLogoText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  bankLogoStar: {
    color: "gold",
    fontSize: 16,
    marginLeft: 2,
  },
  visaAccountRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  visaText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  footer: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#666",
  },
  requestCardText: {
    fontSize: 12,
    color: "#f03e3e",
    fontWeight: "500",
    marginLeft: 4,
    textDecorationLine: "underline",
  },
})

export default CardSection
