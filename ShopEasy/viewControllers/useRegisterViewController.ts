import { useNavigation } from "@react-navigation/native";
import { useRegisterViewModel } from "../viewModels/useRegisterViewModel";
import { Alert } from "react-native";

export const useRegisterViewController = () => {
    const navigation = useNavigation();
    const registerViewModel = useRegisterViewModel();

    // UI Logic - Handle register button press
    const handleRegisterPress = async () => {
        if (!registerViewModel.isFormValid()) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        const result = await registerViewModel.handleRegister();
        if (result.success) {
            // UI feedback for success
            Alert.alert("Registration Successful", result.message);
            // Note: Form is already cleared in ViewModel
            // After successful registration, navigate to HomeScreen
        } else {
            // UI feedback for error
            Alert.alert("Registration Error", result.error);
        }
    };


    // UI Logic - Handle navigation to login
    const handleLoginPress = () => {
        navigation.navigate("Login");
    };

    // UI Logic - Handle name text change
    const handleNameChange = (text) => {
        registerViewModel.setName(text);
    };

    // UI Logic - Handle email text change
    const handleEmailChange = (text) => {
        registerViewModel.setEmail(text);
    };

    // UI Logic - Handle password text change
    const handlePasswordChange = (text) => {
        registerViewModel.setPassword(text);
    };

    return {
        // State from ViewModel
        name: registerViewModel.name,
        email: registerViewModel.email,
        password: registerViewModel.password,

        // Event Handlers
        handleRegisterPress,
        handleLoginPress,
        handleNameChange,
        handleEmailChange,
        handlePasswordChange,
    }
}