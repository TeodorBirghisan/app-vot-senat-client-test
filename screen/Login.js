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
import InputField from '../components/InputComponent/InputField';
import PasswordField from '../components/InputComponent/PasswordField';
import { postLogin } from '../endpoints/Endpoints';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';
import {
  getInSecureStore,
  saveInSecureStore,
  deleteInSecureStore
} from '../constants/Functions';

const LoginInput = (props) => {
  const navigation = useNavigation();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const postData = { email: emailAddress, password: password };

  const login = () => {
    //TODO: Cand  dau set la username si la token e promise si se face de abia dupa ce dau login, mie imi trebe instant
    // trebe sa fac useState pt token si user, si doar dupa ce au valori sa le salvez in secure si dupa sa navighez
    postLogin(postData).then((response) => {
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
        setEmailAddress('');
        setPassword('');
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
