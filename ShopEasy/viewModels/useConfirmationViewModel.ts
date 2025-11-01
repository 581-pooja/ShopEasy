import axios from "axios";
import { useState, useContext } from "react";
import { UserType } from "../UserContext";
import { useSelector, useDispatch } from "react-redux";
import { cleanCart, setSelectedAddress as setSelectedAddressAction } from "../redux/CartReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Address } from "../types";
import type { RootState } from "../store";

export const useConfirmationViewModel = () => {
  // State management
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { userId } = useContext(UserType);
  const dispatch = useDispatch();
  const SELECTED_ADDRESS_KEY = "@selected_address";
  
  // Redux state
  const cart = useSelector((state: RootState) => state.cart.cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const selectedAddress = useSelector((state: RootState) => state.cart.selectedAddress);

  // Business Logic - Fetch addresses API call
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/addresses/${userId}`
      );
      const { addresses } = response.data;
      console.log("Addresses: ", addresses);
      setAddresses(addresses);
      return { success: true, data: addresses };
    } catch (error) {
      console.log("error: ", error);
      return { success: false, error };
    }
  };

  // Business Logic - Place order API call
  const placeOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: selectedPaymentMethod,
      };

      const response = await axios.post(
        "http://localhost:8000/orders",
        orderData
      );
      
      if (response.status === 200) {
        dispatch(cleanCart());
        console.log("order created successfully", response.data.order);
        return { success: true, order: response.data.order };
      } else {
        console.log("error creating order", response.data);
        return { success: false, error: response.data };
      }
    } catch (error) {
      console.log("error", error);
      return { success: false, error };
    }
  };

  const setSelectedAddress = (address: any) => {
    dispatch(setSelectedAddressAction(address));
  };

  const hydrateSelectedAddress = async () => {
    try {
      const raw = await AsyncStorage.getItem(SELECTED_ADDRESS_KEY);
      if (raw) {
        const addr = JSON.parse(raw);
        dispatch(setSelectedAddressAction(addr));
      }
    } catch (e) {
      console.log("hydrate selected address error", e);
    }
  };

  return {
    // State
    addresses,
    selectedAddress,
    selectedPaymentMethod,
    cart,
    total,
    userId,
    
    // State setters
    setAddresses,
    setSelectedAddress,
    setSelectedPaymentMethod,
    
    // Business logic functions
    fetchAddresses,
    placeOrder,
    hydrateSelectedAddress,
  };
};