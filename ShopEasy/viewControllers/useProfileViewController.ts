import { useNavigation } from "@react-navigation/native";
import { useProfileViewModel } from "../viewModels/useProfileViewModel";
import { useEffect } from "react";

export const useProfileViewController = () => {
    const navigation = useNavigation();
    const viewModel = useProfileViewModel();

    // UI Logic - Fetch user profile on component mount
    useEffect(() => {
        viewModel.fetchUserProfile();
    }, []);

    // UI Logic - Fetch orders on component mount
    useEffect(() => {
        viewModel.fetchOrders();
    }, []);

    // UI Logic - Handle logout button press
    const handleLogout = async () => {
        const result = await viewModel.clearAuthToken();
        if (result.success) {
            navigation.replace("Login");
        }
    };

    return {
        // ViewModel data
        user: viewModel.user,
        orders: viewModel.orders,
        loading: viewModel.loading,
        // UI actions
        handleLogout,
    };
};