import React from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import InputField from '../components/InputComponent/InputField';
import PasswordField from '../components/InputComponent/PasswordField';

const LoginInput = (props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.input}>
        <Text style={styles.text}>Email Address</Text>
        <InputField
          placeholder='email@address.com'
          leftIcon={
            <Icon type='font-awesome' name='envelope' size={24} color='black' />
          }
        />
        <Text style={styles.text}>Password</Text>
        <PasswordField placeholder='password' />
        <Button title='Login' style={styles.button} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
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
