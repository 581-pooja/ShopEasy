import {
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  View,
  Pressable,
  Platform,
  SafeAreaView,
} from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import SearchBar from "../components/SearchBar";
import { useProductInfoViewController } from "../viewControllers/useProductInfoViewController";

const ProductInfoScreen = () => {
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100;
  
  // Use the ViewController
  const {
    route,
    addedToCart,
    cart,
    handleBackPress,
    handleAddToCart,
    handleBuyNow,
  } = useProductInfoViewController();
  
  console.log(cart);

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
          style={{ flex: 1, backgroundColor: "white" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          stickyHeaderIndices={[0]}
        >
          {/* Search Bar */}
          <SearchBar
            showBackButton={true}
            onBackPress={handleBackPress}
          />
          <ScrollView
            horizontal
            style={{ flex: 1, backgroundColor: "white" }}
            showsHorizontalScrollIndicator={false}
          >
            {route.params.carouselImages.map((item, index) => (
              <ImageBackground
                style={{ width, height, marginTop: 25, resizeMode: "contain" }}
                source={{ uri: item }}
                key={index}
              >
                {/* Offers Off & Share */}
                <View
                  style={{
                    padding: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Offers */}
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      backgroundColor: "#C60C30",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontWeight: "600",
                        fontSize: 12,
                      }}
                    >
                      20% off
                    </Text>
                  </View>
                  {/* Share */}
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      backgroundColor: "#E0E0E0",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="share-variant"
                      size={24}
                      color="black"
                    />
                  </View>
                </View>
                {/* Like */}
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    backgroundColor: "#E0E0E0",
                    marginTop: "auto",
                    marginLeft: 20,
                    marginBottom: 20,
                  }}
                >
                  <AntDesign name="hearto" size={24} color="black" />
                </View>
              </ImageBackground>
            ))}
          </ScrollView>
          {/* Name & Price & Color */}
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              {route?.params?.title}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
              ₹ {route?.params?.price}
            </Text>
          </View>
          {/* Straight Line */}
          <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />
          {/* Product Color */}
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
          >
            <Text> Color: </Text>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {route?.params?.color}
            </Text>
          </View>
          {/* Straight Line */}
          <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

          <View style={{ padding: 10 }}>
            {/* Price */}
            <Text
              style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}
            >
              Total : ₹ {route.params.price}
            </Text>
            {/* Delivery Message */}
            <Text style={{ color: "#00CED1" }}>
              FREE delivery Tomorrow by 3 PM. Order within 10hrs 30 mins
            </Text>
            {/* Delivery Address */}
            <View
              style={{
                flexDirection: "row",
                marginVertical: 5,
                alignItems: "center",
                gap: 5,
              }}
            >
              <Ionicons name="location" size={24} color="black" />
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                Deliver To Pooja - Mumbai 400081
              </Text>
            </View>
            {/* InStock Message */}
            <Text
              style={{
                color: "green",
                marginHorizontal: 10,
                fontWeight: "500",
              }}
            >
              In Stock
            </Text>

            {/* Add to Cart Button */}
            <Pressable
              onPress={() => handleAddToCart(route?.params?.item)}
              style={{
                backgroundColor: "#FFC72C",
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                marginVertical: 10,
              }}
            >
              {addedToCart ? (
                <Text>Added to Cart</Text>
              ) : (
                <Text>Add to Cart</Text>
              )}
            </Pressable>

            {/* Buy Now Button */}
            <Pressable
              onPress={handleBuyNow}
              style={{
                backgroundColor: "#FFAC1C",
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                marginVertical: 10,
              }}
            >
              <Text>Buy Now</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ProductInfoScreen;