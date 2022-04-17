import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
// import { SafeAreaView } from 'react-native-safe-area-context'

const AddNewPost = ({navigation}) => (
  <View style={styles.container}>
    <Header navigation={navigation} />
  </View>
);

const Header = ({navigation}) => (
  <View style={styles.headercontainer}>
    <TouchableOpacity    onPress={()=>navigation.goBack()}> 
    <Image
      source={{ uri: "https://img.icons8.com/ios-glyphs/344/ffffff/back.png" }}
      style={{ width: 32, height: 32}}
    /></TouchableOpacity>
    <Text style={styles.headertext}>AddNewPost </Text>
    <Text></Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headercontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems:'center'
  },

  headertext: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    alignItems:'center'
  },
});
export default AddNewPost;
