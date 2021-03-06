import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

import { Card, Divider } from 'react-native-elements';
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

////setRezultat pt topic il savez in use state si fac fetch in useMemo si se schimba mereu cand bag un voteValue
const VotingCard = (props) => {
  const voteValueDA = { value: 'da' };
  const voteValueMAABTIN = { value: 'ma abtin' };
  const voteValueNU = { value: 'nu' };
  const [result, setResult] = useState();
  const voteHandler = (userId, meetingId, topicId, voteValue, token) => {
    voteAsUserAtMeetingForTopic(
      userId,
      meetingId,
      topicId,
      voteValue,
      token
    ).then((response) => {
      calculateResultForTopic(topicId).then((response) => {
        setResult(response.voteValue.value);
        //console.log(response, 'rezultat');
      });
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
      <Card.Title style={styles.title}>{`Rezultatul actual:     ${
        result || props.topicResult
      }`}</Card.Title>
      <Card.Divider />
      <Text style={styles.topic}>{props.topicContent}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            onVotePressHandler(
              props.username,
              props.sessionID,
              props.topicID,
              'DA',
              props.topicContent
            );
          }}
          style={[styles.button, { backgroundColor: '#11999E' }]}
        >
          <Text style={styles.text}>Da</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onVotePressHandler(
              props.username,
              props.sessionID,
              props.topicID,
              'MA ABTIN',
              props.topicContent
            );
          }}
          style={[styles.button, { backgroundColor: '#364F6B' }]}
        >
          <Text style={styles.text}>Ma abtin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onVotePressHandler(
              props.username,
              props.sessionID,
              props.topicID,
              'NU',
              props.topicContent
            );
          }}
          style={[styles.button, { backgroundColor: '#88304e' }]}
        >
          <Text style={styles.text}>Nu</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '25%',
    alignItems: 'center',
    backgroundColor: 'red',
    elevation: 8,
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 7
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20
  },
  text: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  topic: { fontSize: 16 },
  title: { fontSize: 19 }
});

export default VotingCard;
