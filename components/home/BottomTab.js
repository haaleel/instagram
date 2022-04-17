import { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
// import { Touchable, TouchableOpacity } from "react-native-web";
// import { TouchableOpacity } from "react-native-gesture-handler";

export const bottomTabIcon = [
  {
    name: "home",
    active:
      "https://img.icons8.com/fluency-systems-regular/344/ffffff/garage-closed.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/344/ffffff/home.png",
  },
  {
    name: "search",
    active:
      "https://img.icons8.com/fluency-systems-regular/344/ffffff/search-for-love.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/344/ffffff/search--v1.png",
  },
  {
    name: "Reel",
    active:
      "https://img.icons8.com/fluency-systems-regular/344/ffffff/film-reel.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/344/ffffff/cinema-.png",
  },
  {
    name: "shop",
    active:
      "https://img.icons8.com/fluency-systems-regular/344/ffffff/shop-two--v2.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/344/ffffff/shopping-bag-full.png",
  },
  {
    name: "Profile",
    active:
      "https://www.iwmbuzz.com/wp-content/uploads/2022/01/top-reasons-how-bts-jin-stands-to-make-his-acting-premiere-you-would-agree-on-this-3-920x518.jpg",
    inactive:
      "https://www.iwmbuzz.com/wp-content/uploads/2022/01/top-reasons-how-bts-jin-stands-to-make-his-acting-premiere-you-would-agree-on-this-3-920x518.jpg",
  },
];

const BottomTab = ({ icons ,}) => {
  const [activetab, setactivetab] = useState("home");
  const Icon = ({ icon ,}) => (
    <TouchableOpacity onPress={() => [setactivetab(icon.name)]}>
      <Image 
        source={{ uri: activetab === icon.name ? icon.active : icon.inactive }}
        style={[
          styles.icon,
          icon.name === "Profile" ? styles.profilepic() : null,
          activetab === "Profile" && icon.name === activetab //how to work
            ? styles.profilepic(activetab)
            : null,
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    zIndex: 999,
    backgroundColor: "#000",
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    marginTop: 6,
  },

  icon: {
    width: 30,
    height: 30,
  },

  profilepic: (activetab = "") => ({
    borderRadius: 10,
    borderColor: 'green',
    borderWidth: activetab === "Profile" ? 1 : 0,

    // borderColor: "#fff",
  }),
});

export default BottomTab;