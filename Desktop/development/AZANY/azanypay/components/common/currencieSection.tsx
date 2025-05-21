import { View, Text, StyleSheet, Animated, TouchableOpacity } from "react-native"
import { useFadeIn, usePressAnimation,  useSlideIn } from "@/hooks/useAnimation"

const CurrencyCard = ({ flag, currency, amount, percentage, isNegative, index }: { flag: any, currency: any, amount: any, percentage: any, isNegative: any, index: any}) => {
  const fadeAnim = useFadeIn(500, 400 + index * 100)
  const slideAnim = useSlideIn("up", 20, 500, 400 + index * 100)
  const pressAnim = usePressAnimation()

  return (
    <Animated.View
      style={[styles.currencyCard, currency === "USD" ? styles.usdCard : null, { opacity: fadeAnim }, slideAnim]}
    >
      <TouchableOpacity
        style={[{ flex: 1 }, pressAnim]}
        onPressIn={pressAnim.onPressIn}
        onPressOut={pressAnim.onPressOut}
      >
        <View style={styles.currencyHeader}>
          <View style={styles.flagContainer}>
            <Text>{flag}</Text>
          </View>
          <Text style={styles.currencyName}>{currency}</Text>
        </View>
        <Text style={styles.currencyAmount}>{amount}</Text>
        <Text style={[styles.percentageText, isNegative ? styles.negativePercentage : styles.positivePercentage]}>
          {isNegative ? "-" : "+"}
          {percentage}%
        </Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const CurrenciesSection = () => {
  const fadeAnim = useFadeIn(500, 300)
  const slideAnim = useSlideIn("up", 15, 500, 300)

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }, slideAnim]}>
      <Text style={styles.sectionTitle}>Currencies</Text>
      <View style={styles.currenciesGrid}>
        <View style={styles.row}>
          <CurrencyCard
            flag="🇬🇧"
            currency="British Pound"
            amount="£ 20,000.00"
            percentage="0.8"
            isNegative={true}
            index={0}
          />
          <CurrencyCard
            flag="🇺🇸"
            currency="US Dollar"
            amount="$ 20,000.00"
            percentage="0.8"
            isNegative={true}
            index={1}
          />
        </View>
        <View style={styles.row}>
          <CurrencyCard flag="🇪🇺" currency="Euro" amount="€ 20,000.00" percentage="0.8" isNegative={true} index={2} />
          <CurrencyCard
            flag="🇰🇪"
            currency="Kenya Shilling"
            amount="KES 2000.00"
            percentage="0.8"
            isNegative={true}
            index={3}
          />
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
  },
  currenciesGrid: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  currencyCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    width: "48%",
  },
  usdCard: {
    backgroundColor: "#e6f7e9",
  },
  currencyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  flagContainer: {
    marginRight: 6,
  },
  currencyName: {
    fontSize: 12,
    color: "#666",
  },
  currencyAmount: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  percentageText: {
    fontSize: 12,
  },
  positivePercentage: {
    color: "green",
  },
  negativePercentage: {
    color: "red",
  },
})

export default CurrenciesSection
