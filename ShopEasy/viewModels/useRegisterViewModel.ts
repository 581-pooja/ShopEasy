import axios from "axios";
import { useState } from "react";

export const useRegisterViewModel = () => {
    // State Manag
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    // Business Logic - Register API Call
    const handleRegister = async () => {
        const user = {
            name: name,
            email: email,
            password: password,
        };
        try {
            const response = await axios.post("http://localhost:8000/register", user);
            console.log(response);

            // Clear form on success
            setName("");
            setEmail("");
            setPassword("");

            // Return success to controller
            return {
                success: true,
                message: "You have been registered successfully"
            };
        } catch (error) {
            console.log("Registration Error:", error);

            // Return error to controller
            return {
                success: false,
                error: "An error occurred during registration"
            };
        }
    };

    // Business Logic - Form validation
    const isFormValid = () => {
        return name.trim().length > 0 &&
            email.trim().length > 0 &&
            password.trim().length > 0;
    };

    return {
        // State
        name,
        email,
        password,

        // State setters
        setName,
        setEmail,
        setPassword,

        // Business logic functions
        handleRegister,
        isFormValid,
    };
};
