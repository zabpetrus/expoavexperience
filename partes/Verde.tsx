import { Audio } from 'expo-av';
import Constants from 'expo-constants';
import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';



const source = require('../assets/bensound-epic.mp3');

export default class Verde extends Component {

  state = {
    playingStatus: "nosound",
  };
    sound: Audio.Sound | any;
  
  async _playRecording() {
    const { sound } = await Audio.Sound.create(
      source,
      {
        shouldPlay: true,
        isLooping: true,
      },
      this._updateScreenForSoundStatus,
    );
    this.sound = sound;
    this.setState({
      playingStatus: 'playing'
    });
  }
  
  _updateScreenForSoundStatus = (status) => {
    if (status.isPlaying && this.state.playingStatus !== "playing") {
      this.setState({ playingStatus: "playing" });
    } else if (!status.isPlaying && this.state.playingStatus === "playing") {
      this.setState({ playingStatus: "donepause" });
    }
  };
  
  async _pauseAndPlayRecording() {
    if (this.sound != null) {
      if (this.state.playingStatus == 'playing') {
        console.log('pausing...');
        await this.sound.pauseAsync();
        console.log('paused!');
        this.setState({
          playingStatus: 'donepause',
        });
      } else {
        console.log('playing...');
        await this.sound.playAsync();
        console.log('playing!');
        this.setState({
          playingStatus: 'playing',
        });
      }
    }
  }
  
  _syncPauseAndPlayRecording() {
    if (this.sound != null) {
      if (this.state.playingStatus == 'playing') {
        this.sound.pauseAsync();
      } else {
        this.sound.playAsync();
      }
    }
  }
  
  _playAndPause = () => {
    switch (this.state.playingStatus) {
      case 'nosound':
        this._playRecording();
        break;
      case 'donepause':
      case 'playing':
        this._pauseAndPlayRecording();
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this._playAndPause}>
            <Text style={styles.buttonText}>
              {this.state.playingStatus}
            </Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      paddingTop: Constants.statusBarHeight,
    },
    button: {
      width: 256,
      height: 256/1.618,
      margin: 5,
      borderRadius: 10,
      backgroundColor: '#cc33cc',
      justifyContent: 'center',
    },
    buttonText: {
      textAlign: 'center',
      backgroundColor: 'transparent',
    }
  });