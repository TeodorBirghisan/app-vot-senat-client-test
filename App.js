import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Login from './screen/Login';
import Signup from './screen/Signup';

export default function App() {
  return (
    <View style={styles.container}>
      <Signup />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
