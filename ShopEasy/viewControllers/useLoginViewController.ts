import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Alert } from "react-native";
import { useLoginViewModel } from "../viewModels/usLoginViewModel";

export const useLoginViewController = () => {
    const navigation = useNavigation();
    const LoginViewModel = useLoginViewModel();

    // UI Logic - Check login status on component mount (from useEffect in LoginScreen)
    useEffect(() => {
        const checkStatus = async () => {
            const isLoggedIn = await LoginViewModel.checkLoginStatus();
            if (isLoggedIn) {
                navigation.replace("Main");
            }
        };
        checkStatus();
    }, []);

     // UI Logic - Handle login button press (from handleLogin in LoginScreen)
  const handleLoginPress = async () => {
    const result = await LoginViewModel.handleLogin();
    
    if (result.success) {
      // Navigation logic (from .then in LoginScreen)
      navigation.replace("Main");
    } else {
      // UI feedback (from .catch in LoginScreen)
      Alert.alert("Login Error", "Invalid Email");
    }
  };

   // UI Logic - Handle navigation to register (from onPress in LoginScreen)
   const handleRegisterPress = () => {
    navigation.navigate("Register");
  };

  // UI Logic - Handle email text change (from onChangeText in LoginScreen)
  const handleEmailChange = (text) => {
    LoginViewModel.setEmail(text);
  };

  // UI Logic - Handle password text change (from onChangeText in LoginScreen)
  const handlePasswordChange = (text) => {
    LoginViewModel.setPassword(text);
  };

  return {
    // State from ViewModel
    email: LoginViewModel.email,
    password: LoginViewModel.password,
    // Event Handlers
    handleLoginPress,
    handleRegisterPress,
    handleEmailChange,
    handlePasswordChange,
  }
};