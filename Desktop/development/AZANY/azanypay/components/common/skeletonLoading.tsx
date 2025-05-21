"use client"

import { useEffect, useRef } from "react"
import { View, StyleSheet, Animated, Dimensions } from "react-native"
import type { SkeletonProps } from "@/types/type"

const { width } = Dimensions.get("window")

const Skeleton = ({ width: skeletonWidth, height, style }: SkeletonProps) => {
  const translateX = useRef(new Animated.Value(-width)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        useNativeDriver: true,
        duration: 1500,
      }),
    ).start()
  }, [translateX])

  return (
    <View
      style={[
        {
          width: skeletonWidth || "100%",
          height,
          backgroundColor: "#E1E9EE",
          borderRadius: 4,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          transform: [{ translateX }],
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          position: "absolute",
        }}
      />
    </View>
  )
}

export const CardSectionSkeleton = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Skeleton width={80} height={20} />
        <Skeleton width={100} height={24} style={{ borderRadius: 12 }} />
      </View>
      <Skeleton width={150} height={30} style={{ marginVertical: 12 }} />
      <View style={styles.cardDetails}>
        <View>
          <Skeleton width={140} height={18} style={{ marginBottom: 8 }} />
          <Skeleton width={120} height={14} style={{ marginBottom: 6 }} />
          <Skeleton width={80} height={14} />
        </View>
        <Skeleton width={80} height={20} />
      </View>
      <View style={styles.cardFooter}>
        <Skeleton width={200} height={16} />
      </View>
    </View>
  )
}

export const CurrenciesSkeleton = () => {
  return (
    <View style={styles.currenciesContainer}>
      <Skeleton width={100} height={20} style={{ marginBottom: 12 }} />
      <View style={styles.currenciesGrid}>
        <View style={styles.currenciesRow}>
          <Skeleton width="48%" height={80} style={{ borderRadius: 8 }} />
          <Skeleton width="48%" height={80} style={{ borderRadius: 8 }} />
        </View>
        <View style={styles.currenciesRow}>
          <Skeleton width="48%" height={80} style={{ borderRadius: 8 }} />
          <Skeleton width="48%" height={80} style={{ borderRadius: 8 }} />
        </View>
      </View>
    </View>
  )
}

export const TransactionsSkeleton = () => {
  return (
    <View style={styles.transactionsContainer}>
      <View style={styles.transactionsHeader}>
        <Skeleton width={150} height={20} />
        <Skeleton width={80} height={20} />
      </View>

      <View style={styles.filterContainer}>
        <Skeleton width={40} height={16} style={{ marginBottom: 8 }} />
        <View style={styles.filtersRow}>
          <Skeleton width="30%" height={16} />
          <Skeleton width="30%" height={16} />
          <Skeleton width="30%" height={16} />
        </View>
      </View>

      <View style={styles.transactionsList}>
        <TransactionItemSkeleton />
        <View style={styles.divider} />
        <TransactionItemSkeleton />
        <View style={styles.divider} />
        <TransactionItemSkeleton />
      </View>
    </View>
  )
}

const TransactionItemSkeleton = () => (
  <View style={styles.transactionItem}>
    <View>
      <Skeleton width={100} height={16} style={{ marginBottom: 6 }} />
      <Skeleton width={120} height={12} />
    </View>
    <View style={styles.transactionRight}>
      <Skeleton width={80} height={16} />
      <Skeleton width={40} height={14} style={{ marginLeft: 8 }} />
    </View>
  </View>
)

export const HeaderSkeleton = () => (
  <View style={styles.headerContainer}>
    <Skeleton width={120} height={36} style={{ borderRadius: 4 }} />
    <Skeleton width={120} height={36} style={{ borderRadius: 4 }} />
    <Skeleton width={32} height={32} style={{ borderRadius: 16, marginLeft: 12 }} />
  </View>
)

export const BottomNavSkeleton = () => (
  <View style={styles.bottomNavContainer}>
    {[0, 1, 2, 3].map((i) => (
      <View key={i} style={styles.navItem}>
        <Skeleton width={40} height={40} style={{ borderRadius: 20, marginBottom: 4 }} />
        <Skeleton width={60} height={12} />
      </View>
    ))}
  </View>
)

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#ffcdd2",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginTop: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  cardFooter: {
    marginTop: 16,
  },
  currenciesContainer: {
    padding: 16,
    paddingTop: 0,
  },
  currenciesGrid: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
  },
  currenciesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  transactionsContainer: {
    padding: 16,
    paddingTop: 0,
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  filterContainer: {
    marginBottom: 16,
  },
  filtersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transactionsList: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  transactionRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
  },
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  bottomNavContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  navItem: {
    alignItems: "center",
  },
})

export default {
  CardSectionSkeleton,
  CurrenciesSkeleton,
  TransactionsSkeleton,
  HeaderSkeleton,
  BottomNavSkeleton,
}
