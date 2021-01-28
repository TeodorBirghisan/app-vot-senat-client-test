import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { Card, ButtonGroup, Divider } from 'react-native-elements';
import {
  getAllVoteValues,
  voteAsUserAtMeetingForTopic
} from '../../endpoints/Endpoints';

import jwt_decode from 'jwt-decode';
import { getInSecureStore } from '../../constants/Functions';

const voteValueDA = { value: 'da' };
const voteValueMAABTIN = { value: 'ma abtin' };
const voteValueNU = { value: 'nu' };

///pot sa pun json de sus si atunci ar fi voteValue.value === 'da'
///si in Button sa pun param voteValueDA
const onVotePressHandler = async (
  username,
  meetingId,
  topicId,
  votValue,
  topic
) => {
  const token = getInSecureStore(username);
  const decodedToken = await jwt_decode((await token).toString());
  if (votValue === 'DA') {
    voteAsUserAtMeetingForTopic(
      decodedToken.user_id,
      meetingId,
      topicId,
      voteValueDA
    ).then((response) => {
      console.log(response);
    });
    console.log(`s-a votat ${votValue} for ${topic}`);
  } else if (votValue === 'NU') {
    voteAsUserAtMeetingForTopic(
      decodedToken.user_id,
      meetingId,
      topicId,
      voteValueNU
    ).then((response) => {
      console.log(response);
    });
    console.log(`s-a votat ${votValue} for ${topic}`);
  } else {
    voteAsUserAtMeetingForTopic(
      decodedToken.user_id,
      meetingId,
      topicId,
      voteValueMAABTIN
    ).then((response) => {
      console.log(response);
    });
    console.log(`s-a votat ${votValue} for ${topic}`);
  }
};

//TODO: add voted ... for topic ....
/// adaug ca si parametru props.topicContent
const VotingCard = (props) => {
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
              onVotePressHandler(
                props.username,
                props.sessionID,
                props.topicID,
                'DA',
                props.topicContent
              );
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title={'MA ABTIN'}
            onPress={() => {
              onVotePressHandler(
                props.username,
                props.sessionID,
                props.topicID,
                'MA ABTIN',
                props.topicContent
              );
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title={'NU'}
            onPress={() => {
              onVotePressHandler(
                props.username,
                props.sessionID,
                props.topicID,
                'NU',
                props.topicContent
              );
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
