import React from 'react';
import { View, StyleSheet } from 'react-native';

import HeaderContainer from '../components/HeaderComponent/Header';
import SessionCard from '../components/CardComponent/SessionCard';

const MainScreen = (props) => {
  return (
    <View>
      <HeaderContainer />
      <SessionCard />
    </View>
  );
};

const styles = StyleSheet.create({});

export default MainScreen;
