import React from 'react';
import { View, StyleSheet } from 'react-native';

import SessionCard from '../components/CardComponent/SessionCard';

///TODO: create a Main screen Navigator
const MainScreen = (props) => {
  return (
    <View>
      <SessionCard />
    </View>
  );
};

const styles = StyleSheet.create({});

export default MainScreen;
