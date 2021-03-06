import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  Text
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import email from 'react-native-email';
import * as Linking from 'expo-linking';
import { Input } from 'react-native-elements';

const handleEmail = (to, subject, body) => {
  //const to = ['birghisanteodor@yahoo.com'];
  email(to, {
    subject: subject,
    body: body
  }).catch(console.error);
};

const SendEmailScreen = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSenator, setIsSenator] = useState(false);
  const [inputValue, setInputValue] = useState('');

  //TODO: At the moment an user can enter an email with upper cases
  //TODO: check if an email should only have lower case letters
  const validateEmail = (emailAddress) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailAddress).toLowerCase());
  };

  const verifyAccount = () => {
    if (validateEmail(inputValue) === true) {
      if (isAdmin === true) {
        console.log(Linking.makeUrl('SignUp?role=admin'));
        handleEmail(
          inputValue,
          'Account Registration',
          Linking.makeUrl('SignUp?role=admin')
        );
      } else if (isSenator === true) {
        handleEmail(
          inputValue,
          'Account Registration',
          Linking.makeUrl('SignUp?role=senator')
        );
      }
    } else {
      Alert.alert(
        'Invalid Email type',
        'Please enter a valid email address',
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

      setInputValue('');
    }
  };

  return (
    <View style={styles.container}>
      <Input
        style={styles.inputField}
        placeholder='Insert Email Address Here'
        //label={'Select the Email Address and the type of Account'}
        value={inputValue}
        onChangeText={setInputValue}
      />
      <View>
        <View>
          <CheckBox
            center
            title='Admin Account'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={() => {
              setIsAdmin(true);
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
              setIsAdmin(false);
              setIsSenator(true);
            }}
            checked={isSenator}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                verifyAccount();
              }}
              style={styles.button}
            >
              <Text style={styles.text}>Send Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: { fontWeight: 'bold' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  buttonContainer: { paddingTop: '15%' },
  button: {
    width: '60%',
    alignSelf: 'center',
    backgroundColor: 'red',
    elevation: 8,
    backgroundColor: '#3F72AF',
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 7
  },
  text: { fontSize: 18, color: '#fff', fontWeight: 'bold', alignSelf: 'center' }
});

export default SendEmailScreen;
