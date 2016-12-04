import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
var bcrypt = require('react-native-bcrypt');
var salt = require('./data/salt.json');
var data = require('./data/stringsData.json');

const startDate = new Date("2016-12-02 00:00:00");

class qrGenerator extends Component {

  constructor(){
    super();

    var currentDate = new Date();
    var timeElapsed = currentDate - startDate;
    var saltId = (parseInt(timeElapsed/60000))%2657;

    this.state = {
      counter:0,
      text: data[0].text,
      hash:bcrypt.hashSync(data[0].text, salt[saltId])
    };
  }

  componentWillMount(){

    var currentDate = new Date();
    var timeElapsed = currentDate - startDate;
    var saltId = (parseInt(timeElapsed/60000))%2657;

    console.log(startDate);
    console.log(currentDate);
    console.log(saltId);
    console.log(salt[saltId])

    let timeCount;
     TimerMixin.setInterval( () => { 
       if(this.state.counter == 4){
          timeCount= 0
        }
        else{
            timeCount= this.state.counter+1
        }
      this.setState({
        counter: timeCount,
        text:data[timeCount].text,
        hash:bcrypt.hashSync(data[timeCount].text, salt[saltId])
      })
    },30000);

    // 60000 - 1 minute
        //console.log()
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          //onChangeText={(text) => this.setState({text: text})}
          value={this.state.text}
        />
        <TextInput
          style={styles.input}
          //onChangeText={(text) => this.setState({text: text})}
          value={this.state.hash}
        />
        <QRCode
          value={this.state.hash}
          size={200}
          bgColor='#0099e6'
          fgColor='white'/>
      </View>
    );
  };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
        width:200,
        justifyContent:'center'
    }
});

AppRegistry.registerComponent('qrGenerator', () => qrGenerator);
