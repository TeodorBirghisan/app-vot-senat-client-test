import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

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
      <Card.Title>{`Rezultat: ${props.topicResult}`}</Card.Title>
      <Card.Divider />
      <Text>{props.topicContent}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title={'Voturi'}
            onPress={() => {
              onVoteHistoryPress();
            }}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20
  }
});

export default VotingHistoryCard;
