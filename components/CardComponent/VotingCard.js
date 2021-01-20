import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { Card, ButtonGroup, Divider } from 'react-native-elements';
import { getAllVoteValues } from '../../endpoints/Endpoints';

const onVotePressHandler = (votValue, topic) => {
  if (votValue === 'DA') {
    console.log(`s-a votat ${votValue} for ${topic}`);
  } else if (votValue === 'NU') {
    console.log(`s-a votat ${votValue}`);
  } else {
    console.log(`s-a votat ${votValue}`);
  }
};

//TODO: add voted ... for topic ....
/// adaug ca si parametru props.topicContent
const VotingCard = (props) => {
  /*useEffect(() => {
    getAllVoteValues().then((response) => {});
  }, []);*/
  return (
    <Card>
      <Card.Title>{props.topicTitle}</Card.Title>
      <Card.Divider />
      <Text>{props.topicContent}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title={'DA'}
            onPress={() => {
              onVotePressHandler('DA');
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title={'MA ABTIN'}
            onPress={() => {
              onVotePressHandler('MA ABTIN');
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title={'NU'}
            onPress={() => {
              onVotePressHandler('NU');
            }}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  button: { width: 100 },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20
  }
});

export default VotingCard;
