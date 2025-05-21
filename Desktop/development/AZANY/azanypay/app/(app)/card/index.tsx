"use client"

import React, { useState, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  Animated,
  StatusBar,
  Platform,
} from "react-native"
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Color } from "@/constant"

const { width } = Dimensions.get("window")
const CARD_WIDTH = width * 0.75
const CARD_MARGIN = 10

interface CardData {
  id: string
  type: string
  lastFour: string
  balance: string
  dueDate: string
  color: string
  isOverdue?: boolean
}

const cards: CardData[] = [
  {
    id: "1",
    type: "VISA",
    lastFour: "3854",
    balance: "£3,499.50",
    dueDate: "10th Oct",
    color: "#B4F24E", // Bright green
  },
  {
    id: "2",
    type: "VISA",
    lastFour: "1234",
    balance: "£1,250.75",
    dueDate: "15th Oct",
    color: "#4ECDF2", // Light blue
  },
  {
    id: "3",
    type: "MASTERCARD",
    lastFour: "5678",
    balance: "£750.25",
    dueDate: "5th Oct",
    color: "#F24E9E", // Pink
    isOverdue: true,
  },
]

interface OperationData {
  id: string
  name: string
  icon: React.ReactNode
}

const operations: OperationData[] = [
  {
    id: "all",
    name: "All",
    icon: <Ionicons name="home-outline" size={24} color="#B4F24E" />,
  },
  {
    id: "health",
    name: "Health",
    icon: <Ionicons name="heart-outline" size={24} color="#B4F24E" />,
  },
  {
    id: "travel",
    name: "Travel",
    icon: <FontAwesome5 name="plane" size={20} color="#B4F24E" />,
  },
  {
    id: "food",
    name: "Food",
    icon: <MaterialIcons name="restaurant" size={24} color="#B4F24E" />,
  },
  {
    id: "shopping",
    name: "Shopping",
    icon: <Ionicons name="cart-outline" size={24} color="#B4F24E" />,
  },
]

const Card = ({ card, index }: { card: CardData; index: number }) => {
  const router = useRouter()
  const scaleAnim = useRef(new Animated.Value(0.9)).current
  const opacityAnim = useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])


   const handleViewDetails = () => {
   
    router.push({
      pathname: "/card/card-details",
      params: {
        id: card.id,
        type: card.type,
        lastFour: card.lastFour,
        balance: card.balance,
        dueDate: card.dueDate,
        color: card.color,
        isOverdue: card.isOverdue ? "true" : "false",
      },
    })
  }

  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: card.color,
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardType}>{card.type}</Text>
        <Text style={styles.cardNumber}>• • • • {card.lastFour}</Text>
      </View>

      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.cardDueLabel}>Due Date {card.dueDate}</Text>
          <Text style={styles.cardBalance}>{card.balance}</Text>
        </View>
        <View style={styles.cardStatusContainer}>
          {card.isOverdue ? (
            <Text style={styles.cardOverdue}>OVERDUE</Text>
          ) : (
            <Text style={styles.cardEarly}>EARLY</Text>
          )}
           <View style={styles.cardButtonsContainer}>
            <TouchableOpacity style={styles.payButton}>
              <Text style={styles.payButtonText}>PAY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailsButton} onPress={handleViewDetails}>
              <Text style={styles.detailsButtonText}>DETAILS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  )
}

const AddCard = () => {
  return (
    <TouchableOpacity style={styles.addCardButton}>
      <Ionicons name="add" size={32} color="#B4F24E" />
    </TouchableOpacity>
  )
}

const OperationItem = ({ operation }: { operation: OperationData }) => {
  return (
    <TouchableOpacity style={styles.operationItem}>
      <View style={styles.operationIconContainer}>{operation.icon}</View>
      <Text style={styles.operationName}>{operation.name}</Text>
    </TouchableOpacity>
  )
}

