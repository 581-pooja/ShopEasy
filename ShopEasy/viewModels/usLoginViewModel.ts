import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";

export const useLoginViewModel = () => {
    // state management
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Business Logic - Login API Call
    const handleLogin = async () => {
        const user = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post("http://localhost:8000/login", user);
            console.log(response);
            const token = response.data.token;
            await AsyncStorage.setItem("authToken", token);
            // Return success to controller
            return { success: true };
        } catch (error) {
            // Return error to controller
            console.log(error);
            return { success: false, error: "Invalid Email" };
        }
    };

    // Business logic - Check login status
    const checkLoginStatus = async () => {
        try {
            const token = await AsyncStorage.getItem("authToken")
            if (token) {
                return true; // Return to controller
                // navigation.replace("Main")
            }
            return false;
        } catch (err) {
            console.log("error message: ", err)
            return false;
        }
    };

    return {
        // State
        email,
        password,

        // State setters
        setEmail,
        setPassword,

        // Business logic functions
        handleLogin,
        checkLoginStatus,
    };
};