import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  SafeAreaView,
  Platform,
} from "react-native";
import SearchBar from "../components/SearchBar";
import { useAddressViewController } from "../viewControllers/useAddressViewController";

const AddressScreen = () => {
  // Use the ViewController instead of direct state/logic
  const {
    name,
    mobileNo,
    houseNo,
    street,
    landmark,
    postalCode,
    handleAddAddressPress,
    handleBackPress,
    handleNameChange,
    handleMobileChange,
    handleHouseNoChange,
    handleStreetChange,
    handleLandmarkChange,
    handlePostalCodeChange,
  } = useAddressViewController();
  
  return (
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
        <SearchBar
          showBackButton={true}
          onBackPress={handleBackPress}
        />
        <View style={{ padding: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Add a new Address
          </Text>

          <TextInput
            placeholderTextColor={"gray"}
            placeholder={"India"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          ></TextInput>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Full name (First and last name)
            </Text>
            <TextInput
              value={name}
              onChangeText={handleNameChange}
              placeholderTextColor={"gray"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder={"Enter Your Name"}
            ></TextInput>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Mobile number
            </Text>
            <TextInput
              value={mobileNo}
              onChangeText={handleMobileChange}
              placeholderTextColor={"gray"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder={"Mobile No"}
            ></TextInput>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Flat, House No, Building, Company
            </Text>
            <TextInput
              value={houseNo}
              onChangeText={handleHouseNoChange}
              placeholderTextColor={"gray"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder={"Eg. 402/3 Binakumari Society"}
            ></TextInput>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Area, Street, Sector, Village
            </Text>
            <TextInput
              value={street}
              onChangeText={handleStreetChange}
              placeholderTextColor={"gray"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder={"Eg. MG Road Mulund East"}
            ></TextInput>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>
            <TextInput
              value={landmark}
              onChangeText={handleLandmarkChange}
              placeholderTextColor={"gray"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder={"Eg near appollo hospital"}
            ></TextInput>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pincode</Text>
            <TextInput
              value={postalCode}
              onChangeText={handlePostalCodeChange}
              placeholderTextColor={"gray"}
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder={"Enter Pincode"}
            ></TextInput>
          </View>

          <Pressable
            onPress={handleAddAddressPress}
            style={{
              backgroundColor: "#FFC72C",
              padding: 19,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Add Address</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddressScreen;
