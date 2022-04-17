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

import * as Yup from "yup";
import { Formik } from "formik";

import validator from "email-validator";
import { firebase, db } from "../../firebase";


const LoginFrom = ({ navigation }) => {
  const LoginFromSchema = Yup.object().shape({
    email: Yup.string().email().required("An Email Is Required"),
    password: Yup.string()
      .required()
      .min(6, "Your passwrod has to have least 6 character"),
  });

  const onLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("successfull", email, password);
    } catch (error) {
      Alert.alert(
        "something wrong",
        error.message + "\n\n...Create a New Account",
        [
          {
            text: "ok",
            onPress: () => console.log("ok"),
            style: "cancel",
          },
          { text: "signUp", onPress: () => navigation.push("SginUpScreen") },
        ]
      );
    }
  };
  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
        }}
        validationSchema={LoginFromSchema}
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
                    2 > values.password.length || values.password.length > 5
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
            <View style={{ alignItems: "flex-end", marginBottom: 15 }}>
              <Text style={{ color: "#6BB0F5" }}>Forget password?</Text>
            </View>

            <View >
              <Pressable style={styles.button(isValid)}>
                <Text
                  style={{ color: "white" }}
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  {" "}
                  Log IN{" "}
                </Text>
              </Pressable>
            </View>
            <View style={styles.signupcontainer}>
              <Text>Don't have an account? </Text>

              <TouchableOpacity onPress={() => navigation.push("SginUpScreen")}>
                <Text style={{ color: "#6bb0f5" }}>Sign up</Text>
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

export default LoginFrom;
