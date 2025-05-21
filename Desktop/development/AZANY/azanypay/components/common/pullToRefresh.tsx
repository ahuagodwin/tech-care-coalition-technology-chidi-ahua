"use client"

import { useState, useRef, useCallback } from "react"
import { View, Text, StyleSheet, Animated, PanResponder, ScrollView, Dimensions } from "react-native"
import type { PullToRefreshProps } from "@/types/type"

const { width } = Dimensions.get("window")
const REFRESH_HEIGHT = 80
const MAX_PULL_DISTANCE = 120

const PullToRefresh = ({ onRefresh, refreshing, children }: PullToRefreshProps) => {
  const [refreshState, setRefreshState] = useState<"idle" | "pulling" | "ready" | "refreshing" | "complete">(
    refreshing ? "refreshing" : "idle",
  )
  const scrollY: any = useRef(new Animated.Value(0)).current
  const refreshIndicatorPosition = useRef(new Animated.Value(-REFRESH_HEIGHT)).current
  const rotation = useRef(new Animated.Value(0)).current
  const scrollViewRef = useRef<ScrollView>(null)
  const isRefreshingRef = useRef(refreshing)

  // Update ref when refreshing prop changes
  if (isRefreshingRef.current !== refreshing) {
    isRefreshingRef.current = refreshing
    if (refreshing) {
      setRefreshState("refreshing")
      Animated.timing(refreshIndicatorPosition, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start()

      // Start rotation animation
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 360,
          duration: 1000,
          useNativeDriver: true,
        }),
      ).start()
    } else if (refreshState === "refreshing") {
      setRefreshState("complete")

      // Stop rotation animation
      rotation.stopAnimation()

      // Reset rotation value
      rotation.setValue(0)

      // Hide refresh indicator after a delay
      setTimeout(() => {
        Animated.timing(refreshIndicatorPosition, {
          toValue: -REFRESH_HEIGHT,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setRefreshState("idle")
        })
      }, 1000) // Show "Refresh complete" for 1 second
    }
  }

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only activate when scrolled to the top and pulling down
        return scrollY._value === 0 && gestureState.dy > 5 && !refreshing
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0 && !refreshing) {
          const pullDistance = Math.min(gestureState.dy * 0.5, MAX_PULL_DISTANCE)
          refreshIndicatorPosition.setValue(pullDistance - REFRESH_HEIGHT)
          rotation.setValue(pullDistance * 2)

          if (pullDistance >= MAX_PULL_DISTANCE && refreshState !== "ready") {
            setRefreshState("ready")
          } else if (pullDistance < MAX_PULL_DISTANCE && refreshState !== "pulling") {
            setRefreshState("pulling")
          }
        }
      },
      onPanResponderRelease: () => {
        if (refreshState === "ready") {
          setRefreshState("refreshing")
          Animated.timing(refreshIndicatorPosition, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start()

          // Start rotation animation
          Animated.loop(
            Animated.timing(rotation, {
              toValue: 360,
              duration: 1000,
              useNativeDriver: true,
            }),
          ).start()

          // Call the refresh function
          onRefresh()
            .then(() => {
              // The refreshing prop will be set to false by the parent component
              // which will trigger the effect above to complete the animation
            })
            .catch(() => {
              // Handle error case
              setRefreshState("idle")
              Animated.timing(refreshIndicatorPosition, {
                toValue: -REFRESH_HEIGHT,
                duration: 300,
                useNativeDriver: true,
              }).start()
            })
        } else {
          // If not ready to refresh, just hide the indicator
          Animated.timing(refreshIndicatorPosition, {
            toValue: -REFRESH_HEIGHT,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setRefreshState("idle")
          })
        }
      },
    }),
  ).current

  const onScroll = useCallback(
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: false,
      listener: (event) => {
        // Additional scroll handling if needed
      },
    }),
    [],
  )

  const spin = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  })

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.refreshContainer,
          {
            transform: [{ translateY: refreshIndicatorPosition }, { rotate: spin }],
          },
        ]}
      >
        <View style={styles.refreshIcon}>
          <Text style={styles.refreshIconText}>↻</Text>
        </View>
        <Text style={styles.refreshText}>
          {refreshState === "pulling" && "Pull to refresh"}
          {refreshState === "ready" && "Release to refresh"}
          {refreshState === "refreshing" && "Refreshing..."}
          {refreshState === "complete" && "Refresh complete"}
        </Text>
      </Animated.View>

      <ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
        onScroll={onScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        {...panResponder.panHandlers}
      >
        {children}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  refreshContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: REFRESH_HEIGHT,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    zIndex: 10,
  },
  refreshIcon: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  refreshIconText: {
    fontSize: 20,
    color: "#f03e3e",
  },
  refreshText: {
    color: "#666",
    fontSize: 14,
  },
})

export default PullToRefresh
