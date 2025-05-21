"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Animated, FlatList, TouchableOpacity } from "react-native"
import type { Transaction, TransactionFilters as TransactionFiltersType, TransactionHistoryProps } from "@/types/type"
import transactionData from "@/data/data"
import { useFadeIn, useSlideIn } from "@/hooks/useAnimation"
import SwipeableTransaction from "./swipeableTransaction"
import TransactionSearch from "./transacrionSearch"
import TransactionFilters from "./transactionFilters"
import TransactionDetails from "./transactionDetails"
import TransactionExport from "./transactionExport"

const TransactionHistory = ({ initialTransactions = transactionData }: TransactionHistoryProps) => {
  const fadeAnim = useFadeIn(500, 400)
  const slideAnim = useSlideIn("up", 15, 500, 400)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [exportVisible, setExportVisible] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(initialTransactions)
  const [filters, setFilters] = useState<TransactionFiltersType>({
    dateRange: "All",
    type: "All",
    currency: "All",
    status: "All",
  })
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Apply filters and search
    let result = transactions

    // Apply filters
    if (filters.dateRange !== "All") {
      // Simple date filter implementation
      // In a real app, you would implement proper date range filtering
      result = result.filter((tx) => {
        if (filters.dateRange === "Today") return tx.date === "Today"
        if (filters.dateRange === "Yesterday") return tx.date === "Yesterday"
        if (filters.dateRange === "This Week") return true // Simplified
        if (filters.dateRange === "This Month") return true // Simplified
        if (filters.dateRange === "Last Month") return true // Simplified
        return true
      })
    }

    if (filters.type !== "All") {
      result = result.filter((tx) => tx.type === filters.type)
    }

    if (filters.currency !== "All") {
      result = result.filter((tx) => tx.currency === filters.currency)
    }

    if (filters.status !== "All") {
      result = result.filter((tx) => tx.status === filters.status)
    }

    // Apply search
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (tx) =>
          tx.type.toLowerCase().includes(query) ||
          tx.amount.includes(query) ||
          tx.reference.toLowerCase().includes(query) ||
          tx.date.toLowerCase().includes(query) ||
          tx.currency.toLowerCase().includes(query) ||
          (tx.recipient?.name && tx.recipient.name.toLowerCase().includes(query)) ||
          (tx.description && tx.description.toLowerCase().includes(query)),
      )
    }

    setFilteredTransactions(result)
  }, [filters, searchQuery, transactions])

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setDetailsVisible(true)
  }

  const handleCloseDetails = () => {
    setDetailsVisible(false)
  }

  const handleFilterChange = (newFilters: TransactionFiltersType) => {
    setFilters(newFilters)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleExportPress = () => {
    setExportVisible(true)
  }

  const handleCloseExport = () => {
    setExportVisible(false)
  }

  const renderTransactionItem = ({ item, index }: { item: Transaction; index: number }) => (
    <>
      <SwipeableTransaction
        type={item.type}
        date={item.date}
        time={item.time}
        amount={item.amount}
        currency={item.currency}
        index={index}
        onViewDetails={() => handleViewDetails(item)}
      />
      {index < filteredTransactions.length - 1 && <View style={styles.divider} />}
    </>
  )

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No transactions found</Text>
      <Text style={styles.emptyText}>Try adjusting your filters or search criteria</Text>
    </View>
  )

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }, slideAnim]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transaction History</Text>
        <TouchableOpacity style={styles.exportButton} onPress={handleExportPress}>
          <Text style={styles.exportButtonText}>Export</Text>
        </TouchableOpacity>
      </View>

      <TransactionSearch onSearch={handleSearch} transactions={transactions} />

      <TransactionFilters filters={filters} onFilterChange={handleFilterChange} />

      <View style={styles.transactionsList}>
        {filteredTransactions.length > 0 ? (
          <FlatList
            data={filteredTransactions}
            renderItem={renderTransactionItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          renderEmptyList()
        )}
      </View>

      <TransactionDetails isVisible={detailsVisible} transaction={selectedTransaction} onClose={handleCloseDetails} />

      {exportVisible && (
        <TransactionExport transactions={filteredTransactions} filters={filters} onClose={handleCloseExport} />
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  exportButton: {
    backgroundColor: "#f8f9fa",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#dee2e6",
  },
  exportButtonText: {
    fontSize: 14,
    color: "#495057",
  },
  transactionsList: {
    backgroundColor: "white",
    borderRadius: 12,
    minHeight: 200,
  },
  listContent: {
    padding: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
})

export default TransactionHistory
