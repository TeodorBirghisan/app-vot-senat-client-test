import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Button,
  Text,
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
        <View style={styles.input}>
          <InputField
            placeholder='email@address.com'
            value={emailAddress}
            onChangeText={setEmailAddress}
            leftIcon={
              <Icon
                type='font-awesome'
                name='envelope'
                size={24}
                color='black'
              />
            }
          />
        </View>
        <View style={styles.input}>
          <PasswordField
            placeholder='password'
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.input}>
          <PasswordField
            placeholder='confirm password'
            value={confirmPass}
            onChangeText={setConfirmPass}
          />
        </View>
        <View style={styles.input}>
          <InputField
            placeholder='username'
            value={username}
            onChangeText={setUsername}
            leftIcon={
              <Icon type='font-awesome' name='user' size={24} color='black' />
            }
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            verifyAccount();
          }}
          style={styles.buttonContainer}
        >
          <Text style={styles.text}>{`Signup as ${role}`}</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  signupContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  buttonContainer: {
    width: '45%',
    alignSelf: 'center',
    backgroundColor: 'red',
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 7,
    top: 25
  },
  input: {
    maxWidth: '80%',
    padding: 12,
    left: 40
  },
  text: { fontSize: 18, color: '#fff', fontWeight: 'bold', alignSelf: 'center' }
});

export default Signup;
