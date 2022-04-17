import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React from "react";
import { USERS } from "../../data/user";
// import { } from "react-native-web";

const Stories = () => {
  return (
    <View style={{ marginBottom:15 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => (
          <View key={index}style={{alignItems:"center"}}>
            <Image source={{ uri: story.image }} style={styles.story} />
            <Text style={{ color: "white",}}>{
            
            
            story.user.length>10 ? story.user.slice(0,9).toLocaleLowerCase()+'...':story.user.toLocaleLowerCase()}</Text>
          </View>
        ))}

     
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  story: {
    marginTop:3,
    
    width: 75,
    height: 75,
    borderRadius: 50,
    marginLeft: 12,
    borderWidth: 2,
    borderColor: "#ff8501",
  },
});

export default Stories;