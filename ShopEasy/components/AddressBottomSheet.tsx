// components/AddressBottomSheet.tsx
import React from "react";
import { Animated, Pressable, ScrollView, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Address } from "../types";

type Props = {
  visible: boolean;
  slideAnim: Animated.Value;
  addresses: Address[];
  selectedAddress: Address | null;
  onSelectAddress: (addr: Address) => void;
  onAddAddress: () => void;
  onClose: () => void;
};

const AddressBottomSheet: React.FC<Props> = ({
  visible,
  slideAnim,
  addresses,
  selectedAddress,
  onSelectAddress,
  onAddAddress,
  onClose,
}) => {
  if (!visible) return null;
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
      }}
    >
      <Pressable
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        onPress={onClose}
      >
        <Animated.View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 20,
            paddingVertical: 20,
            minHeight: 400,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <View
            style={{
              width: 40,
              height: 4,
              backgroundColor: "#ddd",
              borderRadius: 2,
              alignSelf: "center",
              marginBottom: 15,
            }}
          />
          <Pressable
            onPress={onClose}
            style={{
              position: "absolute",
              top: 15,
              right: 15,
              padding: 5,
              zIndex: 1,
            }}
          >
            <Text style={{ fontSize: 24, color: "#666" }}>×</Text>
          </Pressable>

          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Choose Your Location
            </Text>
            <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
              Select a delivery location to see product availabilty and delivery options
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {addresses?.map((item) => (
              <Pressable
                onPress={() => onSelectAddress(item)}
                key={item._id}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor: selectedAddress === item ? "#FBCEB1" : "white",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {item?.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>
                <Text numberOfLines={1} style={{ width: 130, fontSize: 13, textAlign: "center" }}>
                  {item?.houseNo}, {item?.landmark}
                </Text>
                <Text numberOfLines={1} style={{ width: 130, fontSize: 13, textAlign: "center" }}>
                  {item?.street}
                </Text>
                <Text numberOfLines={1} style={{ width: 130, fontSize: 13, textAlign: "center" }}>
                  {item?.postalCode}
                </Text>
                <Text numberOfLines={1} style={{ width: 130, fontSize: 13, textAlign: "center" }}>
                  {item?.mobileNo}
                </Text>
                <Text>India, Mumbai</Text>
              </Pressable>
            ))}

            <Pressable
              onPress={onAddAddress}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#0066b2",
                  fontWeight: "500",
                }}
              >
                Add an Address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <Entypo name="location-pin" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Enter an Indian pincode
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <Ionicons name="locate-sharp" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Use My Current location
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <AntDesign name="earth" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Deliver outside India
              </Text>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default AddressBottomSheet;