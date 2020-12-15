import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

const InputField = (props) => {
  return <Input {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    fontWeight: 'bold'
  }
});

export default InputField;
