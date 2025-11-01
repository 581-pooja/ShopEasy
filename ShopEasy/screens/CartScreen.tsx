import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import SearchBar from "../components/SearchBar";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useCartViewController } from "../viewControllers/useCartViewController";

const CartScreen = () => {
  const { cart, total, hasCartItems, handleIncreaseQuantity, handleDecreaseQuantity, handleDeleteItem, handleContinueShopping, handleProceedToBuy } = useCartViewController();
  return (
    <>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "ios" ? 0 : 40,
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          stickyHeaderIndices={[0]}
        >
          {/* Search Bar is the first child so it will be sticky */}
          <SearchBar />
          <View
            style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
          >
            <Text style={{ fontSize: 18, fontWeight: "400" }}>Subtotal: </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {total || 0}{" "}
            </Text>
          </View>

          {hasCartItems ? (
            // if items are present in cart
            <Text style={{ marginHorizontal: 10 }}>EMI details Available</Text>
          ) : (
            <View
              style={{
                padding: 20,
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#666",
                  marginBottom: 10,
                }}
              >
                Your cart is empty
              </Text>
              <Pressable
                onPress={handleContinueShopping}
                style={{
                  backgroundColor: "#00CED1",
                  padding: 10,
                  borderRadius: 5,
                  paddingHorizontal: 20,
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Continue Shopping
                </Text>
              </Pressable>
            </View>
          )}

          <Pressable
            onPress={handleProceedToBuy}
            style={{
              backgroundColor: cart.length > 0 ? "#FFC72C" : "#CCCCCC",
              padding: 10,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
              marginTop: 10,
              opacity: cart.length > 0 ? 1 : 0.6,
            }}
            disabled={cart.length < 1}
          >
            <Text
              style={{
                color: cart.length > 0 ? "black" : "#666666",
              }}
            >
              {cart.length > 0
                ? `Proceed to Buy (${cart.length}) items`
                : "Cart is Empty"}
            </Text>
          </Pressable>

          {/* Divider */}
          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 16,
            }}
          />

          <View style={{ marginHorizontal: 0 }}>
            {cart?.map((item, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: "white",
                  marginVertical: 10,
                  borderBottomColor: "#F0F0F0",
                  borderWidth: 2,
                  borderLeftWidth: 0,
                  borderTopWidth: 0,
                  borderRightWidth: 0,
                }}
              >
                <Pressable
                  style={{
                    marginVertical: 10,
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <View style={{ marginVertical: 0, flexDirection: "row" }}>
                    <Image
                      style={{ width: 100, height: 140, resizeMode: "contain" }}
                      source={{ uri: item?.image }}
                    />
                  </View>

                  <View>
                    <Text
                      numberOfLines={3}
                      style={{ width: 200, marginTop: 10 }}
                    >
                      {item?.title}
                    </Text>

                    <Text
                      style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 }}
                    >
                      ₹ {item?.price}
                    </Text>
                    <Text style={{ color: "green" }}>In Stock</Text>
                  </View>
                </Pressable>

                <Pressable
                  style={{
                    marginTop: 15,
                    marginBottom: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 7,
                    }}
                  >
                    {/* Minus & Delete Button */}
                    {item?.quantity > 1 ? (
                      <Pressable
                        onPress={() => handleDecreaseQuantity(item)}
                        style={{
                          backgroundColor: "#D8D8D8",
                          padding: 7,
                          borderTopLeftRadius: 6,
                          borderBottomLeftRadius: 6,
                        }}
                      >
                        <AntDesign name="minus" size={24} color="black" />
                      </Pressable>
                    ) : (
                      <Pressable
                        onPress={() => handleDeleteItem(item)}
                        style={{
                          backgroundColor: "#D8D8D8",
                          padding: 7,
                          borderTopLeftRadius: 6,
                          borderBottomLeftRadius: 6,
                        }}
                      >
                        <AntDesign name="delete" size={24} color="black" />
                      </Pressable>
                    )}

                    <Pressable
                      style={{
                        backgroundColor: "white",
                        paddingHorizontal: 18,
                        paddingVertical: 6,
                      }}
                    >
                      <Text>{item?.quantity}</Text>
                    </Pressable>
                    {/* Plus Button */}
                    <Pressable
                      onPress={() => handleIncreaseQuantity(item)}
                      style={{
                        backgroundColor: "#D8D8D8",
                        padding: 7,
                        borderTopRightRadius: 6,
                        borderBottomRightRadius: 6,
                      }}
                    >
                      <Feather name="plus" size={24} color="black" />
                    </Pressable>
                  </View>
                  {/* Main Delete Button */}
                  <Pressable
                    onPress={() => handleDeleteItem(item)}
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 8,
                      paddingVertical: 10,
                      borderRadius: 5,
                      borderColor: "#C0C0C0",
                      borderWidth: 0.6,
                    }}
                  >
                    <Text>Delete</Text>
                  </Pressable>
                </Pressable>

                {/* Save For Later & See More Like this Button */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 15,
                    marginLeft: 10,
                  }}
                >
                  <Pressable
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 8,
                      paddingVertical: 10,
                      borderRadius: 5,
                      borderColor: "#C0C0C0",
                      borderWidth: 0.6,
                    }}
                  >
                    <Text>Save For Later</Text>
                  </Pressable>

                  <Pressable
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 8,
                      paddingVertical: 10,
                      borderRadius: 5,
                      borderColor: "#C0C0C0",
                      borderWidth: 0.6,
                    }}
                  >
                    <Text>See More Like this</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
