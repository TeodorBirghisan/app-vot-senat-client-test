import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { Card, ButtonGroup, Divider } from 'react-native-elements';
import {
  getAllVoteValues,
  voteAsUserAtMeetingForTopic,
  calculateResultForTopic
} from '../../endpoints/Endpoints';

import jwt_decode from 'jwt-decode';
import { getInSecureStore } from '../../constants/Functions';
import { Alert } from 'react-native';

///TODO: sa dau rerender la Voting Card dupa ce se schimba votu
//// Sa se schimbe live
const VotingCard = (props) => {
  const voteValueDA = { value: 'da' };
  const voteValueMAABTIN = { value: 'ma abtin' };
  const voteValueNU = { value: 'nu' };

  const voteHandler = (userId, meetingId, topicId, voteValue, token) => {
    voteAsUserAtMeetingForTopic(
      userId,
      meetingId,
      topicId,
      voteValue,
      token
    ).then((response) => {
      if (response.message != null) {
        Alert.alert(response.message);
      }
    });
  };

  ///pot sa pun json de sus si atunci ar fi voteValue.value === 'da'
  ///si in Button sa pun param voteValueDA
  //TODO: sa fac niste functii ca sa nu scriu ca prostu
  //TODO: functie pentru voteAsUserForTopic
  const onVotePressHandler = async (
    username,
    meetingId,
    topicId,
    votValue,
    topic
  ) => {
    calculateResultForTopic(topicId).then((response) => {
      console.log(response, 'rezultat');
    });
    const token = await getInSecureStore(username);
    const decodedToken = await jwt_decode(token);
    if (votValue === 'DA') {
      voteHandler(decodedToken.user_id, meetingId, topicId, voteValueDA, token);
      Alert.alert('Ati votat!', `s-a votat ${votValue} for ${topic}`);
      console.log(`s-a votat ${votValue} for ${topic}`);
    } else if (votValue === 'NU') {
      voteHandler(decodedToken.user_id, meetingId, topicId, voteValueNU, token);
      Alert.alert('Ati votat!', `s-a votat ${votValue} for ${topic}`);
      console.log(`s-a votat ${votValue} for ${topic}`);
    } else {
      voteHandler(
        decodedToken.user_id,
        meetingId,
        topicId,
        voteValueMAABTIN,
        token
      );
      Alert.alert('Ati votat!', `s-a votat ${votValue} for ${topic}`);
      console.log(`s-a votat ${votValue} for ${topic}`);
    }
  };

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
