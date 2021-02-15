import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const RedirectWelcomeScreen = (props) => {
  useEffect(() => {
    //fetch de verificare la server sa vezi daca e ok userul sau rolul

    //navighezi unde vrei

    if (props.fromExternalPath === true) {
      props.navigation.navigate('SignUp');
    } else {
      props.navigation.navigate('Login');
    }
    //navigator.navigate('Login');
  }, [props.fromExternalPath]);

  return (
    <View>
      <Text>{'LOADING...'}</Text>
    </View>
  );
};

export default RedirectWelcomeScreen;
