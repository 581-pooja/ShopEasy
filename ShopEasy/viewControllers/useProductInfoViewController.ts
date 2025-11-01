import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";

export const useProductInfoViewController = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  // UI state management
  const [addedToCart, setAddedToCart] = useState(false);
  
  // UI Logic - Get cart state
  const cart = useSelector((state) => state.cart.cart);

  // UI Logic - Handle back button press
  const handleBackPress = () => {
    navigation.goBack();
  };

  // UI Logic - Handle add to cart button press
  const handleAddToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    
    // UI timing logic - Reset button state after 60 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  // UI Logic - Handle buy now button press
  const handleBuyNow = () => {
    // Add navigation logic here if needed
    console.log("Buy Now pressed");
  };

  return {
    // Route data
    route,
    
    // UI state
    addedToCart,
    cart,
    
    // UI actions
    handleBackPress,
    handleAddToCart,
    handleBuyNow,
  };
};
