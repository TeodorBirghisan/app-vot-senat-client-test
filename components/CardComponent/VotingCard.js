import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { Card, ButtonGroup, Divider } from 'react-native-elements';
import { getAllVoteValues } from '../../endpoints/Endpoints';

const onVotePressHandler = (votValue, topic) => {
  if (votValue === 'DA') {
    console.log(`s-a votat ${votValue} for ${topic}`);
  } else if (votValue === 'NU') {
    console.log(`s-a votat ${votValue} for ${topic}`);
  } else {
    console.log(`s-a votat ${votValue} for ${topic}`);
  }
};

//TODO: add voted ... for topic ....
/// adaug ca si parametru props.topicContent
const VotingCard = (props) => {
  /*useEffect(() => {
    getAllVoteValues().then((response) => {});
  }, []);*/
  //console.log('IN VOTING CARD', props.username);
  //props.username -> imi da username-ul
  //props.topicID -> imi da ID de la un topic
  return (
    <Card>
      <Card.Title>{props.topicResult}</Card.Title>
      <Card.Divider />
      <Text>{props.topicContent}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title={'DA'}
            onPress={() => {
              onVotePressHandler('DA', props.topicContent);
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title={'MA ABTIN'}
            onPress={() => {
              onVotePressHandler('MA ABTIN', props.topicContent);
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title={'NU'}
            onPress={() => {
              onVotePressHandler('NU', props.topicContent);
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
