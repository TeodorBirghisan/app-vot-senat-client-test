import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MyStack from './Test';

import NavigationLogic from './screen/Navigation';
import SendEmailScreen from './screen/SendEmailScreen';

export default function App() {
  return <SendEmailScreen />;
}

const styles = StyleSheet.create({
  container: {}
});
