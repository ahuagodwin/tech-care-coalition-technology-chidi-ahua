"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, ScrollView, Share, Alert } from "react-native"
import type { TransactionDetailsProps, DetailRowProps, ActionButtonProps, TransactionStatusProps } from "@/types/type"

const { height, width } = Dimensions.get("window")

// Transaction status component with color-coded indicators
const TransactionStatus = ({ status }: TransactionStatusProps) => {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case "completed":
        return "#2b8a3e"
      case "pending":
        return "#e67700"
      case "failed":
        return "#e03131"
      default:
        return "#2b8a3e"
    }
  }

  return (
    <View style={[styles.statusContainer, { backgroundColor: `${getStatusColor()}20` }]}>
      <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
      <Text style={[styles.statusText, { color: getStatusColor() }]}>{status}</Text>
    </View>
  )
}

// Transaction detail row component
const DetailRow = ({ label, value, isHighlighted = false }: DetailRowProps) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={[styles.detailValue, isHighlighted && styles.highlightedValue]}>{value}</Text>
  </View>
)

// Action button component
const ActionButton = ({ icon, label, onPress, primary = false }: ActionButtonProps) => (
  <TouchableOpacity
    style={[styles.actionButton, primary ? styles.primaryActionButton : styles.secondaryActionButton]}
    onPress={onPress}
  >
    <Text style={styles.actionButtonIcon}>{icon}</Text>
    <Text style={[styles.actionButtonLabel, primary && styles.primaryActionButtonLabel]}>{label}</Text>
  </TouchableOpacity>
)

const TransactionDetails = ({ isVisible, transaction, onClose }: TransactionDetailsProps) => {
  const [showReceipt, setShowReceipt] = useState(false)
  const slideAnim = useRef(new Animated.Value(height)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [isVisible, slideAnim, fadeAnim])

  if (!transaction) return null

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Transaction Details\nType: ${transaction.type}\nAmount: ${transaction.currency} ${transaction.amount}\nDate: ${transaction.date} at ${transaction.time}\nReference: ${transaction.reference}`,
        title: `${transaction.type} Transaction`,
      })
    } catch (error) {
      Alert.alert("Error", "Could not share transaction details")
    }
  }

  const handleDownload = () => {
    Alert.alert("Success", "Transaction receipt downloaded successfully")
  }

  const handleReport = () => {
    Alert.alert("Report Issue", "Do you want to report an issue with this transaction?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Report",
        onPress: () => Alert.alert("Reported", "Your issue has been reported. We'll get back to you soon."),
      },
    ])
  }

  const toggleReceipt = () => {
    setShowReceipt(!showReceipt)
  }

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          opacity: fadeAnim,
          display: isVisible ? "flex" : "none",
        },
      ]}
    >
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Transaction Details</Text>
            <Text style={styles.headerSubtitle}>{transaction.reference}</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.summaryContainer}>
            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>{transaction.currency}</Text>
              <Text style={styles.amount}>{transaction.amount}</Text>
            </View>
            <TransactionStatus status={transaction.status || "Completed"} />
          </View>

          <View style={styles.detailsContainer}>
            <DetailRow label="Transaction Type" value={transaction.type} />
            <DetailRow label="Date" value={transaction.date} />
            <DetailRow label="Time" value={transaction.time} />
            <DetailRow label="Reference ID" value={transaction.reference} isHighlighted={true} />

            {transaction.type === "Transfer" && (
              <>
                <View style={styles.divider} />
                <Text style={styles.sectionTitle}>Recipient Details</Text>
                <DetailRow label="Account Name" value={transaction.recipient?.name || "Williams Godwin"} />
                <DetailRow label="Account Number" value={transaction.recipient?.account || "2345678901"} />
                <DetailRow label="Bank" value={transaction.recipient?.bank || "FirstBank"} />
              </>
            )}

            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Payment Details</Text>
            <DetailRow label="Payment Method" value={transaction.paymentMethod || "Bank Account"} />
            <DetailRow label="Fee" value={`${transaction.currency} ${transaction.fee || "0.00"}`} />
            {transaction.description && <DetailRow label="Description" value={transaction.description} />}
          </View>

          {showReceipt && (
            <View style={styles.receiptContainer}>
              <View style={styles.receiptHeader}>
                <Text style={styles.receiptTitle}>AZAYPAY</Text>
                <Text style={styles.receiptSubtitle}>Transaction Receipt</Text>
              </View>

              <View style={styles.receiptContent}>
                <DetailRow label="Transaction ID" value={transaction.reference} />
                <DetailRow label="Date & Time" value={`${transaction.date} at ${transaction.time}`} />
                <DetailRow label="Amount" value={`${transaction.currency} ${transaction.amount}`} />
                <DetailRow label="Type" value={transaction.type} />
                <DetailRow label="Status" value={transaction.status || "Completed"} />
                <DetailRow label="Fee" value={`${transaction.currency} ${transaction.fee || "0.00"}`} />
              </View>

              <View style={styles.receiptFooter}>
                <Text style={styles.receiptFooterText}>Thank you for using AZAYPAY</Text>
                <Text style={styles.receiptFooterText}>www.azaypay.com</Text>
              </View>
            </View>
          )}

          <View style={styles.actionsContainer}>
            <ActionButton icon="↓" label="Download" onPress={handleDownload} primary={true} />
            <ActionButton icon="↗" label="Share" onPress={handleShare} />
            <ActionButton icon="⚠" label="Report Issue" onPress={handleReport} />
            <ActionButton
              icon={showReceipt ? "↑" : "↓"}
              label={showReceipt ? "Hide Receipt" : "View Receipt"}
              onPress={toggleReceipt}
            />
          </View>
        </ScrollView>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    zIndex: 1000,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.85,
    paddingBottom: 30, // For safe area
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#666",
  },
  content: {
    flex: 1,
  },
  summaryContainer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 8,
    marginRight: 4,
  },
  amount: {
    fontSize: 36,
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 10,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: "#fff",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  highlightedValue: {
    color: "#f03e3e",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
  },
  actionButton: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  primaryActionButton: {
    backgroundColor: "#f03e3e",
  },
  secondaryActionButton: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#dee2e6",
  },
  actionButtonIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  actionButtonLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  primaryActionButtonLabel: {
    color: "white",
  },
  receiptContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderStyle: "dashed",
  },
  receiptHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  receiptTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  receiptSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  receiptContent: {
    marginBottom: 20,
  },
  receiptFooter: {
    alignItems: "center",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#dee2e6",
    borderStyle: "dashed",
  },
  receiptFooterText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
})

export default TransactionDetails
