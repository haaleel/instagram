import { View, Text ,StyleSheet,Image} from 'react-native'
import React from 'react'
import SignUpForm from '../components/SignUpScreen/SignUpForm';

const SginUpScreen = ({navigation}) => (
    <View style={styles.container}>
      <View style={styles.logocontainer}>
        <Image style={styles.logo} source={require("../assets/Insta.png")} />
      </View>
  <SignUpForm navigation={navigation}/>
      
    </View>
);
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      marginTop: 50,
      paddingHorizontal: 12,
    },
  
    logocontainer: {
  
  
      alignItems:"center",
      marginTop:70
    },
  
    logo: {
      height: 100,
      width: 100,
    },
  });
export default SginUpScreen