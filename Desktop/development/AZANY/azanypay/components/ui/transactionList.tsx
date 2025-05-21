"use client"
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import { useRouter } from "expo-router"
import { Color } from "@/constant"
import LoadingModal from "./loading"
import { Ionicons } from "@expo/vector-icons"
import Swipeable from "./swipeable"

type Transaction = {
  id: string
  title: string
  date: string
  amount: string
  type: string
}

type TransactionListProps = {
  transactions: Transaction[]
  title?: string
  showViewAll?: boolean
  onViewAllPress?: () => void
  maxItems?: number
  isFullList?: boolean
  emptyListMessage?: string
  onRefresh?: () => void
  isRefreshing?: boolean
  onViewDetail?: (id: string) => void
  isFlatList?: boolean
  onDeleteTransaction?: (id: string) => void
  enableSwipe?: boolean
}

const TransactionList = ({
  transactions,
  title,
  showViewAll,
  onViewAllPress,
  maxItems,
  isFullList = false,
  emptyListMessage = "No transactions found",
  onRefresh,
  isRefreshing = false,
  onViewDetail,
  isFlatList = false,
  onDeleteTransaction,
  enableSwipe = true,
}: TransactionListProps) => {
  const router = useRouter()

  // Filter transactions if maxItems is provided and we're not showing the full list
  const displayTransactions = !isFullList && maxItems ? transactions.slice(0, maxItems) : transactions

  const handleViewDetail = (id: string) => {
    if (onViewDetail) {
      onViewDetail(id)
    }
  }

  const renderItem = (item: Transaction) => {
    if (enableSwipe) {
      return (
        <Swipeable
          key={item.id}
          id={item.id}
          title={item.title}
          date={item.date}
          amount={item.amount}
          type={item.type}
          onViewDetail={() => handleViewDetail(item.id)}
          onDelete={onDeleteTransaction}
        />
      )
    }

    return (
      <TouchableOpacity key={item.id} style={styles.transactionItem} onPress={() => handleViewDetail(item.id)}>
        <View style={[styles.transactionIcon, { backgroundColor: item.type === "received" ? "#E6F0FF" : "#FFE6E6" }]}>
          <Ionicons
            name={item.type === "received" ? "arrow-down" : "arrow-up"}
            color={item.type === "received" ? "#C99213" : "#FF3333"}
            size={20}
          />
        </View>

        <View style={styles.transactionInfo}>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionDate}>{item.date}</Text>
        </View>

        <Text style={[styles.transactionAmount, { color: item.type === "received" ? "#C99213" : "#FF3333" }]}>
          {item.type === "received" ? "+" : "-"}${item.amount}
        </Text>
      </TouchableOpacity>
    )
  }

  const renderHeader = () =>
    showViewAll ? (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {!isFullList && (
          <TouchableOpacity onPress={onViewAllPress || (() => router.push("/dashboard/allTransactions"))}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        )}
      </View>
    ) : (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
    )

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{emptyListMessage}</Text>
    </View>
  )

  // Instead of using FlatList directly, conditionally render based on isFlatList prop
  return (
    <View style={[styles.transactionsSection, isFlatList && { flex: 1 }]}>
      {isFlatList ? (
        // FlatList version for dedicated transaction screens
        <FlatList
          data={displayTransactions}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyComponent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={transactions.length === 0 ? { flex: 1 } : {}}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          initialNumToRender={10}
          maxToRenderPerBatch={15}
          windowSize={10}
        />
      ) : (
        // Manual rendering version for avoiding nested ScrollView issues
        <>
          {renderHeader()}

          {displayTransactions.length > 0
            ? displayTransactions.map((item) => renderItem(item))
            : renderEmptyComponent()}

          {onRefresh && !isFullList && <>{isRefreshing ? <LoadingModal visible={isRefreshing} /> : null}</>}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  transactionsSection: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "montserrat",
  },
  viewAllText: {
    color: Color.primary,
    fontSize: 14,
    fontFamily: "medium",
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
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
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  emptyText: {
    fontSize: 16,
    color: "#8E8E93",
    fontFamily: "medium",
  },
  refreshButton: {
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 5,
  },
  refreshText: {
    color: Color.primary,
    fontSize: 14,
    fontFamily: "regular",
  },
})

export default TransactionList
