import React, {Component} from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, TextInput} from "react-native";

var fireStore;

let mapStartLatitudeTemp = 0;
let mapStartLongitudeTemp = 0;

let mapStartLatitudeDeltaTemp = 0;
let mapStartLongitudeDeltaTemp = 0;


export default class LocaleSelector extends Component {
  constructor(props) {
     super(props);
     navigation = props.navigation;

     this.state = {
       selectedLocale:'None'
     }
     fireStore = firebaseMain.firestore();


  }

  componentDidMount() {
    //Simple function that takes User to Login Page if not logged In






    let docRef = fireStore.collection("users").doc(firebaseMain.auth().currentUser.email);

    docRef.get().then(function(doc) {
      if (doc.exists) {
          if(doc.data().clockedIn == false) {
            let displayName = doc.data().name;
            navigation.navigate('ClockIn',{displayName:displayName})
          }
      }
      else {
          console.warn("No such document!");
      }
      }).catch(function(error) {
          console.warn("Error getting document:", error);
      });



  }

  //SACREMEBNT IS A TYPO IN FIREBASE AND THIS LIST


  render() {
    return <View style={styles.container}>
      <Text style ={styles.chooseLocaleLabelText}> Please Choose A Locale </Text>
      <View style={styles.searchContainer}>
        <Text>Search:  </Text>
        <TextInput style = {styles.textEntry}> </TextInput>
      </View>



      <View style={styles.container}>

        <FlatList
           data={[
             {key: 'Sacramento'},
             {key: 'Los Angeles'},
             {key: 'Phoenix'},
             {key: 'Visalia'},
             {key: 'Yreka'},
             {key: 'San Fransisco'},
             {key: 'Ureka'},
             {key: 'San Jose'},
             {key: 'Fresno'},
             {key: 'San Diego'},
           ]}
           renderItem={({item}) => <Button title={item.key} style={styles.item} onPress={() => this.onItemSelected(item.key)}>  </Button>}
           />
      </View>


      <View style={styles.footerContainer}>
        <TouchableOpacity
            style={styles.footerButton}
            onPress={() => this.attemptToChooseLocale()}
            underlayColor='#fff'>
            <Text style={styles.footerButtonText}>Choose Locale: {this.state.selectedLocale}</Text>
        </TouchableOpacity>

      </View>

    </View>



  }
  onItemSelected(input) {
    this.setState({
      selectedLocale:input
    });
  }

  attemptToChooseLocale() {
    this.getLocationDataFromFirebase();
    navigation.navigate(
      'Dashboard',
      {
        selectedLocale:this.state.selectedLocale,
        mapLatitude:mapStartLatitudeTemp,
        mapLongitude:mapStartLongitudeTemp,
        latitudeDelta:mapStartLatitudeDeltaTemp,
        longitudeDelta:mapStartLongitudeDeltaTemp,
      });
    //  console.warn(this.state);

  }

  getLocationDataFromFirebase() {
    let docRef1 = fireStore.collection("locales").doc(this.state.selectedLocale); //.collection('locations').doc("all");

    docRef1.get().then(function(doc) {
      if (doc.exists) {

            mapStartLatitudeTemp = doc.data().startLatitude;
            mapStartLongitudeTemp = doc.data().startLongitude;

            mapStartLatitudeDeltaTemp = doc.data().latitudeDelta;
            mapStartLongitudeDeltaTemp = doc.data().longitudeDelta;

            console.warn(mapStartLatitudeTemp);
      }
      else {
          console.warn("No such document!");
      }
      }).catch(function(error) {
          console.warn("Error getting document:", error);
      });



  }



};

const styles = StyleSheet.create({
  container: {
    height:'100%',
    width:'100%',
    flex:1,
    padding:25,
    paddingTop:25,
    justifyContent:'center',
    alignItems:'stretch',

  },
  chooseLocaleLabelText:{
    textAlign:'center',
    fontSize:24,
    paddingTop:40,
    paddingBottom:5,
  },

  searchContainer: {
    alignItems:'center',
    flexDirection:'row',
    paddingTop:10,
    paddingBottom:10,

  },
  textEntry: {
    height:30,
    borderColor: 'gray',
    borderWidth: 1,
    flex:1,

  },
  footerContainer: {
    flexDirection:'row',
    justifyContent:'center',
    alignSelf:'flex-end',
    paddingBottom:10,


  },

  footerButton:{
   marginRight:15,
   marginLeft:15,
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
