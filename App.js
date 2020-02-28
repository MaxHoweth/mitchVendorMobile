import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoggedOut from "./src/screens/LoggedOut";
import Dashboard from "./src/screens/Dashboard";
import CheckIn from "./src/screens/CheckIn";
import ClockIn from "./src/screens/ClockIn";
//import ClockOut from "./src/screens/ClockOut";
import LocaleSelector from "./src/screens/LocaleSelector";

import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC4EQ21Gr2shjdcvQPPEMyAM9Q48LHIYo4",
    authDomain: "mitchvending-9bfc8.firebaseapp.com",
    databaseURL: "https://mitchvending-9bfc8.firebaseio.com",
    projectId: "mitchvending-9bfc8",
    storageBucket: "mitchvending-9bfc8.appspot.com",
    messagingSenderId: "475373845114",
    appId: "1:475373845114:web:e6217cd51b117c2cd619c3",
    measurementId: "G-77ZTH89XYK"
};



firebaseMain = !firebase.apps.length ? firebase.initializeApp(firebaseConfig,'mitchVendorMobile') : firebase.app();





const Stack = createStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator options={{initialRouteName:"Login" }}>

        <Stack.Screen
         name="Login"
         component={LoggedOut}
         options={{headerShown:false,gesturesEnabled:false}}
         style={styles.container}
       />

       <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown:false}}
        style={styles.container}
      />

      <Stack.Screen
       name="CheckIn"
       component={CheckIn}
       options={{headerShown:false}}
       style={styles.container}
     />

     <Stack.Screen
      name="ClockIn"
      component={ClockIn}
      options={{headerShown:false}}
      style={styles.container}
    />


   <Stack.Screen
     name="LocaleSelector"
     component={LocaleSelector}
     options={{headerShown:false}}
     style={styles.container}
   />





      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%'
  },
});
