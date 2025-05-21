"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Keyboard, FlatList } from "react-native"
import type { TransactionSearchProps, SearchHistoryItemProps } from "@/types/type"

const SearchHistoryItem = ({ term, onPress }: SearchHistoryItemProps) => (
  <TouchableOpacity style={styles.historyItem} onPress={() => onPress(term)}>
    <Text style={styles.historyIcon}>⟲</Text>
    <Text style={styles.historyText}>{term}</Text>
  </TouchableOpacity>
)

const TransactionSearch = ({ onSearch, transactions }: TransactionSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const inputRef = useRef<TextInput>(null)
  const containerHeight = useRef(new Animated.Value(56)).current
  const historyOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (isFocused && searchQuery === "") {
      setShowHistory(true)
      Animated.parallel([
        Animated.timing(containerHeight, {
          toValue: 200,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(historyOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start()
    } else {
      setShowHistory(false)
      Animated.parallel([
        Animated.timing(containerHeight, {
          toValue: 56,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(historyOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start()
    }
  }, [isFocused, searchQuery, containerHeight, historyOpacity])

  const handleSearch = (query: string = searchQuery) => {
    if (query.trim() === "") return

    // Add to search history if not already present
    if (!searchHistory.includes(query)) {
      const newHistory = [query, ...searchHistory.slice(0, 4)]
      setSearchHistory(newHistory)
    }

    // Perform search
    onSearch(query)
    Keyboard.dismiss()
  }

  const handleClear = () => {
    setSearchQuery("")
    onSearch("")
    inputRef.current?.focus()
  }

  const handleHistoryItemPress = (term: string) => {
    setSearchQuery(term)
    handleSearch(term)
  }

  const handleClearHistory = () => {
    setSearchHistory([])
  }

  return (
    <Animated.View style={[styles.container, { height: containerHeight }]}>
      <View style={styles.searchInputContainer}>
        <View style={[styles.searchBar, isFocused && styles.searchBarFocused]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder="Search transactions..."
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text)
              if (text.trim() !== "") {
                onSearch(text)
              } else {
                onSearch("")
              }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onSubmitEditing={() => handleSearch()}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          {searchQuery !== "" && (
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
        {isFocused && (
          <TouchableOpacity style={styles.cancelButton} onPress={() => Keyboard.dismiss()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>

      {showHistory && (
        <Animated.View style={[styles.historyContainer, { opacity: historyOpacity }]}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Recent Searches</Text>
            {searchHistory.length > 0 && (
              <TouchableOpacity onPress={handleClearHistory}>
                <Text style={styles.clearHistoryText}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>

          {searchHistory.length > 0 ? (
            <FlatList
              data={searchHistory}
              keyExtractor={(item, index) => `history-${index}`}
              renderItem={({ item }) => <SearchHistoryItem term={item} onPress={handleHistoryItemPress} />}
            />
          ) : (
            <Text style={styles.emptyHistoryText}>No recent searches</Text>
          )}
        </Animated.View>
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchBarFocused: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f03e3e",
  },
  searchIcon: {
    fontSize: 16,
    color: "#adb5bd",
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#495057",
    height: 40,
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    fontSize: 16,
    color: "#adb5bd",
  },
  cancelButton: {
    marginLeft: 12,
  },
  cancelButtonText: {
    color: "#f03e3e",
    fontSize: 16,
  },
  historyContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#495057",
  },
  clearHistoryText: {
    fontSize: 14,
    color: "#f03e3e",
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  historyIcon: {
    fontSize: 14,
    color: "#adb5bd",
    marginRight: 12,
  },
  historyText: {
    fontSize: 14,
    color: "#495057",
  },
  emptyHistoryText: {
    fontSize: 14,
    color: "#adb5bd",
    fontStyle: "italic",
    marginTop: 8,
  },
})

export default TransactionSearch
