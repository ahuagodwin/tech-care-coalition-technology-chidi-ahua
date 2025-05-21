"use client"

import { useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated, PanResponder, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const SWIPE_THRESHOLD = 120

interface SwipeableTransactionProps {
  id: string
  title: string
  date: string
  amount: string
  type: string
  onViewDetail?: () => void
  onDelete?: (id: string) => void
}

const Swipeable = ({ id, title, date, amount, type, onViewDetail, onDelete }: SwipeableTransactionProps) => {
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
    if (onDelete) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        onDelete(id)
      })
    } else {
      resetPosition()
      Alert.alert("Delete Transaction", `Are you sure you want to delete this transaction?`, [
        { text: "Cancel", onPress: resetPosition },
        {
          text: "Delete",
          onPress: () => {
            Alert.alert("Transaction Deleted", `Transaction has been deleted.`)
            resetPosition()
          },
          style: "destructive",
        },
      ])
    }
  }

  const handleView = () => {
    resetPosition()
    if (onViewDetail) {
      onViewDetail()
    }
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

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.actionsContainer, { opacity }]}>
        <TouchableOpacity style={styles.viewButton} onPress={handleView}>
          <Ionicons name="eye-outline" size={20} color="white" />
          <Text style={styles.actionButtonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={20} color="white" />
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.transactionItem, getTransformStyle()]} {...panResponder.panHandlers}>
        <View style={[styles.transactionIcon, { backgroundColor: type === "received" ? "#E6F0FF" : "#FFE6E6" }]}>
          <Ionicons
            name={type === "received" ? "arrow-down" : "arrow-up"}
            color={type === "received" ? "#C99213" : "#FF3333"}
            size={20}
          />
        </View>

        <View style={styles.transactionInfo}>
          <Text style={styles.transactionTitle}>{title}</Text>
          <Text style={styles.transactionDate}>{date}</Text>
        </View>

        <Text style={[styles.transactionAmount, { color: type === "received" ? "#C99213" : "#FF3333" }]}>
          {type === "received" ? "+" : "-"}${amount}
        </Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 0,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    zIndex: 1,
  },
  transactionIcon: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 14,
    fontFamily: "medium",
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: "#8E8E93",
    fontFamily: "regular",
  },
  transactionAmount: {
    fontSize: 14,
    fontFamily: "semibold",
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
  viewButton: {
    backgroundColor: "#4dabf7",
    height: "100%",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  deleteButton: {
    backgroundColor: "#FF3333",
    height: "100%",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  actionButtonText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 6,
    fontFamily: "medium",
  },
})

export default Swipeable
