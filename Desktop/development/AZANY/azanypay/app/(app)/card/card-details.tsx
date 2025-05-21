import React, { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  Switch,
  Alert,
  Modal,
  TextInput,
  Platform,
} from "react-native"
import { Ionicons, Feather } from "@expo/vector-icons"
import { useRouter, useLocalSearchParams } from "expo-router"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Color } from "@/constant"
import { TransactionList } from "@/components/ui"
import { transactions } from "@/data/transaction.data"


const CardDetailsScreen = () => {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const params = useLocalSearchParams()
  const [hideInfo, setHideInfo] = useState(false)
  const [activeTab, setActiveTab] = useState("transactions")
  const [isCardFrozen, setIsCardFrozen] = useState(false)
  const [showMoreSettings, setShowMoreSettings] = useState(false)
  const [showPinManagement, setShowPinManagement] = useState(false)
  const [currentPin, setCurrentPin] = useState("")
  const [newPin, setNewPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")
  const [pinViewMode, setPinViewMode] = useState<"view" | "change">("view")
  const [pinError, setPinError] = useState("")

  // Get card details from params
  const cardType = params.type as string
  const cardNumber = params.lastFour ? `3456 1234 8765 ${params.lastFour}` : "3456 1234 8765 0982"
  const cardColor = params.color as string || "#2A3552"
  const cardBalance = params.balance as string || "$325,230.00"
  const cardHolder = "Edward J.C"
  const fullName = "Edward J. Clarke"
  const expiryDate = "03/09"
  const cvv = "761"
  const mockPin = "1234" 

  // Handle card freeze/unfreeze
  const toggleCardFreeze = () => {
    Alert.alert(
      isCardFrozen ? "Unfreeze" : "Freeze Card",
      isCardFrozen 
        ? "Are you sure you want to unfreeze this card? This will allow transactions to be processed again."
        : "Are you sure you want to freeze this card? This will prevent any new transactions.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            setIsCardFrozen(!isCardFrozen)
            Alert.alert(
              "Success",
              isCardFrozen 
                ? "Your card has been unfrozen and is now active."
                : "Your card has been frozen. No new transactions will be processed."
            )
          },
        },
      ]
    )
  }

  // Handle PIN verification
  const verifyPin = () => {
    if (currentPin === mockPin) {
      if (pinViewMode === "view") {
        // Show PIN success message
        Alert.alert("PIN Verified", `Your PIN is ${mockPin}`)
      } else {
        // Move to new PIN entry
        setPinError("")
        setCurrentPin("")
        setPinViewMode("change")
      }
    } else {
      setPinError("Incorrect PIN. Please try again.")
    }
  }

  // Handle PIN change
  const changePin = () => {
    if (newPin.length !== 4 || !/^\d+$/.test(newPin)) {
      setPinError("PIN must be 4 digits")
      return
    }

    if (newPin !== confirmPin) {
      setPinError("PINs do not match")
      return
    }

    // In a real app, you would call an API to update the PIN
    Alert.alert(
      "PIN Changed",
      "Your PIN has been successfully updated.",
      [
        {
          text: "OK",
          onPress: () => {
            setShowPinManagement(false)
            setCurrentPin("")
            setNewPin("")
            setConfirmPin("")
            setPinViewMode("view")
            setPinError("")
          },
        },
      ]
    )
  }
  

   // Calculate bottom padding to account for tab bar
    const bottomTabHeight = Platform.OS === "ios" ? 80 : 60
    const bottomPadding = bottomTabHeight + insets.bottom + 20 // Extra 10 for spacing

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
       <StatusBar barStyle="light-content" backgroundColor={Color.black} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CARD DETAILS</Text>
        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="information-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} contentContainerStyle={{ paddingBottom: bottomPadding }} >
        <View style={styles.contentContainer}>
          {/* Actions and Card Section */}
          <View style={styles.cardSection}>
            {/* Quick Actions */}
            <View style={styles.actionsColumn}>
              <TouchableOpacity style={styles.actionButton} onPress={toggleCardFreeze}>
                <View style={[
                  styles.actionIconContainer, 
                  isCardFrozen && styles.actionIconContainerActive
                ]}>
                  <Ionicons 
                    name={isCardFrozen ? "lock-closed" : "lock-closed-outline"} 
                    size={24} 
                    color={isCardFrozen ? "white" : "black"} 
                  />
                </View>
                <Text style={styles.actionText}>
                  {isCardFrozen ? "Unfreeze" : "Freeze"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIconContainer}>
                  <Ionicons name="create-outline" size={24} color="black" />
                </View>
                <Text style={styles.actionText}>Edit Details</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => setShowMoreSettings(true)}
              >
                <View style={styles.actionIconContainer}>
                  <Ionicons name="ellipsis-horizontal" size={24} color="black" />
                </View>
                <Text style={styles.actionText}>More</Text>
              </TouchableOpacity>
            </View>


            {/* Card Display */}
            <View style={[
              styles.cardDisplay, 
              { backgroundColor: "#2A3552" },
              isCardFrozen && styles.frozenCard
            ]}>
              {isCardFrozen && (
                <View style={styles.frozenOverlay}>
                  <Ionicons name="snow-outline" size={40} color="white" />
                  <Text style={styles.frozenText}>CARD FROZEN</Text>
                </View>
              )}
              <View style={styles.cardChip}>
                <Image
                  source={{ uri: "https://i.imgur.com/QuJq1Zx.png" }}
                  style={{ width: 30, height: 24 }}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.cardWave}>
                <Ionicons name="wifi-outline" size={20} color="white" />
              </View>
              <Text style={styles.cardBrand}>VISA</Text>
              
              <View style={styles.cardNumberContainer}>
                {!hideInfo ? (
                  <Text style={styles.cardNumberText}>
                    {cardNumber.split(" ").map((group, index) => (
                      <Text key={index} style={styles.cardNumberGroup}>{group}{"\n"}</Text>
                    ))}
                  </Text>
                ) : (
                  <Text style={styles.cardNumberText}>
                    {"•••• •••• •••• " + cardNumber.slice(-4)}
                  </Text>
                )}
              </View>

              <View style={styles.cardBalanceContainer}>
                <Text style={styles.cardBalance}>
                  {hideInfo ? "••••••" : cardBalance}
                </Text>
                <Text style={styles.cardHolderName}>{cardHolder}</Text>
              </View>
            </View>
          </View>


          {/* Card Information */}
          <View style={styles.infoSection}>
            <View style={styles.infoHeader}>
              <Text style={styles.infoTitle}>CARD INFORMATION</Text>
              <TouchableOpacity 
                style={styles.hideInfoButton}
                onPress={() => setHideInfo(!hideInfo)}
              >
                <Ionicons name={hideInfo ? "eye-off-outline" : "eye-outline"} size={18} color="black" />
                <Text style={styles.hideInfoText}>{hideInfo ? "Show info" : "Hide info"}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoLabel}>
                <Ionicons name="card-outline" size={20} color="#666" />
                <Text style={styles.infoLabelText}>Card name</Text>
              </View>
              <Text style={styles.infoValue}>{hideInfo ? "••••••••••" : fullName}</Text>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoLabel}>
                <Ionicons name="card-outline" size={20} color="#666" />
                <Text style={styles.infoLabelText}>Card Number</Text>
              </View>
              <Text style={styles.infoValue}>{hideInfo ? "•••• •••• •••• ••••" : cardNumber}</Text>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoLabel}>
                <Ionicons name="calendar-outline" size={20} color="#666" />
                <Text style={styles.infoLabelText}>Expiry date</Text>
              </View>
              <Text style={styles.infoValue}>{hideInfo ? "••/••" : expiryDate}</Text>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoLabel}>
                <Ionicons name="lock-closed-outline" size={20} color="#666" />
                <Text style={styles.infoLabelText}>CVV (Security Code)</Text>
              </View>
              <Text style={styles.infoValue}>{hideInfo ? "•••" : cvv}</Text>
            </View>

            <TouchableOpacity 
              style={styles.pinManagementButton}
              onPress={() => {
                setShowPinManagement(true)
                setPinViewMode("view")
                setCurrentPin("")
                setNewPin("")
                setConfirmPin("")
                setPinError("")
              }}
            >
              <Ionicons name="keypad-outline" size={20} color={Color.primary} />
              <Text style={styles.pinManagementText}>Manage PIN</Text>
            </TouchableOpacity>
          </View>

          {/* Card Status */}
          <View style={styles.statusSection}>
            <Text style={styles.statusTitle}>CARD STATUS</Text>
            <View style={styles.statusItem}>
              <View style={styles.statusLabel}>
                <Ionicons 
                  name={isCardFrozen ? "snow" : "checkmark-circle"} 
                  size={20} 
                  color={isCardFrozen ? "#4ECDF2" : Color.primary} 
                />
                <Text style={styles.statusLabelText}>
                  {isCardFrozen ? "Card is frozen" : "Card is active"}
                </Text>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: Color.primary }}
                thumbColor={isCardFrozen ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleCardFreeze}
                value={!isCardFrozen}
              />
            </View>
          </View>

          {/* Tabs for Transactions and Statements */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === "transactions" && styles.activeTab]}
              onPress={() => setActiveTab("transactions")}
            >
              <Text style={[styles.tabText, activeTab === "transactions" && styles.activeTabText]}>
                Recent Transactions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === "statements" && styles.activeTab]}
              onPress={() => setActiveTab("statements")}
            >
              <Text style={[styles.tabText, activeTab === "statements" && styles.activeTabText]}>
                Statements
              </Text>
            </TouchableOpacity>
          </View>

          {/* Transactions List */}
          {activeTab === "transactions" && (
            <View style={styles.transactionsContainer}>
              <TransactionList 
                  transactions={transactions}
                  maxItems={10}
                  onRefresh={() => {}}
                  isRefreshing={false}
                  isFlatList={false}
              />
            </View>
          )}

          {/* Statements List */}
          {activeTab === "statements" && (
            <View style={styles.statementsContainer}>
              <Text style={styles.statementsHeader}>Monthly Statements</Text>
              {["May 2025", "April 2025", "March 2025"].map((month, index) => (
                <TouchableOpacity key={index} style={styles.statementItem}>
                  <View style={styles.statementIconContainer}>
                    <Ionicons name="document-text-outline" size={20} color={Color.primary} />
                  </View>
                  <Text style={styles.statementMonth}>{month}</Text>
                  <TouchableOpacity style={styles.downloadButton}>
                    <Ionicons name="download-outline" size={20} color={Color.primary} />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* More Settings Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showMoreSettings}
        onRequestClose={() => setShowMoreSettings(false)}
        statusBarTranslucent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Card Settings</Text>
              <TouchableOpacity onPress={() => setShowMoreSettings(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScrollView}>
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingIcon}>
                  <Ionicons name="globe-outline" size={24} color={Color.primary} />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>International Payments</Text>
                  <Text style={styles.settingDescription}>Enable or disable international transactions</Text>
                </View>
                <Switch
                  trackColor={{ false: "#767577", true: Color.primary }}
                  thumbColor={"#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  value={true}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingIcon}>
                  <Ionicons name="cart-outline" size={24} color={Color.primary} />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Online Purchases</Text>
                  <Text style={styles.settingDescription}>Allow online and in-app purchases</Text>
                </View>
                <Switch
                  trackColor={{ false: "#767577", true: Color.primary }}
                  thumbColor={"#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  value={true}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingIcon}>
                  <Ionicons name="wallet-outline" size={24} color={Color.primary} />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>ATM Withdrawals</Text>
                  <Text style={styles.settingDescription}>Enable cash withdrawals at ATMs</Text>
                </View>
                <Switch
                  trackColor={{ false: "#767577", true: Color.primary }}
                  thumbColor={"#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  value={true}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingIcon}>
                  <Ionicons name="notifications-outline" size={24} color={Color.primary} />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Transaction Alerts</Text>
                  <Text style={styles.settingDescription}>Get notified for all transactions</Text>
                </View>
                <Switch
                  trackColor={{ false: "#767577", true: Color.primary }}
                  thumbColor={"#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  value={true}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingIcon}>
                  <Ionicons name="trending-up-outline" size={24} color={Color.primary} />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Spending Limits</Text>
                  <Text style={styles.settingDescription}>Set daily and monthly spending limits</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.settingItem}
                onPress={() => {
                  setShowMoreSettings(false)
                  setShowPinManagement(true)
                  setPinViewMode("view")
                }}
              >
                <View style={styles.settingIcon}>
                  <Ionicons name="keypad-outline" size={24} color={Color.primary} />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Manage PIN</Text>
                  <Text style={styles.settingDescription}>View or change your card PIN</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingIcon}>
                  <Ionicons name="shield-outline" size={24} color={Color.primary} />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>Security Settings</Text>
                  <Text style={styles.settingDescription}>Additional security options</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.settingItem, styles.dangerItem]}>
                <View style={[styles.settingIcon, styles.dangerIcon]}>
                  <Ionicons name="trash-outline" size={24} color="#FF3B30" />
                </View>
                <View style={styles.settingContent}>
                  <Text style={[styles.settingTitle, styles.dangerText]}>Cancel Card</Text>
                  <Text style={styles.settingDescription}>Permanently cancel this card</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#666" />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* PIN Management Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPinManagement}
        onRequestClose={() => setShowPinManagement(false)}
        statusBarTranslucent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {pinViewMode === "view" ? "Verify PIN" : "Change PIN"}
              </Text>
              <TouchableOpacity onPress={() => setShowPinManagement(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.pinContainer}>
              {pinViewMode === "view" ? (
                <>
                  <Text style={styles.pinInstructions}>
                    Enter your current PIN to continue
                  </Text>
                  <View style={styles.pinInputContainer}>
                    <TextInput
                      style={styles.pinInput}
                      value={currentPin}
                      onChangeText={setCurrentPin}
                      keyboardType="numeric"
                      maxLength={4}
                      secureTextEntry
                      placeholder="Enter 4-digit PIN"
                    />
                  </View>
                  {pinError ? <Text style={styles.pinError}>{pinError}</Text> : null}
                  <View style={styles.pinActions}>
                    <TouchableOpacity 
                      style={styles.pinSecondaryButton}
                      onPress={() => {
                        setShowPinManagement(false)
                        setPinViewMode("view")
                      }}
                    >
                      <Text style={styles.pinSecondaryButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.pinPrimaryButton,
                        currentPin.length !== 4 && styles.pinButtonDisabled
                      ]}
                      onPress={verifyPin}
                      disabled={currentPin.length !== 4}
                    >
                      <Text style={styles.pinPrimaryButtonText}>Verify</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity 
                    style={styles.pinChangeButton}
                    onPress={() => {
                      setPinViewMode("change")
                      setCurrentPin("")
                      setPinError("")
                    }}
                  >
                    <Text style={styles.pinChangeButtonText}>Change PIN</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.pinInstructions}>
                    Create a new 4-digit PIN
                  </Text>
                  <View style={styles.pinInputContainer}>
                    <TextInput
                      style={styles.pinInput}
                      value={newPin}
                      onChangeText={setNewPin}
                      keyboardType="numeric"
                      maxLength={4}
                      secureTextEntry
                      placeholder="New PIN"
                    />
                  </View>
                  <View style={styles.pinInputContainer}>
                    <TextInput
                      style={styles.pinInput}
                      value={confirmPin}
                      onChangeText={setConfirmPin}
                      keyboardType="numeric"
                      maxLength={4}
                      secureTextEntry
                      placeholder="Confirm PIN"
                    />
                  </View>
                  {pinError ? <Text style={styles.pinError}>{pinError}</Text> : null}
                  <View style={styles.pinActions}>
                    <TouchableOpacity 
                      style={styles.pinSecondaryButton}
                      onPress={() => {
                        setPinViewMode("view")
                        setNewPin("")
                        setConfirmPin("")
                        setPinError("")
                      }}
                    >
                      <Text style={styles.pinSecondaryButtonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[
                        styles.pinPrimaryButton,
                        (newPin.length !== 4 || confirmPin.length !== 4) && styles.pinButtonDisabled
                      ]}
                      onPress={changePin}
                      disabled={newPin.length !== 4 || confirmPin.length !== 4}
                    >
                      <Text style={styles.pinPrimaryButtonText}>Update PIN</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  infoButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  cardSection: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "white",
  },
  actionsColumn: {
    width: 100,
    marginRight: 16,
    justifyContent: "space-between",
  },
  actionButton: {
    alignItems: "center",
    marginBottom: 20,
  },
  actionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  actionIconContainerActive: {
    backgroundColor: Color.primary,
    borderColor: Color.primary,
  },
  actionText: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
  },
  cardDisplay: {
    flex: 1,
    height: 300,
    borderRadius: 16,
    padding: 16,
    position: "relative",
  },
  frozenCard: {
    opacity: 0.8,
  },
  frozenOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 16,
    zIndex: 10,
  },
  frozenText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  cardChip: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  cardWave: {
    position: "absolute",
    top: 20,
    left: 60,
  },
  cardBrand: {
    position: "absolute",
    top: 20,
    right: 20,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardNumberContainer: {
    marginTop: 60,
  },
  cardNumberText: {
    color: "white",
    fontSize: 18,
    letterSpacing: 1,
  },
  cardNumberGroup: {
    marginBottom: 5,
  },
  cardBalanceContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  cardBalance: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardHolderName: {
    color: "white",
    fontSize: 16,
  },
  infoSection: {
    backgroundColor: "white",
    marginTop: 16,
    padding: 16,
  },
  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  hideInfoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  hideInfoText: {
    marginLeft: 4,
    fontSize: 14,
    color: "black",
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F7",
  },
  infoLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoLabelText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "black",
  },
  pinManagementButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#F5F5F7",
    borderRadius: 8,
  },
  pinManagementText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    color: Color.black,
  },
  statusSection: {
    backgroundColor: "white",
    marginTop: 16,
    padding: 16,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
    marginBottom: 16,
  },
  statusItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusLabelText: {
    marginLeft: 8,
    fontSize: 14,
    color: "black",
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Color.primary,
  },
  tabText: {
    fontSize: 14,
    color: Color.black,
  },
  activeTabText: {
    color: "black",
    fontWeight: "600",
  },
  transactionsContainer: {
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  statementsContainer: {
    backgroundColor: "white",
    padding: 16,
  },
  statementsHeader: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  statementItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F7",
  },
  statementIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  statementMonth: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "black",
  },
  downloadButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
    bottom: 0,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
  },
  modalScrollView: {
    maxHeight: "70%",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F7",
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "black",
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: "#666",
  },
  dangerItem: {
    borderTopWidth: 1,
    borderTopColor: "#F5F5F7",
    marginTop: 8,
    paddingTop: 16,
  },
  dangerIcon: {
    backgroundColor: "#FFEEEE",
  },
  dangerText: {
    color: "#FF3B30",
  },
  pinContainer: {
    padding: 16,
  },
  pinInstructions: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
  },
  pinInputContainer: {
    marginBottom: 16,
  },
  pinInput: {
    backgroundColor: "#F5F5F7",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlign: "center",
    letterSpacing: 8,
  },
  pinError: {
    color: "#FF3B30",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
  pinActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  pinPrimaryButton: {
    flex: 1,
    backgroundColor: Color.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 8,
  },
  pinSecondaryButton: {
    flex: 1,
    backgroundColor: "#F5F5F7",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  pinPrimaryButtonText: {
    color: Color.white,
    fontSize: 14,
    fontWeight: "600",
  },
  pinSecondaryButtonText: {
    color: "black",
    fontSize: 14,
  },
  pinButtonDisabled: {
    opacity: 0.5,
  },
  pinChangeButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  pinChangeButtonText: {
    color: "#B4F24E",
    fontSize: 14,
    fontWeight: "500",
  },
})

export default CardDetailsScreen