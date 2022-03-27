import { Audio } from 'expo-av';
import * as React from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default function Amarelo(){

    const [sound, setSound] = React.useState();
     
    async function playSound() {

        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
           require('../assets/bensound-epic.mp3')
        );
        setSound(sound);
    
        console.log('Playing Sound');
        await sound.playAsync(); }
    
      React.useEffect(() => {
        return sound
          ? () => {
              console.log('Unloading Sound');
              sound.unloadAsync(); }
          : undefined;
      }, [sound]);

      return (
        <View style={styles.container}>
          <Button title="Play Sound" onPress={playSound} />
        </View>
      );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });
  