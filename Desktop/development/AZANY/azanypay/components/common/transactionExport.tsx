

import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Share,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native"
import type { Transaction, TransactionExportProps, ExportOptionProps } from "@/types/type"

// Export format option component
const ExportOption = ({ icon, title, description, format, onSelect, isSelected }: ExportOptionProps) => (
  <TouchableOpacity
    style={[styles.exportOption, isSelected && styles.selectedExportOption]}
    onPress={() => onSelect(format)}
  >
    <View style={styles.exportOptionIcon}>
      <Text style={styles.exportOptionIconText}>{icon}</Text>
    </View>
    <View style={styles.exportOptionContent}>
      <Text style={styles.exportOptionTitle}>{title}</Text>
      <Text style={styles.exportOptionDescription}>{description}</Text>
    </View>
    {isSelected && <Text style={styles.checkmark}>✓</Text>}
  </TouchableOpacity>
)

// Date range selector component
const DateRangeSelector = ({ startDate, endDate, onDateChange } : { startDate: any, endDate: any, onDateChange: any}) => {
  // In a real app, you would implement a date picker here
  // For this demo, we'll use a simplified version
  const [start, setStart] = useState(startDate)
  const [end, setEnd] = useState(endDate)

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const handleStartDatePress = () => {
    // In a real app, show a date picker
    Alert.alert("Select Start Date", "In a real app, this would show a date picker")
    // For demo, just move the date back by 7 days
    const newDate: any = new Date(start)
    newDate.setDate(newDate.getDate() - 7)
    setStart(newDate)
    onDateChange(newDate, end)
  }

  const handleEndDatePress = () => {
    // In a real app, show a date picker
    Alert.alert("Select End Date", "In a real app, this would show a date picker")
    // For demo, just move the date forward by 1 day
    const newDate: any = new Date(end)
    newDate.setDate(newDate.getDate() + 1)
    setEnd(newDate)
    onDateChange(start, newDate)
  }

  return (
    <View style={styles.dateRangeContainer}>
      <Text style={styles.dateRangeLabel}>Date Range</Text>
      <View style={styles.dateInputsContainer}>
        <TouchableOpacity style={styles.dateInput} onPress={handleStartDatePress}>
          <Text style={styles.dateInputLabel}>From</Text>
          <Text style={styles.dateInputValue}>{formatDate(start)}</Text>
        </TouchableOpacity>
        <Text style={styles.dateRangeSeparator}>-</Text>
        <TouchableOpacity style={styles.dateInput} onPress={handleEndDatePress}>
          <Text style={styles.dateInputLabel}>To</Text>
          <Text style={styles.dateInputValue}>{formatDate(end)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const TransactionExport = ({ transactions, filters, onClose }: TransactionExportProps) => {
  const [selectedFormat, setSelectedFormat] = useState("csv")
  const [isExporting, setIsExporting] = useState(false)
  const [startDate, setStartDate] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) // 30 days ago
  const [endDate, setEndDate] = useState(new Date())
  const slideAnim = useRef(new Animated.Value(400)).current

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [slideAnim])

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose()
    })
  }

  const handleFormatSelect = (format: string) => {
    setSelectedFormat(format)
  }

  const handleDateChange = (start: Date, end: Date) => {
    setStartDate(start)
    setEndDate(end)
  }

  const getFilteredTransactions = () => {
    // Apply date range filter to transactions
    return transactions.filter((tx) => {
      // In a real app, you would parse the date strings properly
      // This is a simplified version for the demo
      return true // Return all transactions for demo
    })
  }

  const handleExport = async () => {
    setIsExporting(true)

    // Simulate export process
    setTimeout(async () => {
      setIsExporting(false)

      const filteredTransactions = getFilteredTransactions()
      const count = filteredTransactions.length

      // Generate export content based on format
      let content = ""
      let filename = ""
      let mimeType = ""

      switch (selectedFormat) {
        case "csv":
          content = generateCSV(filteredTransactions)
          filename = "transactions.csv"
          mimeType = "text/csv"
          break
        case "pdf":
          content = "PDF content would be generated here"
          filename = "transactions.pdf"
          mimeType = "application/pdf"
          break
        case "excel":
          content = "Excel content would be generated here"
          filename = "transactions.xlsx"
          mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          break
        case "json":
          content = JSON.stringify(filteredTransactions, null, 2)
          filename = "transactions.json"
          mimeType = "application/json"
          break
      }

      // In a real app, you would save the file or offer it for download
      // For this demo, we'll just show a success message and share option

      try {
        await Share.share({
          title: `Exported ${count} Transactions`,
          message: `Your ${count} transactions have been exported as ${filename}.\n\n${
            selectedFormat === "json" ? content.substring(0, 300) + "..." : "File content preview not available"
          }`,
        })
      } catch (error) {
        Alert.alert("Export Error", "Could not share the exported file.")
      }
    }, 2000)
  }

  const generateCSV = (data: Transaction[]) => {
    // Generate CSV header
    const header = "ID,Type,Date,Time,Amount,Currency,Status,Reference,Description\n"

    // Generate CSV rows
    const rows = data
      .map(
        (tx) =>
          `${tx.id},${tx.type},${tx.date},${tx.time},${tx.amount},${tx.currency},${tx.status},${tx.reference},${
            tx.description || ""
          }`,
      )
      .join("\n")

    return header + rows
  }

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={handleClose} />

      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Export Transactions</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Select Format</Text>

          <View style={styles.exportOptionsContainer}>
            <ExportOption
              icon="📄"
              title="CSV File"
              description="Export as comma-separated values file"
              format="csv"
              onSelect={handleFormatSelect}
              isSelected={selectedFormat === "csv"}
            />

            <ExportOption
              icon="📑"
              title="PDF Document"
              description="Export as PDF document with formatting"
              format="pdf"
              onSelect={handleFormatSelect}
              isSelected={selectedFormat === "pdf"}
            />

            <ExportOption
              icon="📊"
              title="Excel Spreadsheet"
              description="Export as Excel spreadsheet"
              format="excel"
              onSelect={handleFormatSelect}
              isSelected={selectedFormat === "excel"}
            />

            <ExportOption
              icon="🔢"
              title="JSON Data"
              description="Export as JSON data format"
              format="json"
              onSelect={handleFormatSelect}
              isSelected={selectedFormat === "json"}
            />
          </View>

          <DateRangeSelector startDate={startDate} endDate={endDate} onDateChange={handleDateChange} />

          <View style={styles.exportInfoContainer}>
            <Text style={styles.exportInfoTitle}>Export Summary</Text>
            <View style={styles.exportInfoRow}>
              <Text style={styles.exportInfoLabel}>Transactions:</Text>
              <Text style={styles.exportInfoValue}>{getFilteredTransactions().length} items</Text>
            </View>
            <View style={styles.exportInfoRow}>
              <Text style={styles.exportInfoLabel}>Date Range:</Text>
              <Text style={styles.exportInfoValue}>
                {startDate.toISOString().split("T")[0]} to {endDate.toISOString().split("T")[0]}
              </Text>
            </View>
            <View style={styles.exportInfoRow}>
              <Text style={styles.exportInfoLabel}>Format:</Text>
              <Text style={styles.exportInfoValue}>{selectedFormat.toUpperCase()}</Text>
            </View>
            {filters.type !== "All" && (
              <View style={styles.exportInfoRow}>
                <Text style={styles.exportInfoLabel}>Type:</Text>
                <Text style={styles.exportInfoValue}>{filters.type}</Text>
              </View>
            )}
            {filters.currency !== "All" && (
              <View style={styles.exportInfoRow}>
                <Text style={styles.exportInfoLabel}>Currency:</Text>
                <Text style={styles.exportInfoValue}>{filters.currency}</Text>
              </View>
            )}
            {filters.status !== "All" && (
              <View style={styles.exportInfoRow}>
                <Text style={styles.exportInfoLabel}>Status:</Text>
                <Text style={styles.exportInfoValue}>{filters.status}</Text>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleClose} disabled={isExporting}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.exportButton, isExporting && styles.exportingButton]}
            onPress={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.exportButtonText}>Export</Text>
            )}
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
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
    maxHeight: "80%",
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
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  exportOptionsContainer: {
    marginBottom: 24,
  },
  exportOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    marginBottom: 12,
  },
  selectedExportOption: {
    backgroundColor: "#f03e3e10",
    borderWidth: 1,
    borderColor: "#f03e3e",
  },
  exportOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  exportOptionIconText: {
    fontSize: 20,
  },
  exportOptionContent: {
    flex: 1,
  },
  exportOptionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  exportOptionDescription: {
    fontSize: 14,
    color: "#666",
  },
  checkmark: {
    color: "#f03e3e",
    fontSize: 18,
    fontWeight: "bold",
  },
  dateRangeContainer: {
    marginBottom: 24,
  },
  dateRangeLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  dateInputsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateInput: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
  },
  dateInputLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  dateInputValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  dateRangeSeparator: {
    marginHorizontal: 12,
    fontSize: 16,
    color: "#666",
  },
  exportInfoContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  exportInfoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  exportInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  exportInfoLabel: {
    fontSize: 14,
    color: "#666",
  },
  exportInfoValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingBottom: Platform.OS === "ios" ? 40 : 20, // Extra padding for iOS
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#495057",
  },
  exportButton: {
    flex: 2,
    backgroundColor: "#f03e3e",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  exportingButton: {
    backgroundColor: "#f03e3e80",
  },
  exportButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
})

export default TransactionExport
