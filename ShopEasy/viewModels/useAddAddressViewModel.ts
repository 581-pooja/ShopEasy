import axios from "axios";
import { useState, useContext } from "react";
import { UserType } from "../UserContext";

export const useAddAddressViewModel = () => {
    // State management
  const [addresses, setAddresses] = useState([]);
  const { userId } = useContext(UserType);

  // Business Logic - Fetch addresses API call
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/addresses/${userId}`
      );
      const { addresses } = response.data;
      setAddresses(addresses);
      return { success: true, addresses };
    } catch (error) {
      console.log("error: ", error);
      return { success: false, error };
    }
  };

  return {
    addresses,
    fetchAddresses,
  };
};