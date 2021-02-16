import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute, useNavigation } from '@react-navigation/native';
import InputField from '../../components/InputComponent/InputField';
import PasswordField from '../../components/InputComponent/PasswordField';
import {
  registerSenator,
  registerAdmin,
  registerSuperAdmin
} from '../../endpoints/Endpoints';

const Signup = (props) => {
  const role = useRoute('SignUp').params.role;
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [username, setUsername] = useState('');
  const postData = {
    email: emailAddress,
    password: password,
    username: username
  };

  const verifyAccount = () => {
    if (verifyConfirmPass() == true) {
      if (role === 'superadmin') {
        handleSignUp(registerSuperAdmin, postData);
      } else if (role === 'admin') {
        handleSignUp(registerAdmin, postData);
      } else if (role === 'senator') {
        handleSignUp(registerSenator, postData);
      } else {
        // e guest
      }
    } else {
      Alert.alert(
        'Passwords do not match',
        'Please enter the password credentials again',
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
    }
  };

  const handleSignUp = (postFunction, postData) => {
    postFunction(postData).then((response) => {
      if (response.success === true) {
        Alert.alert(
          response.message,
          'You need to login now',
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('Buna ziua');
                ///navigation.navigate('Login');
              }
            }
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          response.message,
          'Please enter signUp credentials again',
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
      }
    });
  };

  const verifyConfirmPass = () => {
    if (confirmPass !== password) {
      return false;
    }
    return true;
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.signupContainer}>
        <InputField
          placeholder='email@address.com'
          value={emailAddress}
          onChangeText={setEmailAddress}
          leftIcon={
            <Icon type='font-awesome' name='envelope' size={24} color='black' />
          }
        />
        <PasswordField
          placeholder='password'
          value={password}
          onChangeText={setPassword}
        />
        <PasswordField
          placeholder='confirm password'
          value={confirmPass}
          onChangeText={setConfirmPass}
        />
        <InputField
          placeholder='username'
          value={username}
          onChangeText={setUsername}
          leftIcon={
            <Icon type='font-awesome' name='user' size={24} color='black' />
          }
        />
        <Button
          title={`Signup as ${role}`}
          onPress={() => {
            verifyAccount();
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  signupContainer: {
    flex: 1,
    //width: '75%',
    alignContent: 'center',
    justifyContent: 'center'
  }
});

export default Signup;
