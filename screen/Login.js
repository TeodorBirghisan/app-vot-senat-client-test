import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import InputField from '../components/InputField';

const LoginInput = (props) => {
  return (
    <View style={styles.input}>
      <Text style={styles.text}>Email Address</Text>
      <InputField
        placeholder='email@address.com'
        leftIcon={
          <Icon type='font-awesome' name='user' size={24} color='black' />
        }
      />
      <Text style={styles.text}>Password</Text>
      <InputField
        placeholder='Password'
        secureTextEntry={true}
        leftIcon={
          <Icon type='font-awesome' name='lock' size={24} color='black' />
        }
      />
      <Button title='Login' style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    width: '75%',
    maxWidth: '80%',
    alignContent: 'center',
    justifyContent: 'center'
  },
  button: {},
  text: {
    fontWeight: 'bold',
    padding: 10
  }
});

export default LoginInput;
