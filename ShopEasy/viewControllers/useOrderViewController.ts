import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export const useOrderViewController = () => {
  const navigation = useNavigation();

  // UI Logic - Auto navigate after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Main");
    }, 1300);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, [navigation]);

  return {
    // No state or handlers needed for this simple screen
  };
};