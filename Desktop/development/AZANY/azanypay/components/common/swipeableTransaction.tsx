"use client"

import { useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated, PanResponder, Alert } from "react-native"
import type { SwipeableTransactionProps, Transaction } from "@/types/type"
import { usePressAnimation } from "@/hooks/useAnimation"

const SWIPE_THRESHOLD = 120

const SwipeableTransaction = ({
  type,
  date,
  time,
  amount,
  currency,
  index,
  onViewDetails,
}: SwipeableTransactionProps) => {
  const pressAnim = usePressAnimation()
  const pan: any = useRef(new Animated.ValueXY()).current
  const opacity = useRef(new Animated.Value(1)).current

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 5
      },
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: 0,
        })
        pan.setValue({ x: 0, y: 0 })
      },
      onPanResponderMove: (_, gestureState) => {
        // Only allow horizontal swiping
        if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
          // Limit the swipe to left direction only
          if (gestureState.dx < 0) {
            pan.x.setValue(gestureState.dx)
          }
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        pan.flattenOffset()

        if (gestureState.dx < -SWIPE_THRESHOLD) {
          Animated.spring(pan.x, {
            toValue: -200,
            useNativeDriver: false,
            friction: 5,
          }).start()
        } else {
          Animated.spring(pan.x, {
            toValue: 0,
            useNativeDriver: false,
            friction: 5,
          }).start()
        }
      },
    }),
  ).current

  const handleDelete = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      Alert.alert("Transaction Deleted", `${type} transaction has been deleted.`)
    })
  }

  const handleShare = () => {
    Alert.alert("Share Transaction", `Sharing ${type} transaction details.`)
    resetPosition()
  }

  const resetPosition = () => {
    Animated.spring(pan.x, {
      toValue: 0,
      useNativeDriver: false,
      friction: 5,
    }).start()
  }

  const getTransformStyle = () => {
    return {
      transform: [{ translateX: pan.x }],
      opacity: opacity,
    }
  }

  const handleViewDetails = () => {
    resetPosition()
    const transaction: Transaction = {
      id: `tx${index}`,
      type: type as "Transfer" | "Deposit" | "Withdrawal",
      date,
      time,
      amount,
      currency,
      reference: `TRX${Math.floor(Math.random() * 1000000)}`,
      status: "Completed",
      fee: "0.50",
      paymentMethod: "Bank Account",
      description:
        type === "Transfer" ? "Payment for services" : type === "Deposit" ? "Salary payment" : "Cash withdrawal",
    }

    if (type === "Transfer") {
      transaction.recipient = {
        name: "Williams Godwin",
        account: "2345678901",
        bank: "FirstBank",
      }
    }

    onViewDetails(transaction)
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.actionsContainer, { opacity }]}>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.transactionItem, getTransformStyle()]} {...panResponder.panHandlers}>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionType}>{type}</Text>
          <Text style={styles.transactionDate}>
            {date} • {time}
          </Text>
        </View>
        <View style={styles.transactionAmount}>
          <Text style={styles.amountText}>
            {currency} {amount}
          </Text>
          <Animated.View style={pressAnim}>
            <TouchableOpacity
              onPressIn={pressAnim.onPressIn}
              onPressOut={pressAnim.onPressOut}
              onPress={handleViewDetails}
            >
              <Text style={styles.viewButton}>View</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    backgroundColor: "white",
    zIndex: 1,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: "#666",
  },
  transactionAmount: {
    flexDirection: "row",
    alignItems: "center",
  },
  amountText: {
    fontSize: 14,
    marginRight: 8,
  },
  viewButton: {
    color: "red",
    fontSize: 12,
  },
  actionsContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 200,
    zIndex: 0,
  },
  shareButton: {
    backgroundColor: "#4dabf7",
    height: "100%",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#fa5252",
    height: "100%",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonText: {
    color: "white",
    fontWeight: "500",
  },
})

export default SwipeableTransaction
