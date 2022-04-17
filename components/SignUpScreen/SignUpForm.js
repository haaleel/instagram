import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
//   import { Button } from "react-native-elements";

import * as Yup from "yup";
import { Formik } from "formik";
//   import validUrl from "valid-url";
import validator from "email-validator";
import { firebase, db } from "../../firebase";

const SignUpForm = ({ navigation }) => {
  const SignUpFromSchema = Yup.object().shape({
    email: Yup.string().email().required("An Email Is Required"),
    username: Yup.string().required().min(2, "minimum 2 character"),
    password: Yup.string()
      .required()
      .min(6, "Your passwrod has to have least 6 character"),
  });

  const randomProPic = async () => {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    return data.results[0].picture.large;

  
  };


  
  const onSignUp = async (email, password, username) => {
    try {
      const authUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password,username);
      console.log("create account sucesfully created", email, password,username);
      db.collection("users").doc(authUser.user.email).set({
        ower_uid: authUser.user.uid,
        username: username,
        email: authUser.user.email,
        profilepicture : await randomProPic(),
        
      }); 
    } catch (error) {
      Alert.alert("hi ", error.message);
    }
  };
  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "", username: "" }}
        onSubmit={(value) => {
          onSignUp(value.email, value.password, value.username);
        }}
        validationSchema={SignUpFromSchema}
        validateOnMount={true}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,

          isValid,
        }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || validator.validate(values.email)
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="Phone number or Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>

            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.username.length || values.username.length > 6
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="UserName"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="username"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
            </View>

            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.password.length || values.password.length > 5
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>

            <View style={{ alignItems: "flex-end", marginBottom: 15 }}></View>
            <Pressable style={styles.button(isValid)}>
              <Text
                style={{ color: "white" }}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                {" "}
                Sign UP{" "}
              </Text>
            </Pressable>
            <View style={styles.signupcontainer}>
              <Text>Already have an account? </Text>

              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: "#6bb0f5" }}>Log In</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>

      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 70,
  },
  inputField: {
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#FAFAFA",
    marginBottom: 10,
    borderWidth: 0.4,
  },

  signupcontainer: {
    flexDirection: "row",
    // width:'100%',
    marginTop: 50,
    justifyContent: "center",
  },

  button: (isValid) => ({
    backgroundColor: isValid ? "#0096f6" : "#9acaf7",
    alignItems: "center",
    minHeight: 40,
    borderRadius: 5,
    justifyContent: "center",
  }),
});

export default SignUpForm;
