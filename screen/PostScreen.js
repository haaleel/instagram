// import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddNewPost from '../components/newpost/AddNewPost'
import FormikPostUploader from '../components/newpost/FormikPostUploader'
// import Love from '../components/newpost/Love'



const PostScreen = ({navigation}) => {
  return (
    <SafeAreaView  style={{backgroundColor:'black',flex:1}}  >
     < AddNewPost navigation={navigation}/>
     <FormikPostUploader navigation={navigation}/>
  
    </SafeAreaView>
  )
}

export default PostScreen