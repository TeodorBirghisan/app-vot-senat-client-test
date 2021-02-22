import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  BackHandler
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import PasswordField from '../components/InputComponent/PasswordField';
import { CheckBox } from 'react-native-elements';
import {
  postLoginAdmin,
  postLoginSuperAdmin,
  postLoginSenator,
  postLoginGuest
} from '../endpoints/Endpoints';
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';
import {
  getInSecureStore,
  saveInSecureStore,
  deleteInSecureStore
} from '../constants/Functions';

const LoginInput = (props) => {
  const navigation = useNavigation();
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSenator, setIsSenator] = useState(false);
  ///TODO: Logic for login as guest (Maybe a random numer or a formal signup)
  ///const [isGuest, setIsGuest] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const postData = { email: emailAddress, password: password };

  const verifyAccount = () => {
    if (isSuperAdmin === true) {
      handleLogin(postLoginSuperAdmin, postData);
    } else if (isAdmin === true) {
      handleLogin(postLoginAdmin, postData);
    } else if (isSenator === true) {
      handleLogin(postLoginSenator, postData);
    } else {
      ///ar trebui sa fie guest
    }
  };

  const handleLogin = (postFunction, postData) => {
    postFunction(postData).then((response) => {
      if (response.success === true) {
        saveInSecureStore(response.username, response.token);
        setUser(response.username);
        setToken(response.token);
        navigation.navigate('BottomNavigator', {
          username: response.username
        });
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

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Return true to stop default back navigaton
        // Return false to keep default back navigaton
        deleteInSecureStore(user);
        setToken('');
        setUser('');
        //setEmailAddress('');
        //setPassword('');
        console.log(`BYeee ${user}`);
        //Sa pun o alerta sau ceva
        return false;
      };

      // Add Event Listener for hardwareBackPress
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        // Once the Screen gets blur Remove Event Listener
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View>
            <Input
              label='Email Address'
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
              style={styles.input}
            />
          </View>
          <View>
            <Input
              label='Password'
              placeholder='password'
              secureTextEntry={true}
              leftIcon={
                <Icon type='font-awesome' name='lock' size={24} color='black' />
              }
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.checkboxContainer}>
          <View>
            <CheckBox
              center
              title='Super Admin Account'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              onPress={() => {
                setIsSuperAdmin(true);
                setIsSenator(false);
                setIsAdmin(false);
              }}
              checked={isSuperAdmin}
            />
          </View>
          <View>
            <CheckBox
              center
              title='Admin Account'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              onPress={() => {
                setIsAdmin(true);
                setIsSuperAdmin(false);
                setIsSenator(false);
              }}
              checked={isAdmin}
            />
          </View>
          <View>
            <CheckBox
              center
              title='Senator Account'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              onPress={() => {
                setIsSenator(true);
                setIsSuperAdmin(false);
                setIsAdmin(false);
              }}
              style={styles.checkbox}
              checked={isSenator}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title='Login'
            style={styles.button}
            onPress={() => {
              verifyAccount();
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignContent: 'center', justifyContent: 'center' },
  inputContainer: {},
  input: {},
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkbox: {},
  buttonContainer: {
    alignItems: 'center'
  },
  button: {},
  text: {
    fontWeight: 'bold',
    padding: 10
  }
});

export default LoginInput;
