import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Alert,
  BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
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
      style={styles.touchable}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
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
        <View style={styles.checkboxContainer}>
          <View style={styles.checkbox}>
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
          <View style={styles.checkbox}>
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
        <TouchableOpacity
          onPress={() => {
            verifyAccount();
          }}
          style={styles.buttonContainer}
        >
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

/////Daca pun superadmin
/*
<View style={styles.checkbox}>
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

*/

const styles = StyleSheet.create({
  touchable: {},
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '85%',
    maxHeight: '40%'
  },
  input: {},
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    paddingBottom: 20
  },
  checkbox: { width: '100%' },
  buttonContainer: {
    width: '45%',
    alignItems: 'center',
    backgroundColor: 'red',
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 7
  },
  text: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center'
  }
});

export default LoginInput;
