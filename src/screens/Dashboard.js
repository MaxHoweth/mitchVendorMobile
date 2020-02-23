import React, {Component} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {Linking} from 'expo';
import { serialize} from "react-serialize"


var fireStore;

export default class DashBoard extends Component {
  constructor(props) {
     super(props);
     navigation = props.navigation;

     this.state = {
       nextAddress:'1234 Test Street, Visalia, CA',

       streetAddress:'55555 Rio De Grande Ave',
       cityAndState:'Little Mexico, CA',
     };

     fireStore = firebaseMain.firestore();

  }

  componentDidMount() {

    let docRef = fireStore.collection("users").doc(firebaseMain.auth().currentUser.email);

    docRef.get().then(function(doc) {
      if (doc.exists) {
          if(doc.data().clockedIn == false) {
            console.warn('Not ClockedIn, Redirecting to TimeClock ');
            let displayName = doc.data().name;
            console.warn(displayName);
            navigation.navigate('ClockIn',{displayName:displayName})
          }
      } else {
          // doc.data() will be undefined in this case
          console.warn("No such document!");
      }
      }).catch(function(error) {
          console.warn("Error getting document:", error);
      });

    //console.warn(firebaseMain.auth().currentUser.email);

  }

  render() {
    return  <View style = {styles.container}>
      <ScrollView scrollEnabled={false} style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          />

          <View style={styles.nextAddressContainer}>
            <Text style={styles.nextStopLabelText}>Next Stop:</Text>
            <Text style={styles.nextAddressText}>{this.state.streetAddress} </Text>
            <Text style={styles.nextAddressText}>{this.state.cityAndState} </Text>
          </View>
      </ScrollView>

      <View style = {styles.footerContainer}>
          <TouchableOpacity
              style={styles.footerButton}
              onPress={() => this.navigateToLocation()}
              underlayColor='#fff'>
              <Text style={styles.footerButtonText}>Navigate</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.footerButton}
              onPress={() => this.navigateToCheckIn()}
              underlayColor='#fff'>
              <Text style={styles.footerButtonText}>Check In</Text>
          </TouchableOpacity>
      </View>
    </View>
    }

    navigateToLocation() {
      var serializedAddress = serialize("29266 Ellensburg Ave, Gold Beach, Or");

      fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + serializedAddress + '&key=' + 'AIzaSyBEN7Yhpjl7kHaEp5Lg_cHY3WV2jowd1hY')
        .then((response) => response.json())
        .then((responseJson) => {
            var results = JSON.stringify(responseJson.results[0].formatted_address);
            //var lat = JSON.stringify(responseJson.results[0].geometry.location.lat);
            //var lng = JSON.stringify(responseJson.results[0].geometry.location.lng);
            //var fullAddress = tempJson['formatted_address'];

            Linking.openURL('maps://app?daddr=' + serializedAddress );
            //Linking.openURL('maps://app?saddr=100+101&daddr=100+102');
      })


    }
    navigateToCheckIn() {
      navigation.navigate('CheckIn',{address:'55555 Rid De Grande St, Visalia, Ca'})
    }

};

const styles = StyleSheet.create({
  container: {
    height:'100%',
    width:'100%',
    flex:1,
    padding:15,


  },
  mapContainer:{
    paddingTop:25,

  },
  map:{
    height: 400,
    width: 400,

  },
  nextAddressContainer:{
    justifyContent:'center',
    alignSelf:'center',
    paddingTop:10,


  },
  nextStopLabelText:{
    textAlign:'center',
    fontSize:20,
    paddingTop:5,
    paddingBottom:5,
  },
  nextAddressText:{
    textAlign:'center',
    fontSize:30,
    paddingTop:5,

  },
  footerContainer: {
    flexDirection:'row',
    justifyContent:'center',
    alignSelf:'flex-end',
    paddingBottom:10,


  },

  footerButton:{
   marginRight:5,
   marginLeft:5,
   marginTop:10,
   paddingTop:10,
   paddingBottom:10,
   backgroundColor:'#1E6738',
   borderRadius:10,
   borderWidth: 1,
   borderColor: '#fff',
   flex:1,
 },
 footerButtonText:{
     color:'#fff',
     textAlign:'center',
     paddingLeft : 5,
     paddingRight : 5,
 }

});
