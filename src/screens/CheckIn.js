import React, {Component} from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { serialize } from "react-serialize"


var fireStore;


export default class CheckIn extends Component {
  constructor(props) {
     super(props);

     const dateTimeArray = new Date().toLocaleString().split(',');

     this.state = {
       date:dateTimeArray[0],
       time:dateTimeArray[1],
       passedAddress:props.route.params.address,
       cashCollected:'',
       inventoryStocked:'',

     }
     fireStore = firebaseMain.firestore();


  }

  componentDidMount() {
    //const fireStore = firebase.firestore();

    //console.warn(this.state.dateTime, this.state.passedAddress)

  }


  render() {
    return  <View style = {styles.container}>
      <ScrollView style={styles.mainContentContainer} scrollEnabled={false}>
          <Text style={styles.displayText}> Date: {this.state.date} </Text>
          <Text style={styles.displayText}> Time: {this.state.time} </Text>
          <Text style={styles.displayText}> Address: {this.state.passedAddress}</Text>
          <Text style={styles.displayText}> Please Check In:</Text>
          <Text style={styles.infoText}>All Amounts In Dollars And Cents</Text>

          <View style={styles.textEntryContainer}>
            <TextInput
                placeholder = 'Cash Collected'
                style = {styles.textEntry}
                textAlign = {'center'}
                onChangeText={text => this.onCashCollectedChangeText(text)}
            />
          </View>

          <View style={styles.textEntryContainer}>
            <TextInput
                placeholder = 'Inventory Stocked'
                style = {styles.textEntry}
                textAlign = {'center'}
                onChangeText={text => this.onInventoryStockedChangeText(text)}
            />
          </View>
        </ScrollView>
        <View style = {styles.footerContainer}>
          <TouchableOpacity
              style={styles.footerButton}
              onPress={() => this.attemptCheckIn()}
              underlayColor='#fff'>
              <Text style={styles.footerButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>

      </View>
      }

      onCashCollectedChangeText(_text) {
          this.setState( {cashCollected:_text} )
      }

      onInventoryStockedChangeText(_text) {
          this.setState( {inventoryStocked:_text} )

      }
      attemptCheckIn() {

        if(this.testNumericInput(this.state.cashCollected) && this.testNumericInput(this.state.inventoryStocked)) {


          fireStore.collection("checkIns").add({
            date:this.state.date,
            time:this.state.time,
            address:this.state.passedAddress,
            cashCollected:this.state.cashCollected,
            inventoryStocked:this.state.inventoryStocked,
          });


        }
        else{
          alert('Input Error. Input must be numeric, contain one period or less, not be blank, and contain no spaces');
        }

      }

      incorrectAddress() {


      }

      testNumericInput(_input) {
        const nums = '0123456789.';
        const numOfPeriods = _input.split('.').length-1;

        let isAllNums = true;
        let onePeriodOrLess = false;
        let isNotEmptyString = false;

        if(_input == '') { isNotEmptyString = false;}
        else{ isNotEmptyString = true; }

        for(x =0;x < _input.length;x++) {
          if (!nums.includes(_input[x])) { isAllNums = false; }
        }
        if (numOfPeriods <= 1) { onePeriodOrLess = true; }

        if (isAllNums && onePeriodOrLess && isNotEmptyString) {
          return true;
        }
        else {
          return false;
        }

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
  mainContentContainer: {
    paddingTop:30,

  },
  displayText:{
    textAlign:'center',
    paddingTop:10,
    paddingBottom:10,
    fontSize:22,
  },
  infoText:{
    textAlign:'center',
    fontSize:13,
  },
  textEntryContainer: {
    alignItems:'stretch',
    paddingTop:10,
    paddingBottom:10,

  },
  textEntry: {
    height:50,
    borderColor: 'gray',
    borderWidth: 1,




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
