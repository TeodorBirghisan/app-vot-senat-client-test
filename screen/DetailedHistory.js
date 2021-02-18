import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
  getVoteOfUserInMeeting,
  getAllMembersFromMeeting
} from '../endpoints/Endpoints';
import { getInSecureStore } from '../constants/Functions';
import jwt_decode from 'jwt-decode';

const DetailedHistory = () => {
  const username = useRoute('DetailedHistory').params.username;
  const userID = useRoute('DetailedHistory').params.userId;
  const sessionID = useRoute('DetailedHistory').params.sessionID;
  const topicID = useRoute('DetailedHistory').params.topicID;
  const [result, setResult] = useState([]);
  ////am nevoie de toti useri din meetingu asta
  ////dupa fiecare user ce a votat la topicu asta

  useEffect(() => {
    getAllMembersFromMeeting(sessionID).then((response) => {
      response.forEach((element) => {
        //console.log(element);
        getVoteOfUserInMeeting(element.id, sessionID, topicID).then(
          (response) => {
            console.log(
              `${response.user.username} a votat in sedinta ${response.meeting.title} pentru topicul ${response.topic.topic} cu ${response.votValue.value}`
            );
            /*
            setResult(
              `${response.user.username} a votat in sedinta ${response.meeting.title} pentru topicul ${response.topic.topic} cu ${response.voteValue.value}`
            );*/
          }
        );
      });
    });
    //console.log(result);
  }, []);

  return (
    <View>
      <Text>ALOHA</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default DetailedHistory;
