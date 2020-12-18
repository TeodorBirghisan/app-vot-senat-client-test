import React from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Button
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import InputField from '../components/InputComponent/InputField';
import PasswordField from '../components/InputComponent/PasswordField';

const Signup = (props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.signupContainer}>
        <InputField
          placeholder='email@address.com'
          leftIcon={
            <Icon type='font-awesome' name='envelope' size={24} color='black' />
          }
        />
        <PasswordField placeholder='password' />
        <PasswordField placeholder='confirm password' />
        <InputField
          placeholder='username'
          leftIcon={
            <Icon type='font-awesome' name='user' size={24} color='black' />
          }
        />
        <Button title='Sign up' />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  signupContainer: {
    flex: 1,
    width: '75%',
    alignContent: 'center',
    justifyContent: 'center'
  }
});

export default Signup;
