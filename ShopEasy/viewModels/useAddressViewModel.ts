import { useContext, useState } from "react";
import { UserType } from "../UserContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export const useAddressViewModel = () => {
    // State management
    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const { userId, setUserId } = useContext(UserType);

    // Business Logic - Fetch user ID from token
    const fetchUser = async () => {
        try {
            const token = await AsyncStorage.getItem("authToken");
            if (token) {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId;
                setUserId(userId);
                return userId;
            }
            return null;
        } catch (error) {
            console.log("Error fetching user:", error);
            return null;
        }
    };

    // Business Logic - Form validation
    const isFormValid = () => {
        return (
            name.trim().length > 0 &&
            mobileNo.trim().length > 0 &&
            houseNo.trim().length > 0 &&
            street.trim().length > 0 &&
            landmark.trim().length > 0 &&
            postalCode.trim().length > 0
        );
    };

      // Business Logic - Add address API call
  const handleAddAddress = async () => {
    const address = {
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      postalCode,
    };

    try {
      const response = await axios.post("http://localhost:8000/addresses", {
        userId,
        address,
      });

      // Clear form on success
      setName("");
      setMobileNo("");
      setHouseNo("");
      setStreet("");
      setLandmark("");
      setPostalCode("");

      return {
        success: true,
        message: "Address added successfully",
      };
    } catch (error) {
      console.log("error", error);
      return {
        success: false,
        error: "Failed to add address",
      };
    }
  };

   // Return everything that the ViewController needs
   return {
    // State
    name,
    mobileNo,
    houseNo,
    street,
    landmark,
    postalCode,
    userId,

    // State setters
    setName,
    setMobileNo,
    setHouseNo,
    setStreet,
    setLandmark,
    setPostalCode,

    // Business logic functions
    handleAddAddress,
    fetchUser,
    isFormValid,
  };
};