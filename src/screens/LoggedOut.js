import React, {Component} from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackActions, NavigationActions } from '@react-navigation/native';


import * as LocalAuthentication from 'expo-local-authentication';


export default class LoggedOut extends Component {

  constructor(props) {
     super(props);
     this.state = {
       email:'',
       password:'',
     };
     firebase = props.firebase;
     navigation = props.navigation;


  }

  componentDidMount() {
    try {
      let hasLocalAuth = LocalAuthentication.hasHardwareAsync();

      if( hasLocalAuth ) {
        console.warn("Face ID found on device");
        try {
          LocalAuthentication.authenticateAsync({fallbackLablel:'FaceID or Fingerprint Attempts Limit Reached Please Enter Passcode'})
        }
        catch (e) { console.warn(e); }

      }
      else{
        console.warn("No FaceID or Fingerprint on This Device");
      }
    }

    catch (e) { console.warn(e); }

  }

  render() {


    return  <View style = {styles.container}>
    <View style = {styles.logoContainer}>
      <Image source = {require("./images/logo_transparent.png")} style = {styles.logo} />
    </View>
      <View style = {styles.emailContainer}>
        <TextInput
          placeholder = 'E-Mail'
          style={ styles.emailEntry }
          textAlign = {'center'}
          autoCorrect = {false}
          onChangeText={text => this.onEmailChangeText(text)}
        />
      </View>

      <View style = {styles.passwordContainer} >
        <TextInput
            placeholder = 'Password'
            style= { styles.passwordEntry }
            textAlign = {'center'}
            autoCorrect = {false}
            secureTextEntry = {true}
            onChangeText={text => this.onPasswordChangeText(text)}
        />
      </View>
      <TouchableOpacity
          style={styles.loginScreenButton}
          onPress={() => this.attemptLogin()}
          underlayColor='#fff'>
          <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
    }

    onEmailChangeText(_text) {
      this.setState( {email:_text} )
    }
    onPasswordChangeText(_text) {
      this.setState( {password:_text} )
    }

    attemptLogin() {

        var success = firebaseMain.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode === 'auth/wrong-password') {
                alert("Incorrect Password");
                return;
              }
            if (errorCode === 'auth/user-not-found') {
                  alert("Username or Email Not Found");
                  return;
              }
              else {
                alert(errorMessage);
                return;
              }
          })
          .then(function(userCredential){
            if(userCredential != undefined) {
              //console.warn("LOGIN SUCCESS!!");
              navigation.navigate('LocaleSelector');
              navigation.reset({index: 0, routes: [{ name: 'LocaleSelector' }]});
              //navigation.dispatch(StackActions.replace('Login','Dashboard'));

              }
            else {
              //console.warn( "LOGIN FAILURE!!");
              }
          });
    }
};





const styles = StyleSheet.create({
  container: {
    height:'100%',
    width:'100%',

    padding:25,

  },
  logoContainer:{
    justifyContent:'flex-start',
    alignItems:'center',
  },
  logo:{
    width:280,
    height:280,

  },
  placeholderText: {

    position:'absolute',
  },
  emailEntry: {
    height:50,

    borderColor: 'gray',
    borderWidth: 1

  },
  passwordEntry: {
    height: 50,

    borderColor: 'gray',
    borderWidth: 1
  },
  emailContainer: {

  },
  passwordContainer: {
    paddingTop:10

  },
  loginScreenButton:{
   marginRight:40,
   marginLeft:40,
   marginTop:10,
   paddingTop:10,
   paddingBottom:10,
   backgroundColor:'#1E6738',
   borderRadius:10,
   borderWidth: 1,
   borderColor: '#fff'
 },
 loginText:{
     color:'#fff',
     textAlign:'center',
     paddingLeft : 10,
     paddingRight : 10
 }

});
