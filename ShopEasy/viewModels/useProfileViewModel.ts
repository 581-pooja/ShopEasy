
import { UserType } from '../UserContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useContext, useEffect } from "react";

export const useProfileViewModel = () => {
    // State management
    const [user, setUser] = useState();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userId, setUserId } = useContext(UserType);

    // Business Logic - Fetch user profile API call
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/profile/${userId}`);
            setUser(response.data.user);
            console.log("User is: ", response.data.user.name);
            return { success: true, data: response.data.user };
        } catch (error) {
            console.log("error", error);
            return { success: false, error };
        }
    };

    // Business Logic - Fetch orders API call
    const fetchOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/orders/${userId}`);
            const orders = response.data.orders;
            setOrders(orders);
            setLoading(false);
            console.log("orders: ", orders);
            return { success: true, data: orders };
        } catch (error) {
            console.log("error", error);
            setLoading(false);
            return { success: false, error };
        }
    };

    // Business Logic - Clear auth token and logout
    const clearAuthToken = async () => {
        try {
            await AsyncStorage.removeItem("authToken");
            console.log("auth token cleared");
            setUserId(null);
            return { success: true };
        } catch (error) {
            console.log("error clearing token", error);
            return { success: false, error };
        }
    };
    return {
        // State
        user,
        orders,
        loading,
        userId,

        // State setters
        setUser,
        setOrders,
        setLoading,

        // Business logic functions
        fetchUserProfile,
        fetchOrders,
        clearAuthToken,
    };

};