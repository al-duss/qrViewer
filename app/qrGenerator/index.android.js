import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} from 'react-native';
import TimerMixin from 'react-timer-mixin';

var data = require('./data/stringsData.json');

class qrGenerator extends Component {
  state = {
    counter:0,
    text: data[0].text,
  };

  componentWillMount(){
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
        text:data[timeCount].text
      })
    }, 60000);
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
        <QRCode
          value={this.state.text}
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
