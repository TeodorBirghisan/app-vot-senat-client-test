import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

import { Card, ButtonGroup, Divider } from 'react-native-elements';

import jwt_decode from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';
import { getInSecureStore } from '../../constants/Functions';

const VotingHistoryCard = (props) => {
  const navigation = useNavigation();
  const onVoteHistoryPress = async () => {
    const token = await getInSecureStore(props.username);
    const decodedToken = await jwt_decode(token);
    navigation.navigate('DetailedHistory', {
      userId: decodedToken.user_id,
      username: props.username,
      sessionID: props.sessionID,
      topicID: props.topicID
    });
  };
  return (
    <Card>
      <Card.Title
        style={styles.title}
      >{`Rezultat: ${props.topicResult}`}</Card.Title>
      <Card.Divider />
      <Text style={styles.topic}>{props.topicContent}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            onVoteHistoryPress();
          }}
          style={styles.button}
        >
          <Text style={styles.text}>Voturi</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '85%',
    alignItems: 'center',
    backgroundColor: 'red',
    elevation: 8,
    backgroundColor: '#3d84a8',
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 7
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20
  },
  text: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  topic: { fontSize: 17 },
  title: { fontSize: 18 }
});

export default VotingHistoryCard;
