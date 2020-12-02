import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [text, setText] = useState('initText');

  useEffect(() => {

    const getHelloWorld = async() =>{
      let response = await fetch('http://192.168.0.111:8080');
      const data = await response.json();
      setText(data.text);
    }

    getHelloWorld();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
