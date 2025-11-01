import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Carousel from "react-native-reanimated-carousel";
import ProductItem from "../components/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";
import SearchBar from "../components/SearchBar";
import { useHomeViewController } from "../viewControllers/useHomeViewController";
import AddressBottomSheet from "../components/AddressBottomSheet";

const HomeScreen = () => {
  const { width } = Dimensions.get("window");

  const {
    // lists
    list,
    images,
    deals,
    offers,
    // dropdown
    open,
    category,
    items,
    setOpen,
    setCategory,
    setItems,
    onGenderOpen,
    // addresses
    addresses,
    selectedAddress,
    // modal
    modalVisible,
    slideAnim,
    showModal,
    hideModal,
    // actions
    navigateToInfo,
    navigateToAddress,
    handleSelectAddress,
    // products
    filteredProducts,
  } = useHomeViewController();

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
          {/* Search Bar */}
          <SearchBar />

          {/* Location & Address */}
          <Pressable
            onPress={showModal}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#AFEEEE",
              gap: 5,
              padding: 10,
            }}
          >
            <Ionicons name="location-outline" size={24} color="black" />
            <View>
              {selectedAddress ? (
                <Text>
                  Deliver to {selectedAddress?.name} - {selectedAddress?.street}
                </Text>
              ) : (
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                  Add a Address
                </Text>
              )}
            </View>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>

          {/* Top Bar Icons */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item) => (
              <Pressable
                key={item.id}
                style={{
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 50, height: 50, resizeMode: "contain" }}
                  source={{ uri: item.image }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 5,
                  }}
                >
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Image Carousel */}
          <Carousel
            loop
            width={width}
            height={230}
            autoPlay={true}
            data={images}
            scrollAnimationDuration={1000}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            )}
          />

          {/* Treading Deals of the week */}
          <View>
            <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
              Treading Deals of the week
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {deals.map((item, index) => (
                <Pressable
                  onPress={() => navigateToInfo(item)}
                  key={item.id || index}
                  style={{
                    marginVertical: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: item?.image }}
                    style={{ width: 180, height: 200, resizeMode: "contain" }}
                  />
                </Pressable>
              ))}
            </View>
          </View>

          {/* Border Line */}
          <View>
            <Text
              style={{
                height: 1,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
              }}
            />
          </View>

          {/* Today's Deals */}
          <View>
            <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
              Today's Deals
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {offers.map((item, index) => (
                <Pressable
                  onPress={() => navigateToInfo(item)}
                  key={item.id || index}
                  style={{
                    marginVertical: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{ width: 150, height: 150, resizeMode: "contain" }}
                    source={{ uri: item?.image }}
                  />
                  <View
                    style={{
                      backgroundColor: "#E31837",
                      paddingVertical: 5,
                      width: 130,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 4,
                      marginTop: 8,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 13,
                        fontWeight: "bold",
                      }}
                    >
                      {item?.offer}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Border Line */}
          <View>
            <Text
              style={{
                height: 1,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
              }}
            />
          </View>

          {/* Dropdown Picker */}
          <View
            style={{
              marginHorizontal: 10,
              width: "45%",
              marginBottom: open ? 50 : 15,
              marginTop: 10,
            }}
          >
            <DropDownPicker
              style={{
                borderColor: "#B7B7B7",
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category}
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="choose category"
              onOpen={onGenderOpen}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          {/* Products Grid */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            }}
          >
            {filteredProducts?.map((item: any) => (
              <ProductItem item={item} key={item.id} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Address Bottom Sheet */}
      <AddressBottomSheet
        visible={modalVisible}
        slideAnim={slideAnim}
        addresses={addresses}
        selectedAddress={selectedAddress}
        onSelectAddress={handleSelectAddress}
        onAddAddress={navigateToAddress}
        onClose={hideModal}
      />
    </>
  );
};

export default HomeScreen;