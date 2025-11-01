import {
  View,
  Text,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLoginViewController } from "../viewControllers/useLoginViewController";

const LoginScreen = () => {
  // Use the ViewController instead of direct state/logic
  const {
    email,
    password,
    handleLoginPress,
    handleRegisterPress,
    handleEmailChange,
    handlePasswordChange,
  } = useLoginViewController();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >

      {/* ShopEasy Logo */}
      <View style={{ marginTop: 80, alignItems: "center" }}>
        <Text
          style={{
            fontSize: 42,
            fontWeight: "900",
            letterSpacing: 1,
            textTransform: "none",
            textShadowColor: "rgba(0,0,0,0.2)",
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 3,
            transform: [{ skewX: "-5deg" }],
          }}
        >
          <Text style={{ color: "#00CED1" }}>Shop</Text>
          <Text style={{ color: "#232F3E" }}>Easy</Text>
        </Text>
        <View
          style={{
            height: 4,
            width: 100,
            backgroundColor: "#00CED1",
            borderRadius: 2,
            marginTop: 6,
          }}
        />
      </View>

      <KeyboardAvoidingView>
        {/* Screen Purpose: Login In to Your Account */}
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "#041E42",
              marginTop: 70,
            }}
          >
            Login In to Your Account
          </Text>
        </View>

        {/* Textfield : Enter Your Email */}
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email} // prop
              onChangeText={handleEmailChange}
              autoCapitalize="none"
              style={{
                color: "black",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 16 : 16,
                paddingRight: 10,
              }}
              placeholder="Enter your Email"
            />
          </View>
        </View>

        {/* Textfield : Enter Your Password */}
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <Ionicons
              style={{ marginLeft: 8 }}
              name="lock-closed-sharp"
              size={24}
              color="gray"
            />
            <TextInput
              value={password}
              // onChangeText={(text) => setPassword(text)}
              onChangeText={handlePasswordChange}
              secureTextEntry={true}
              autoCapitalize="none"
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
                paddingRight: 10,
              }}
              placeholder="Enter your Password"
            />
          </View>
        </View>

        {/* Keep me LoggedIn & Forgot Password Tag */}
        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>Keep me logged in</Text>
          <Text style={{ color: "#007FFF", fontWeight: "500" }}>
            Forgot Password?
          </Text>
        </View>

        {/* Login Button */}
        <Pressable
          // onPress = {handleLogin}
          onPress={handleLoginPress}
          style={{
            marginTop: 80,
            width: 200,
            backgroundColor: "#FEBE10",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Login
          </Text>
        </Pressable>

        {/* Go to Register Screen */}
        <Pressable
          // onPress={() => navigation.navigate("Register")}
          onPress={handleRegisterPress}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
