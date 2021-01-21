import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CountDown from 'react-native-countdown-component';

const Timer = (props) => {
  return (
    <CountDown
      until={50}
      size={30}
      onFinish={() => alert('Finished')}
      digitStyle={{ backgroundColor: '#FFF' }}
      digitTxtStyle={{ color: '#1CC625' }}
      timeToShow={['M', 'S']}
      timeLabels={{ m: 'MM', s: 'SS' }}
    />
  );
};

export default Timer;
