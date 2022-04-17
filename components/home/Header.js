import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import firebase from "firebase/compat";
// import Position from "react-native/Libraries/Components/Touchable/Position";
// import { normalizeRect } from "react-native/Libraries/StyleSheet/Rect";
// import {  } from "react-native-web";
const handlSignOut= async()=>{
try {
await  firebase.auth().signOut()

console.log('sucessfull signout')
} catch (error) {
  console.log(error)
}
}


const Header = ({navigation}) => {
  return (
    <View style={styles.Container}>
      <TouchableOpacity onPress={handlSignOut}>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
      </TouchableOpacity>
      <View style={styles.IconContainer}>
        <TouchableOpacity onPress={()=>navigation.push('PostScreen')} >
          <Image
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png",
            }}
            style={styles.Icon}
          />
        </TouchableOpacity>
        

        <TouchableOpacity>
          <Image
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/like%20--v1.png",
            }}
            style={styles.Icon}
          />
        </TouchableOpacity>


        <TouchableOpacity>

          <View style={styles.UnredColor}>
            <Text style={styles.UnredColorText}>11</Text>


          </View>
          <Image
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png",
            }}
            style={styles.Icon}
          />
        </TouchableOpacity>


        
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  IconContainer: {
    flexDirection: "row",
  },

  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },

  Icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: "contain",
  },


  UnredColor:{
    backgroundColor:'#ff3250',
   position: 'absolute', 
    left:20,
    bottom: 18,
    width:25,
    height:18,
    borderRadius:25,
    alignItems:'center',
    justifyContent:'center',
    zIndex:100
  },

  UnredColorText:{

    color:'white',
 fontSize:12,
 fontWeight:'bold',


  },



});
export default Header;