import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import './shim.js';

var crypto = require('crypto')
var salt = require('./data/salt.json');

//var data = require('./data/stringsData.json');

const startDate = new Date("2016-12-02 00:00:00");

class qrGenerator extends Component {

  constructor(){
    super();

    this.state = {
      data:[],
      text:"",
      hash:""
      //hash:bcrypt.hashSync(data[0].text, salt[saltId])
    };
  }

  componentWillMount(){
    this.getData()

    let timeCount;
    var currentHour = new Date()
    currentHour.setMilliseconds(0);
    currentHour.setSeconds(0);
    currentHour.setMinutes(0);
    console.log(currentHour)

     TimerMixin.setInterval( () => {
       var currentMinutes = new Date();
       var minutes = (parseInt((currentMinutes - currentHour)/60000))
       var timeElapsed = currentMinutes - startDate;
       var saltId = (parseInt(timeElapsed/60000))%2657;

       console.log(currentHour)
       console.log(minutes)
       if(minutes > 59){
          minutes = 0
          currentHour = new Date()
          currentHour.setMilliseconds(0);
          currentHour.setSeconds(0);
          currentHour.setMinutes(0);
          this.getData()
        }
      this.setState({
        text:this.state.data[minutes],
        hash:crypto.createHmac('sha256', salt[saltId]).update(this.state.data[minutes]).digest('hex')
      })
    },60000);
    console.log(this.state.text)
    console.log(this.state.hash)
    // 60000 - 1 minute
        //console.log()
  }

  getData(){
    var currentDate = new Date();
    var timeElapsed = currentDate - startDate;
    var saltId = (parseInt(timeElapsed/60000))%2657;

    var currentMinutes = new Date();
    var currentHour = new Date()
    currentHour.setMilliseconds(0);
    currentHour.setSeconds(0);
    currentHour.setMinutes(0);
    var minutes = (parseInt((currentMinutes - currentHour)/60000))


    return fetch('http://192.168.43.200:5000/',{
                method: 'GET'
            }).then((response) => {
                if(response.status >= 200 && response.status < 300){
                    return response.json()
                }
            }).then((strings) => {
                console.log(strings);
                this.setState({
                  data:strings,
                  text:strings[minutes],
                  hash: crypto.createHmac('sha256', salt[saltId]).update(this.state.text).digest('hex')

                  //hash:bcrypt.hashSync(strings[0], salt[saltId])
                })
            })
            .catch((error) => {
                console.error(error);
            });
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
