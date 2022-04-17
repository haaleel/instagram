import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/home/Header";
import Stories from "../components/home/Stories.js";
import Post from "../components/home/Post";
import { POST } from "../data/post";
import BottomTab, { bottomTabIcon } from "../components/home/BottomTab";
import { db } from "../firebase";
import Over from "../components/home/Over";
// import {  } from 'react-native-web'

const HomeScreen = ({navigation}) => {

const[posts,setpost]=useState([])


  useEffect(()=>{
// 
db.collectionGroup('posts').orderBy('createdAt','desc').onSnapshot(snapshot=>  {


  // console.log(snapshot.doc.map(doc=>doc.data))
  setpost(snapshot.docs.map(post=>({id:post.id,...post.data()})))
})
  },[])



  
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />

      <ScrollView >
        {posts.map((post,index) => (
          <Post post ={post} key={index} />
        ))}

<Over/>
      </ScrollView>
      <BottomTab icons={bottomTabIcon}navigation={navigation}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: `#000000`,
    flex: 1,
  },
});

export default HomeScreen;
