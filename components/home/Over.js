import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import { Divider } from "react-native-elements";

const Over=()=>(

    <View>
    <Divider width={0.5}/>
      <Text style={styles.over} >No More Posts Thank u
      
      </Text>
    </View>
    
    )
    
const styles=StyleSheet.create({
over:{
textAlign:'center',
height:100,
color:'white',
fontSize:20

}



})
export default Over