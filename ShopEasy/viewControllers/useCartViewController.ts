import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, incrementQuantity, removeFromCart } from "../redux/CartReducer";

export const useCartViewController = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    // UI State - Get cart from Redux store
    const cart = useSelector((state) => state.cart.cart);

    // UI Logic - Calculate total price
    const total = cart
        ?.map((item) => item.price * item.quantity)
        .reduce((curr, prev) => curr + prev, 0);


    // UI Logic - Check if cart has items
    const hasCartItems = cart && cart.length > 0;

    // UI Logic - Handle increase quantity button press
    const handleIncreaseQuantity = (item) => {
        dispatch(incrementQuantity(item));
    };

    // UI Logic - Handle decrease quantity button press  
    const handleDecreaseQuantity = (item) => {
        if (item && item.id) {
            dispatch(decrementQuantity(item));
        } else {
            console.error(" Item or item.id is undefined:", item);
        }
    };
    // UI Logic - Handle delete item button press
    const handleDeleteItem = (item) => {
        dispatch(removeFromCart(item));
    };

    // UI Logic - Handle continue shopping button press
    const handleContinueShopping = () => {
        navigation.navigate("Home");
    };

    // UI Logic - Handle proceed to buy button press
    const handleProceedToBuy = () => {
        navigation.navigate("Confirm");
    };

    return {
        // State
        cart,
        total: total || 0,
        hasCartItems,
        // UI actions
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        handleDeleteItem,
        handleContinueShopping,
        handleProceedToBuy,
    };
};