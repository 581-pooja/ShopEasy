import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAddAddressViewModel } from "../viewModels/useAddAddressViewModel";
import { useCallback, useEffect } from "react";

export const useAddAddressViewController = () => {
    const navigation = useNavigation();
    const viewModel = useAddAddressViewModel();

    // UI Logic - Fetch addresses on component mount
    useEffect(() => {
        viewModel.fetchAddresses();
    }, []);

    // UI Logic - Refresh addresses when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            viewModel.fetchAddresses();
        }, [])
    );
    // reload screen when come back
    // useFocusEffect: Refresh the addresses whenever the component comes in the focus
    // refresh the addresses when the component comes to the focus i.e. basiscally when we navigate back

    // UI Logic - Handle back button press
    const handleBackPress = () => {
        navigation.goBack();
    };

    // UI Logic - Handle add new address navigation
    const handleAddNewAddress = () => {
        navigation.navigate("Add");
    };

    return {
        addresses: viewModel.addresses,
        handleBackPress,
        handleAddNewAddress,
    }
};