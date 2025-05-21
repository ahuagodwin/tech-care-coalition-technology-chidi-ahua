"use client"

import { PressAnimationResult } from "@/types/type"
import { useRef, useEffect } from "react"
import { Animated, Easing } from "react-native"

export const useFadeIn = (duration = 500, delay = 0) => {
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start()
  }, [opacity, duration, delay])

  return opacity
}

export const useSlideIn = (direction = "up", distance = 20, duration = 500, delay = 0) => {
  const translateY = useRef(new Animated.Value(direction === "up" ? distance : -distance)).current
  const translateX = useRef(new Animated.Value(direction === "left" ? distance : -distance)).current

  useEffect(() => {
    Animated.timing(direction === "up" || direction === "down" ? translateY : translateX, {
      toValue: 0,
      duration,
      delay,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start()
  }, [translateY, translateX, direction, duration, delay])

  return direction === "up" || direction === "down" ? { transform: [{ translateY }] } : { transform: [{ translateX }] }
}

export const useScale = (startScale = 0.95, duration = 300, delay = 0) => {
  const scale = useRef(new Animated.Value(startScale)).current

  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
      easing: Easing.elastic(1),
    }).start()
  }, [scale, duration, delay])

  return { transform: [{ scale }] }
}

export const usePressAnimation = (): PressAnimationResult => {
  const scale = useRef(new Animated.Value(1)).current

  const onPressIn = () => {
    Animated.timing(scale, {
      toValue: 0.97,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start()
  }

  const onPressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start()
  }

  return {
    transform: [{ scale }],
    onPressIn,
    onPressOut,
  }
}

export const useSequencedFadeIn = (itemCount: number, baseDuration = 300, staggerDelay = 50) => {
  return Array.from({ length: itemCount }).map((_, index) => {
    return useFadeIn(baseDuration, index * staggerDelay)
  })
}
