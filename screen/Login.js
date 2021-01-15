import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import InputField from '../components/InputComponent/InputField';
import PasswordField from '../components/InputComponent/PasswordField';
import { postLogin } from '../endpoints/Endpoints';
import { useNavigation } from '@react-navigation/native';

const LoginInput = (props) => {
  const navigation = useNavigation();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const postData = { email: emailAddress, password: password };

  const login = () => {
    postLogin(postData).then((response) => {
      if (response.success === true) {
        navigation.navigate('MainScreen');
        //TODO: sa salvez Tokenu
        //TODO: Welcome user asta sa fie in main screen in Header...
      } else {
        Alert.alert(
          response.message,
          'Please enter login credentials again',
          [
            {
              text: 'Cancel',
              style: 'cancel'
            },
            {
              text: 'OK'
            }
          ],
          { cancelable: false }
        );
        //TODO: setFIELDUGRESIT('');
        console.log(response.message);
      }
    });
  };
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
          value={emailAddress}
          onChangeText={setEmailAddress}
          leftIcon={
            <Icon type='font-awesome' name='envelope' size={24} color='black' />
          }
        />
        <Text style={styles.text}>Password</Text>
        <PasswordField
          placeholder='password'
          value={password}
          onChangeText={setPassword}
        />
        <Button
          title='Login'
          style={styles.button}
          onPress={() => {
            login();
          }}
        />
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
