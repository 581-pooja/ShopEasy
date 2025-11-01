import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface SearchBarProps {
  showBackButton?: boolean;
  onBackPress?: () => void;
  placeholder?: string;
  showMicIcon?: boolean;
  onMicPress?: () => void;
  onSearchPress?: () => void;
  showScanIcon?: boolean;
}

const SearchBar:  React.FC<SearchBarProps> = ({
  showBackButton = false,
  onBackPress,
  placeholder = "Search ShopEasy.in",
  showMicIcon = true,
  onSearchPress,
  showScanIcon = true,
}) => {
  return (
    <View
      style={{
        position: "relative",
        zIndex: 1,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3, // For Android
        shadowColor: "#000", // For IOS
      }}
    >
      
      <View
        style={{
          backgroundColor: "#00CED1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* Conditional Back Button */}
        {showBackButton && (
          <Pressable
            onPress={onBackPress}
            style={{
              padding: 2,
              marginRight: 8,
            }}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
        )}
        
        {/* Search Input */}
        <Pressable
          onPress = {onSearchPress}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="search1"
            size={22}
            color="black"
          />
          <TextInput placeholder={placeholder} />
        </Pressable>
        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 15}}>
        {showMicIcon && (<Feather name="mic" size={24} color="black" />)}
        {showScanIcon && (<MaterialIcons name="qr-code-scanner" size={24} color="black" />)}
        </View>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
