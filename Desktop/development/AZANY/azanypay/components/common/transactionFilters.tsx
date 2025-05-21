"use client"

import { useState, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from "react-native"
import type {
  TransactionFiltersProps,
  FilterOptionProps,
  DateRangePickerProps,
  TypePickerProps,
  CurrencyPickerProps,
  StatusPickerProps,
} from "@/types/type"

// Filter option component with selection indicator
const FilterOption = ({ label, isSelected, onSelect }: FilterOptionProps) => (
  <TouchableOpacity
    style={[styles.filterOption, isSelected && styles.selectedFilterOption]}
    onPress={onSelect}
    activeOpacity={0.7}
  >
    <Text style={[styles.filterOptionText, isSelected && styles.selectedFilterOptionText]}>{label}</Text>
    {isSelected && <Text style={styles.checkmark}>✓</Text>}
  </TouchableOpacity>
)

// Date range picker component
const DateRangePicker = ({ selectedRange, onSelectRange, onClose }: DateRangePickerProps) => {
  const dateRanges = ["Today", "Yesterday", "This Week", "This Month", "Last Month", "Custom"]

  return (
    <View style={styles.filterModalContent}>
      <Text style={styles.filterModalTitle}>Select Date Range</Text>
      <ScrollView style={styles.filterOptionsList}>
        {dateRanges.map((range) => (
          <FilterOption
            key={range}
            label={range}
            isSelected={selectedRange === range}
            onSelect={() => onSelectRange(range)}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.applyButton} onPress={onClose}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  )
}

// Transaction type picker component
const TypePicker = ({ selectedType, onSelectType, onClose }: TypePickerProps) => {
  const types = ["All", "Transfer", "Deposit", "Withdrawal"]

  return (
    <View style={styles.filterModalContent}>
      <Text style={styles.filterModalTitle}>Select Transaction Type</Text>
      <ScrollView style={styles.filterOptionsList}>
        {types.map((type) => (
          <FilterOption
            key={type}
            label={type}
            isSelected={selectedType === type}
            onSelect={() => onSelectType(type)}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.applyButton} onPress={onClose}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  )
}

// Currency picker component
const CurrencyPicker = ({ selectedCurrency, onSelectCurrency, onClose }: CurrencyPickerProps) => {
  const currencies = [
    { code: "All", name: "All Currencies" },
    { code: "NGN", name: "Nigerian Naira" },
    { code: "USD", name: "US Dollar" },
    { code: "GBP", name: "British Pound" },
    { code: "EUR", name: "Euro" },
    { code: "KES", name: "Kenyan Shilling" },
  ]

  return (
    <View style={styles.filterModalContent}>
      <Text style={styles.filterModalTitle}>Select Currency</Text>
      <ScrollView style={styles.filterOptionsList}>
        {currencies.map((currency) => (
          <FilterOption
            key={currency.code}
            label={`${currency.code === "All" ? "" : currency.code + " - "}${currency.name}`}
            isSelected={selectedCurrency === currency.code}
            onSelect={() => onSelectCurrency(currency.code)}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.applyButton} onPress={onClose}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  )
}

// Status picker component
const StatusPicker = ({ selectedStatus, onSelectStatus, onClose }: StatusPickerProps) => {
  const statuses = ["All", "Completed", "Pending", "Failed"]

  return (
    <View style={styles.filterModalContent}>
      <Text style={styles.filterModalTitle}>Select Status</Text>
      <ScrollView style={styles.filterOptionsList}>
        {statuses.map((status) => (
          <FilterOption
            key={status}
            label={status}
            isSelected={selectedStatus === status}
            onSelect={() => onSelectStatus(status)}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.applyButton} onPress={onClose}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  )
}

const TransactionFilters = ({ filters, onFilterChange }: TransactionFiltersProps) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const slideAnim = useRef(new Animated.Value(0)).current

  const openFilter = (filterType: string) => {
    setActiveFilter(filterType)
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  const closeFilter = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setActiveFilter(null)
    })
  }

  const handleFilterChange = (filterType: string, value: string) => {
    onFilterChange({ ...filters, [filterType]: value })
  }

  const renderFilterModal = () => {
    switch (activeFilter) {
      case "dateRange":
        return (
          <DateRangePicker
            selectedRange={filters.dateRange}
            onSelectRange={(range) => handleFilterChange("dateRange", range)}
            onClose={closeFilter}
          />
        )
      case "type":
        return (
          <TypePicker
            selectedType={filters.type}
            onSelectType={(type) => handleFilterChange("type", type)}
            onClose={closeFilter}
          />
        )
      case "currency":
        return (
          <CurrencyPicker
            selectedCurrency={filters.currency}
            onSelectCurrency={(currency) => handleFilterChange("currency", currency)}
            onClose={closeFilter}
          />
        )
      case "status":
        return (
          <StatusPicker
            selectedStatus={filters.status}
            onSelectStatus={(status) => handleFilterChange("status", status)}
            onClose={closeFilter}
          />
        )
      default:
        return null
    }
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.dateRange !== "All") count++
    if (filters.type !== "All") count++
    if (filters.currency !== "All") count++
    if (filters.status !== "All") count++
    return count
  }

  const resetFilters = () => {
    onFilterChange({
      dateRange: "All",
      type: "All",
      currency: "All",
      status: "All",
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filters</Text>
        {getActiveFiltersCount() > 0 && (
          <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
        <TouchableOpacity
          style={[styles.filterButton, filters.dateRange !== "All" && styles.activeFilterButton]}
          onPress={() => openFilter("dateRange")}
        >
          <Text style={[styles.filterButtonText, filters.dateRange !== "All" && styles.activeFilterButtonText]}>
            {filters.dateRange === "All" ? "Date" : filters.dateRange}
          </Text>
          <Text style={styles.filterButtonIcon}>▼</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filters.type !== "All" && styles.activeFilterButton]}
          onPress={() => openFilter("type")}
        >
          <Text style={[styles.filterButtonText, filters.type !== "All" && styles.activeFilterButtonText]}>
            {filters.type === "All" ? "Type" : filters.type}
          </Text>
          <Text style={styles.filterButtonIcon}>▼</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filters.currency !== "All" && styles.activeFilterButton]}
          onPress={() => openFilter("currency")}
        >
          <Text style={[styles.filterButtonText, filters.currency !== "All" && styles.activeFilterButtonText]}>
            {filters.currency === "All" ? "Currency" : filters.currency}
          </Text>
          <Text style={styles.filterButtonIcon}>▼</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filters.status !== "All" && styles.activeFilterButton]}
          onPress={() => openFilter("status")}
        >
          <Text style={[styles.filterButtonText, filters.status !== "All" && styles.activeFilterButtonText]}>
            {filters.status === "All" ? "Status" : filters.status}
          </Text>
          <Text style={styles.filterButtonIcon}>▼</Text>
        </TouchableOpacity>
      </ScrollView>

      {getActiveFiltersCount() > 0 && (
        <View style={styles.activeFiltersContainer}>
          <Text style={styles.activeFiltersText}>
            {getActiveFiltersCount()} filter{getActiveFiltersCount() > 1 ? "s" : ""} applied
          </Text>
        </View>
      )}

      <Modal visible={activeFilter !== null} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={closeFilter}>
          <View style={styles.modalOverlay}>
            <Animated.View
              style={[
                styles.modalContainer,
                {
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [600, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <TouchableWithoutFeedback>
                <View>{renderFilterModal()}</View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  resetButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  resetButtonText: {
    color: "#f03e3e",
    fontSize: 14,
  },
  filtersScroll: {
    flexDirection: "row",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: "#f03e3e20",
  },
  filterButtonText: {
    fontSize: 14,
    color: "#495057",
  },
  activeFilterButtonText: {
    color: "#f03e3e",
    fontWeight: "500",
  },
  filterButtonIcon: {
    fontSize: 10,
    color: "#adb5bd",
    marginLeft: 4,
  },
  activeFiltersContainer: {
    marginTop: 12,
  },
  activeFiltersText: {
    fontSize: 12,
    color: "#666",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 30, // For safe area
  },
  filterModalContent: {
    padding: 20,
  },
  filterModalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  filterOptionsList: {
    maxHeight: 300,
  },
  filterOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  selectedFilterOption: {
    backgroundColor: "#f03e3e10",
  },
  filterOptionText: {
    fontSize: 16,
    color: "#495057",
  },
  selectedFilterOptionText: {
    color: "#f03e3e",
    fontWeight: "500",
  },
  checkmark: {
    color: "#f03e3e",
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: "#f03e3e",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default TransactionFilters
