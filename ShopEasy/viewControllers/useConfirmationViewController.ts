import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useConfirmationViewModel } from "../viewModels/useConfirmationViewModel";

export const useConfirmationViewController = () => {
  const navigation = useNavigation();
  const viewModel = useConfirmationViewModel();
  
  // UI State
  const [currentStep, setCurrentStep] = useState(0);
  const [option, setOption] = useState(false);
  
  // Steps configuration
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery From" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];

  // UI Logic - Fetch addresses on component mount
  useEffect(() => {
    viewModel.fetchAddresses();
    viewModel.hydrateSelectedAddress();
  }, []);

  // UI Logic - Handle back button press
  const handleBackPress = () => {
    navigation.goBack();
  };

  // UI Logic - Handle address selection
  const handleAddressSelect = (address) => {
    viewModel.setSelectedAddress(address);
  };

  // UI Logic - Handle delivery step navigation
  const handleDeliverToAddress = () => {
    setCurrentStep(1);
  };

  // UI Logic - Handle delivery option toggle
  const handleDeliveryOptionToggle = () => {
    setOption(!option);
  };

  // UI Logic - Handle continue to payment
  const handleContinueToPayment = () => {
    setCurrentStep(2);
  };

  // UI Logic - Handle payment method selection
  const handlePaymentMethodSelect = (method) => {
    viewModel.setSelectedPaymentMethod(method);
  };

  // UI Logic - Handle continue to order review
  const handleContinueToOrder = () => {
    setCurrentStep(3);
  };

  // UI Logic - Handle place order button press
  const handlePlaceOrder = async () => {
    const result = await viewModel.placeOrder();
    if (result.success) {
      navigation.navigate("Order");
    } else {
      // Handle error - could show alert here
      console.log("Order placement failed:", result.error);
    }
  };



  return {
    // ViewModel data
    addresses: viewModel.addresses,
    selectedAddress: viewModel.selectedAddress,
    selectedPaymentMethod: viewModel.selectedPaymentMethod,
    cart: viewModel.cart,
    total: viewModel.total,
    
    // UI state
    currentStep,
    option,
    steps,
    
    // UI actions
    handleBackPress,
    handleAddressSelect,
    handleDeliverToAddress,
    handleDeliveryOptionToggle,
    handleContinueToPayment,
    handlePaymentMethodSelect,
    handleContinueToOrder,
    handlePlaceOrder,
  };
};