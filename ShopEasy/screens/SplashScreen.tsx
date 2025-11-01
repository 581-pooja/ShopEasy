import React, { useEffect, useRef } from "react";
import { View, Image, StyleSheet, StatusBar, Animated, Easing, ActivityIndicator, Platform } from "react-native";

/**
 * SplashScreen.tsx
 *
 * A lightweight, production-ready splash screen component.
 * - Fades & scales the logo in
 * - Holds for a moment, then fades out and calls `onFinish()`
 * - Works well while your app initializes (fonts, API, auth, etc.)
 *
 * Usage:
 * <SplashScreen onFinish={() => navigation.replace('Home')} />
 */
export default function SplashScreen({ onFinish, holdMs = 700, durationMs = 900 }: {
  onFinish?: () => void;
  /** How long (ms) to hold after the animation finishes */
  holdMs?: number;
  /** Duration (ms) of the fade/scale animation */
  durationMs?: number;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: durationMs,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        bounciness: 10,
        speed: 7,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Optional hold, then finish
      const t = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 420,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }).start(() => {
          onFinish?.();
        });
      }, holdMs);
      return () => clearTimeout(t);
    });
  }, [durationMs, holdMs, onFinish, opacity, scale]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Background brand gradient substitute (solid color for simplicity). */}
      <View style={styles.bg} />

      {/* Logo wrapper */}
      <Animated.View style={[styles.center, { opacity, transform: [{ scale }] }]}>        
        <Image
          source={{
            uri: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo-2000.png",
          }}
          style={styles.logo}
          resizeMode="contain"
          accessible
          accessibilityLabel="Amazon logo"
        />
        <ActivityIndicator style={styles.spinner} size="small" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0c10", // deep background to make the logo pop
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0b0c10",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logo: {
    width: 240,
    height: 120,
    marginBottom: 16,
  },
  spinner: {
    marginTop: 8,
  },
});

/**
 * --- Integration tips ---
 *
 * 1) If you want an *actual native* splash (shows instantly at app start), use:
 *    - `expo-splash-screen` (Expo) or `react-native-bootsplash` (bare RN)
 *    - Those require a local image asset (download the logo and add to assets), not a remote URL
 *
 * 2) For a quick in-app splash while loading data, render this first in App.tsx:
 *
 *    const [ready, setReady] = useState(false);
 *    useEffect(() => { (async () => { await bootstrap(); setReady(true); })(); }, []);
 *    return ready ? <RootNavigator/> : <SplashScreen onFinish={() => setReady(true)} />;
 *
 * 3) Prefer bundling the logo locally for reliability (& offline):
 *    <Image source={require('./assets/amazon-logo.png')} />
 *
 * 4) If you need a gradient background, wrap container with react-native-linear-gradient.
 *
 * 5) To keep splash visible until work finishes, remove the fade-out and call `onFinish()` when ready.
 */
