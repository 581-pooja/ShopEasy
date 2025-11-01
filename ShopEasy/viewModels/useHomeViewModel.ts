// viewModels/useHomeViewModel.ts
import axios from "axios";
import { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { UserType } from "../UserContext";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAddress as setSelectedAddressAction } from "../redux/CartReducer";
import { Address, Product } from "../types";
import { RootState } from "../store";


export const useHomeViewModel = () => {
  const { userId, setUserId } = useContext(UserType);
  const [products, setProducts] = useState<Product[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const selectedAddress = useSelector((state: RootState) => state.cart.selectedAddress as Address | null);
  const dispatch = useDispatch();
  const SELECTED_ADDRESS_KEY = "@selected_address";

  const initializeUser = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) return;
      const decoded: any = jwtDecode(token);
      setUserId(decoded?.userId);
    } catch (e) {
      console.log("initializeUser error", e);
    }

    // hydrate previously selected address
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

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data || []);
      return { success: true };
    } catch (error) {
      console.log("fetchProducts error", error);
      return { success: false, error };
    }
  };

  const fetchAddresses = async () => {
    if (!userId) return { success: false, error: "no-user" };
    try {
      const response = await axios.get(`http://localhost:8000/addresses/${userId}`);
      const { addresses } = response.data;
      setAddresses(addresses || []);
      return { success: true, data: addresses };
    } catch (error) {
      console.log("fetchAddresses error: ", error);
      return { success: false, error };
    }
  };

  const setSelectedAddress = async (address: any) => {
    // update redux
    dispatch(setSelectedAddressAction(address));
    // persist
    try {
      await AsyncStorage.setItem(SELECTED_ADDRESS_KEY, JSON.stringify(address));
    } catch (e) {
      console.log("persist selected address error", e);
    }
  };

  return {
    // state
    userId,
    products,
    addresses,
    selectedAddress,
    // setters
    setSelectedAddress,
    // actions
    initializeUser,
    fetchProducts,
    fetchAddresses,
  };
};
