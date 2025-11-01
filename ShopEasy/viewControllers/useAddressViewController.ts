import { useNavigation } from "@react-navigation/native";
import { useAddressViewModel } from "../viewModels/useAddressViewModel";
import { useEffect } from "react";
import { Alert } from "react-native";

export const useAddressViewController = () => {
    const navigation = useNavigation();
    const viewModel = useAddressViewModel();

    // UI Logic - Fetch user on component mount (from useEffect in AddressScreen)
    useEffect(() => {
        viewModel.fetchUser();
    }, []);

    // UI Logic - Handle add address button press (from handleAddAddress in AddressScreen)
    const handleAddAddressPress = async () => {
        // Add form validation check BEFORE calling ViewModel
        if (!viewModel.isFormValid()) {
            Alert.alert("Error", "Please fill in all fields");
            return; // Stop execution if form is invalid
        }
        const result = await viewModel.handleAddAddress();

        if (result.success) {
            // UI feedback for success (from .then in AddressScreen)
            Alert.alert("Success", result.message);

            // Navigation logic (from setTimeout in AddressScreen)
            setTimeout(() => {
                navigation.goBack();
            }, 500);
        } else {
            // UI feedback for error (from .catch in AddressScreen)
            Alert.alert("Error", result.error);
        }
    };

    // UI Logic - Handle back button press (from onBackPress in AddressScreen)
    const handleBackPress = () => {
        navigation.goBack();
    };

    // UI Logic - Handle text input changes (from onChangeText in AddressScreen)
    const handleNameChange = (text) => {
        viewModel.setName(text);
    };

    const handleMobileChange = (text) => {
        viewModel.setMobileNo(text);
    };

    const handleHouseNoChange = (text) => {
        viewModel.setHouseNo(text);
    };

    const handleStreetChange = (text) => {
        viewModel.setStreet(text);
    };

    const handleLandmarkChange = (text) => {
        viewModel.setLandmark(text);
    };

    const handlePostalCodeChange = (text) => {
        viewModel.setPostalCode(text);
    };

    // Return everything the View needs
  return {
    // State from ViewModel
    name: viewModel.name,
    mobileNo: viewModel.mobileNo,
    houseNo: viewModel.houseNo,
    street: viewModel.street,
    landmark: viewModel.landmark,
    postalCode: viewModel.postalCode,

    // Event handlers
    handleAddAddressPress,
    handleBackPress,
    handleNameChange,
    handleMobileChange,
    handleHouseNoChange,
    handleStreetChange,
    handleLandmarkChange,
    handlePostalCodeChange,
  };
};