const CardsScreen = () => {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [activeCardIndex, setActiveCardIndex] = useState(0)

  const handleCardChange = (index: number) => {
    setActiveCardIndex(index)
    // You can add additional logic here that uses the activeCardIndex
    console.log(`Active card changed to index: ${index}`)
  }

  // Calculate bottom padding to account for tab bar
  const bottomTabHeight = Platform.OS === "ios" ? 80 : 60
  const bottomPadding = bottomTabHeight + insets.bottom + 20 // Extra 20 for spacing

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={Color.black} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cards</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Wrap content in ScrollView */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: bottomPadding }}>
        {/* Cards Section */}
        <View style={styles.cardsContainer}>
          <FlatList
            data={[{ id: "add" } as const, ...cards]}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsList}
            snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
            decelerationRate="fast"
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / (CARD_WIDTH + CARD_MARGIN * 2))
              handleCardChange(index > 0 ? index - 1 : 0)
            }}
            renderItem={({ item, index }) => {
              if ("type" in item) {
                return <Card card={item} index={index - 1} />
              }
              return <AddCard />
            }}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.transferButton}>
            <Text style={styles.transferButtonText}>Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.requestButton}>
            <Text style={styles.requestButtonText}>Request</Text>
          </TouchableOpacity>
        </View>

        {/* Popular Operations */}
        <View style={styles.operationsSection}>
          <Text style={styles.sectionTitle}>Popular operations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.operationsScroll}>
            {operations.map((operation) => (
              <OperationItem key={operation.id} operation={operation} />
            ))}
          </ScrollView>
        </View>

        {/* Pagination Indicator */}
        <View style={styles.paginationContainer}>
          {cards.map((_, index) => (
            <View
              key={index}
              style={[styles.paginationDot, index === activeCardIndex ? styles.paginationDotActive : {}]}
            />
          ))}
        </View>

        {/* Order Physical Card */}
        <View style={styles.orderCardSection}>
          <Text style={styles.orderCardTitle}>Order your first physical card</Text>
          <Text style={styles.orderCardDescription}>
            Get instant spending analytics, built-in budgeting, and fee-free spending aboard.
          </Text>
          <TouchableOpacity style={styles.orderCardButton}>
            <Text style={styles.orderCardButtonText}>Order physical card</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  menuButton: {
    padding: 8,
  },
  cardsContainer: {
    marginTop: 10,
  },
  cardsList: {
    paddingHorizontal: 10,
  },
  card: {
    width: CARD_WIDTH,
    height: 160,
    borderRadius: 16,
    marginHorizontal: CARD_MARGIN,
    padding: 16,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  cardNumber: {
    fontSize: 14,
    color: "#000",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cardDueLabel: {
    fontSize: 12,
    color: "#000",
    marginBottom: 4,
  },
  cardBalance: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  cardStatusContainer: {
    alignItems: "flex-end",
  },
  cardEarly: {
    fontSize: 10,
    color: "#000",
    marginBottom: 4,
  },
  cardOverdue: {
    fontSize: 10,
    color: "#FF3B30",
    fontWeight: "bold",
    marginBottom: 4,
  },
  payButton: {
    backgroundColor: "#000",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  payButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  addCardButton: {
    width: 80,
    height: 160,
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    marginHorizontal: CARD_MARGIN,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 24,
  },
  transferButton: {
    flex: 1,
    backgroundColor: "#B4E0F2",
    paddingVertical: 16,
    borderRadius: 16,
    marginRight: 8,
    alignItems: "center",
  },
  transferButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  requestButton: {
    flex: 1,
    backgroundColor: "transparent",
    paddingVertical: 16,
    borderRadius: 16,
    marginLeft: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  requestButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  operationsSection: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  operationsScroll: {
    paddingLeft: 16,
  },
  operationItem: {
    alignItems: "center",
    marginRight: 24,
  },
  operationIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  operationName: {
    color: "white",
    fontSize: 14,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#333",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#B4F24E",
    width: 16,
  },
  orderCardSection: {
    marginTop: 32,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  orderCardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#B4F24E",
    textAlign: "center",
    marginBottom: 16,
  },
  orderCardDescription: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  orderCardButton: {
    backgroundColor: "#B4F24E",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: "center",
    width: "100%",
    maxWidth: 300,
  },
  orderCardButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },

  // Add these to your existing styles object
cardButtonsContainer: {
  flexDirection: 'column',
  gap: 8,
},
detailsButton: {
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  paddingVertical: 6,
  paddingHorizontal: 16,
  borderRadius: 16,
},
detailsButtonText: {
  color: "white",
  fontSize: 12,
  fontWeight: "600",
},
})

export default CardsScreen
