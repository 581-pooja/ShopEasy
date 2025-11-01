import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SearchBar from "../components/SearchBar";
import { useConfirmationViewController } from "../viewControllers/useConfirmationViewController";

const ConfirmationScreen = () => {

  const {
    // data
    addresses,
    selectedAddress,
    selectedPaymentMethod,
    cart,
    total,
    // UI State
    currentStep,
    option,
    steps,
    // Actions
    handleBackPress,
    handleAddressSelect,
    handleContinueToOrder,
    handlePlaceOrder,
    handleDeliverToAddress,
    handleDeliveryOptionToggle,
    handlePaymentMethodSelect,
    handleContinueToPayment,
  } = useConfirmationViewController();

  return (
    <>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "ios" ? 0 : 40,
        }}
      >
        <ScrollView>
          <SearchBar showBackButton={true} onBackPress={handleBackPress} />
          <View style={{ flex: 1, marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
                justifyContent: "space-around",
              }}
            >
              {steps?.map((step, index) => (
                <View
                  key={index}
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  {/* Style & tick Mark & Step No */}
                  <View
                    style={[
                      {
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        backgroundColor: "#ccc",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      index < currentStep && { backgroundColor: "green" },
                    ]}
                  >
                    {index < currentStep ? (
                      // Tick Mark will Come
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        &#10003;
                      </Text>
                    ) : (
                      // Step No will come
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        {index + 1}
                      </Text>
                    )}
                  </View>
                  <Text style={{ textAlign: "center", marginTop: 8 }}>
                    {step.title}
                  </Text>
                </View>
              ))}
            </View>

            {currentStep == 0 && (
              <View style={{ marginHorizontal: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Select Delivery Address
                </Text>

                <View>
                  {addresses?.map((item, index) => (
                    <Pressable
                      key={index}
                      style={{
                        borderWidth: 1,
                        borderColor: "#D0D0D0",
                        padding: 10,
                        flexDirection: "row",
                        gap: 5,
                        paddingBottom: 17,
                        marginVertical: 7,
                        alignItems: "center",
                        borderRadius: 6,
                      }}
                    >
                      {selectedAddress && selectedAddress._id === item?._id ? (
                        <FontAwesome5
                          name="dot-circle"
                          size={20}
                          color="#008397"
                        />
                      ) : (
                        <Entypo
                          onPress={() => handleAddressSelect(item)}
                          name="circle"
                          size={20}
                          color="black"
                        />
                      )}
                      <View style={{ marginLeft: 6 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 3,
                          }}
                        >
                          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                            {item?.name}
                          </Text>
                          <Entypo name="location-pin" size={24} color="red" />
                        </View>
                        <Text style={{ fontSize: 15, color: "#181818" }}>
                          {item?.houseNo}, {item?.landmark}
                        </Text>
                        <Text style={{ fontSize: 15, color: "#181818" }}>
                          {item?.street}
                        </Text>
                        <Text style={{ fontSize: 15, color: "#181818" }}>
                          India, Mumbai
                        </Text>
                        <Text style={{ fontSize: 15, color: "#181818" }}>
                          Phone No : {item?.mobileNo}
                        </Text>
                        <Text style={{ fontSize: 15, color: "#181818" }}>
                          Pin Code : {item?.postalCode}
                        </Text>
                        {/* All edit & Remove Pressables */}
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 10,
                            marginTop: 7,
                            alignItems: "center",
                          }}
                        >
                          <Pressable
                            style={{
                              backgroundColor: "#F5F5F5",
                              paddingHorizontal: 10,
                              paddingVertical: 6,
                              borderRadius: 5,
                              borderWidth: 0.9,
                              borderColor: "#D0D0D0",
                            }}
                          >
                            <Text>Edit</Text>
                          </Pressable>

                          <Pressable
                            style={{
                              backgroundColor: "#F5F5F5",
                              paddingHorizontal: 10,
                              paddingVertical: 6,
                              borderRadius: 5,
                              borderWidth: 0.9,
                              borderColor: "#D0D0D0",
                            }}
                          >
                            <Text>Remove</Text>
                          </Pressable>

                          <Pressable
                            style={{
                              backgroundColor: "#F5F5F5",
                              paddingHorizontal: 10,
                              paddingVertical: 6,
                              borderRadius: 5,
                              borderWidth: 0.9,
                              borderColor: "#D0D0D0",
                            }}
                          >
                            <Text>Set as Default</Text>
                          </Pressable>
                        </View>
                        {/* Deliver to This Address Button */}
                        <View>
                          {selectedAddress &&
                            selectedAddress._id === item?._id && (
                              <Pressable
                                onPress={() => handleDeliverToAddress()}
                                style={{
                                  backgroundColor: "#008397",
                                  padding: 10,
                                  borderRadius: 20,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  marginTop: 10,
                                  width: 300,
                                }}
                              >
                                <Text
                                  style={{
                                    textAlign: "center",
                                    color: "white",
                                  }}
                                >
                                  Deliver to this Address
                                </Text>
                              </Pressable>
                            )}
                        </View>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}

            {currentStep == 1 && (
              <View style={{ marginHorizontal: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Choose your delivery options
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 7,
                    padding: 8,
                    backgroundColor: "white",
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    marginTop: 10,
                  }}
                >
                  {option ? (
                    <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                  ) : (
                    <Entypo
                      onPress={handleDeliveryOptionToggle}
                      name="circle"
                      size={20}
                      color="gray"
                    />
                  )}
                  <Text style={{ flex: 1 }}>
                    <Text style={{ color: "green", fontWeight: "500" }}>
                      {" "}
                      Tomorrow by 10PM{" "}
                    </Text>
                    - FREE delivery with your Prime membership
                  </Text>
                </View>

                <Pressable
                  onPress={handleContinueToPayment}
                  style={{
                    backgroundColor: "#FFC72C",
                    padding: 10,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15,
                  }}
                >
                  <Text>Continue</Text>
                </Pressable>
              </View>
            )}

            {currentStep === 2 && (
              <View style={{ marginHorizontal: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Select your payment Method
                </Text>
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 8,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 7,
                    marginTop: 12,
                  }}
                >
                  {selectedPaymentMethod === "cash" ? (
                    <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                  ) : (
                    <Entypo
                      onPress={() => handlePaymentMethodSelect("cash")}
                      name="circle"
                      size={20}
                      color="gray"
                    />
                  )}
                  <Text>Cash on Delivery</Text>
                </View>

                <View
                  style={{
                    backgroundColor: "white",
                    padding: 8,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 7,
                    marginTop: 12,
                  }}
                >
                  {selectedPaymentMethod === "card" ? (
                    <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                  ) : (
                    <Entypo
                      onPress={() => handlePaymentMethodSelect("card")}
                      name="circle"
                      size={20}
                      color="gray"
                    />
                  )}
                  <Text>UPI / Credit or debit card</Text>
                </View>

                <Pressable
                  onPress={handleContinueToOrder}
                  style={{
                    backgroundColor: "#FFC72C",
                    padding: 10,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15,
                  }}
                >
                  <Text>Continue</Text>
                </Pressable>
              </View>
            )}

            {currentStep === 3 && selectedPaymentMethod === "cash" && (
              <View style={{ marginHorizontal: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Order Now
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                    backgroundColor: "white",
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    marginTop: 10,
                    padding: 8,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 17, color: "bold" }}>
                      Save 5% and never run out
                    </Text>
                    <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
                      Turn on auto deliveries
                    </Text>
                  </View>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="black"
                  />
                </View>
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 8,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    marginTop: 10,
                  }}
                >
                  <Text>Shipping to {selectedAddress?.name}</Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 8,
                    }}
                  >
                    <Text
                      style={{ fontSize: 16, fontWeight: "500", color: "gray" }}
                    >
                      Items
                    </Text>
                    <Text
                      style={{ fontSize: 16, fontWeight: "500", color: "gray" }}
                    >
                      ₹{total}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 8,
                    }}
                  >
                    <Text
                      style={{ fontSize: 16, fontWeight: "500", color: "gray" }}
                    >
                      Deivery
                    </Text>
                    <Text
                      style={{ fontSize: 16, fontWeight: "500", color: "gray" }}
                    >
                      ₹0
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 8,
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      Order Total
                    </Text>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "bold",
                        color: "#C60C30",
                      }}
                    >
                      ₹{total}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "white",
                      padding: 8,
                      borderColor: "#D0D0D0",
                      borderWidth: 1,
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ fontSize: 16, color: "gray" }}>
                      Pay With
                    </Text>

                    <Text
                      style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}
                    >
                      Pay on delivery (Cash)
                    </Text>
                  </View>

                  <Pressable
                    onPress={handlePlaceOrder}
                    style={{
                      backgroundColor: "#FFC72C",
                      padding: 10,
                      borderRadius: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 20,
                    }}
                  >
                    <Text>Place your order</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default ConfirmationScreen;

const styles = StyleSheet.create({});
