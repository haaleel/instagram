import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import validUrl from "valid-url";
import { Button } from "react-native";
import { firebase, db } from "../../firebase";

const placeholderimg = "https://img.icons8.com/ios/344/ffffff/image.png";
const uploadsPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL Img REQUIRED"),
  caption: Yup.string().max(2200, "Must be exactly 2200 digits"),
});

const FormikPostUploader = ({ navigation }) => {
  const [thumbnailUrl, setthumnailUrl] = useState(placeholderimg);
  const [currentLoggedInUser, setcurrentLoggedInUser] =
    useState(placeholderimg);

  const getUsername = () => {
    const user = firebase.auth().currentUser;
    const unsubscribe = db
      .collection("users")
      .where("ower_uid", "==", user.uid)
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          setcurrentLoggedInUser({
            username: doc.data().username,
            profilepicture: doc.data().profilepicture,
          });
        })
      );
    return unsubscribe;
  };
  useEffect(() => {
    getUsername();
  }, []);

  const uploadPostToFirebase = (imageUrl, caption) => {
    const unsubscribe = db
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .collection("posts")
      .add({
        imageUrl: imageUrl,
        user: currentLoggedInUser.username,
        // profilepicture: currentLoggedInUser.profilepicture,
        owner_uid: firebase.auth().currentUser.uid,
        caption: caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes: 0,
        likes_by_users: [],
        comments: [],
      })
      .then(() => navigation.goBack());
    return unsubscribe;
  };

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {
        uploadPostToFirebase(values.imageUrl, values.caption);
      }}
      validationSchema={uploadsPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              margin: 20,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Image
              source={{
                uri: validUrl.isUri(thumbnailUrl)
                  ? thumbnailUrl
                  : placeholderimg,
              }}
              style={{ width: 150, height: 150 }}
            />
            <View style={{ flex: 1, marginLeft: 15, marginTop: 15 }}>
              <TextInput
                style={{ color: "white", fontSize: 18 }}
                placeholder="Write a Caption"
                placeholderTextColor="#808080"
                multiline={true}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                // value={Values.caption}
                value={values.caption}
              />
            </View>
          </View>
          {/* <Divider width={0.2} orientation="vertical" /> */}
          <TextInput
            onChange={(e) => setthumnailUrl(e.nativeEvent.text)}
            style={{ color: "white" }}
            placeholder="ENTER A IMG URL"
            placeholderTextColor="#808080"
            onChangeText={handleChange("imageUrl")}
            onBlur={handleBlur("imageUrl")}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{ color: "red", fontSize: 10 }}>
              {errors.imageUrl}
            </Text>
          )}
          <View style={styles.btn}>
            <Button
              onPress={handleSubmit}
              title="share "
              disabled={!isValid}
            ></Button>
          </View>
        </>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  btn: {
    color: "blue",

    //   backgroundColor: "blue",

    alignItems: "center",
  },
});
export default FormikPostUploader;
