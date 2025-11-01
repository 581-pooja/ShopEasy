import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  Pressable,
} from "react-native";
import SearchBar from "../components/SearchBar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from '@expo/vector-icons/Entypo';
import { useAddAddressViewController } from "../viewControllers/useAddAddressViewController";

const AddAddressScreen = () => {
  const { addresses, handleBackPress, handleAddNewAddress } = useAddAddressViewController();
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
          <SearchBar
            showBackButton={true}
            onBackPress={handleBackPress}
          />
          <View style={{ padding: 10 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Your Addresses
            </Text>
            <Pressable
              onPress={handleAddNewAddress}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                paddingHorizontal: 5,
                paddingVertical: 7,
              }}
            >
              <Text>Add a new Address</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </Pressable>

            <Pressable>
              {/* All the added addresses */}
              {addresses?.map((item) => (
                <Pressable
                  key={item._id} 
                  style={{
                    borderWidth: 1,
                    borderColor: "#D0D0D0",
                    padding: 10,
                    flexDirection: "column",
                    gap: 5,
                    marginVertical: 10,
                  }}
                >
                  <View style={{flexDirection: "row", alignItems: "center", gap: 3}}>
                    <Text style={{fontSize:15, fontWeight: "bold"}}>{item?.name}</Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>
                  <Text style={{fontSize: 15, color: "#181818"}}>{item?.houseNo}, {item?.landmark}</Text>
                  <Text style={{fontSize: 15, color: "#181818"}}>{item?.street}</Text>
                  <Text style={{fontSize: 15, color: "#181818"}}>India, Mumbai</Text>
                  <Text style={{fontSize: 15, color: "#181818"}}>Phone No : {item?.mobileNo}</Text>
                  <Text style={{fontSize: 15, color: "#181818"}}>Pin Code : {item?.postalCode}</Text>

                  <View style={{flexDirection: "row", gap: 10, marginTop: 7, alignItems: "center"}}>
                    <Pressable style={{
                      backgroundColor: "#F5F5F5",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: "#D0D0D0",
                    }}>
                      <Text>Edit</Text>
                    </Pressable>

                    <Pressable style={{
                      backgroundColor: "#F5F5F5",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: "#D0D0D0",
                    }}>
                      <Text>Remove</Text>
                    </Pressable>

                    <Pressable style={{
                      backgroundColor: "#F5F5F5",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: "#D0D0D0",
                    }}>
                      <Text>Set as Default</Text>
                    </Pressable>
                  </View>
                </Pressable>
              ))}
            </Pressable>


          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default AddAddressScreen;

