import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useLayoutEffect, useEffect, useContext, useState } from 'react'
import SearchBar from '../components/SearchBar'
import { useNavigation } from '@react-navigation/native';
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useProfileViewController } from '../viewControllers/useProfileViewController';

const ProfileScreen = () => {
  const { user, orders, loading, handleLogout } = useProfileViewController();

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
          {/* SearchBar is the first child and will stay sticky at top */}
          <SearchBar />
          <View style={{ backgroundColor: "white", padding: 10 }}>
            {user ? (
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Welcome {user.name}
              </Text>
            ) : (
              <Text>Welcome User!</Text>
            )}

            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 12 }}>
              <Pressable style={{ padding: 10, backgroundColor: "#E0E0E0", borderRadius: 25, flex: 1 }}>
                <Text style={{ textAlign: "center" }}>Your orders</Text>
              </Pressable>

              <Pressable style={{ padding: 10, backgroundColor: "#E0E0E0", borderRadius: 25, flex: 1 }}>
                <Text style={{ textAlign: "center" }}>Your Account</Text>
              </Pressable>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 12 }}>
              <Pressable style={{ padding: 10, backgroundColor: "#E0E0E0", borderRadius: 25, flex: 1 }}>
                <Text style={{ textAlign: "center" }}>Buy Again</Text>
              </Pressable>

              <Pressable onPress={handleLogout} style={{ padding: 10, backgroundColor: "#E0E0E0", borderRadius: 25, flex: 1 }}>
                <Text style={{ textAlign: "center" }}>Logout</Text>
              </Pressable>
            </View>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 15 }}> Recent Orders: </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {loading ? (
                <Text style={{ marginTop: 10, padding: 5 }}>Place Your Orders!</Text>
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <Pressable
                    style={{
                      marginTop: 15,
                      padding: 15,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: "#d0d0d0",
                      marginHorizontal: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    key={order._id}
                  >
                    {/* Render the order information here */}
                    {order.products.slice(0, 1)?.map((product) => (
                      <View style={{ marginVertical: 10 }} key={product._id}>
                        <Image
                          source={{ uri: product.image }}
                          style={{ width: 100, height: 100, resizeMode: "contain" }}
                        />
                      </View>
                    ))}
                  </Pressable>
                ))
              ) : (
                <Text>No orders found</Text>
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})