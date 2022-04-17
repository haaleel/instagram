import { View, Text, } from "react-native";
import React, { useEffect ,useState} from "react";
import { SignedInStack, SignOutStack } from "./navigation";
// import { useGestureHandlerRef } from "@react-navigation/stack";
import {firebase} from './firebase';

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const userHandler = user =>
    user ? setCurrentUser(user) : setCurrentUser(null);

  useEffect(
    () =>firebase.auth().onAuthStateChanged(user => userHandler(user)),
      []
    )
  return <>{currentUser ? <SignedInStack /> : <SignOutStack />}</>;
}

export default AuthNavigation;
