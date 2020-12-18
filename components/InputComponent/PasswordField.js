import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const PasswordField = (props) => {
  return (
    <Input
      {...props}
      style={{ ...styles.input, ...props.style }}
      secureTextEntry={true}
      leftIcon={
        <Icon type='font-awesome' name='lock' size={24} color='black' />
      }
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontWeight: 'bold'
  }
});

export default PasswordField;
