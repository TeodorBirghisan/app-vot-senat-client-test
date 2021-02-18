import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getVoteOfUserInMeeting } from '../endpoints/Endpoints';
import { getInSecureStore } from '../constants/Functions';
import jwt_decode from 'jwt-decode';

const DetailedHistory = () => {
  const username = useRoute('DetailedHistory').params.username;
  const userID = useRoute('DetailedHistory').params.userId;
  const sessionID = useRoute('DetailedHistory').params.sessionID;
  const topicID = useRoute('DetailedHistory').params.topicID;
  useEffect(() => {
    getVoteOfUserInMeeting(userID, sessionID, topicID).then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <View>
      <Text>ALOHA</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default DetailedHistory;
