import React from 'react';
import { StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';

import LeftComponent from './LeftComponent';
import RightComponent from './RightComponent';
import CenterComponent from './CenterComponent';

const HeaderContainer = (props) => {
  return (
    <Header>
      <LeftComponent />
      <CenterComponent />
      <RightComponent />
    </Header>
  );
};

const styles = StyleSheet.create({});

export default HeaderContainer;
