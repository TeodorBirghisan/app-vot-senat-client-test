import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
  getVoteOfUserInMeeting,
  getAllMembersFromMeeting
} from '../endpoints/Endpoints';
import { getInSecureStore } from '../constants/Functions';
import jwt_decode from 'jwt-decode';
import { ListItem, Avatar, Icon } from 'react-native-elements';

const DetailedHistory = () => {
  const username = useRoute('DetailedHistory').params.username;
  const userID = useRoute('DetailedHistory').params.userId;
  const sessionID = useRoute('DetailedHistory').params.sessionID;
  const topicID = useRoute('DetailedHistory').params.topicID;
  const [result, setResult] = useState([]);
  ////am nevoie de toti useri din meetingu asta
  ////dupa fiecare user ce a votat la topicu asta

  /*const addElemsCallback = useCallback(
    (count) => {
      setResult((elems) => {
        const newElems = [...elems];
        for (let i = 0; i < count; i++) {
          newElems.push(i);
        }
        return newElems;
      });
    },
    [setResult]
  );*/

  useEffect(() => {
    getAllMembersFromMeeting(sessionID).then((response) => {
      response.forEach((element) => {
        //console.log(element);
        getVoteOfUserInMeeting(element.id, sessionID, topicID).then(
          (response) => {
            if (response.hasOwnProperty('error') === false) {
              console.log(
                `${response.user.username} a votat in sedinta ${response.meeting.title} pentru topicul ${response.topic.topic} cu ${response.votValue.value}`
              );
              setResult((oldResult) => [
                ...oldResult,
                `${response.user.username} a votat in sedinta ${response.meeting.title} pentru topicul ${response.topic.topic} cu ${response.votValue.value}`
              ]);
            }
            /*if (response != null)
              setResult((prev) =>
                prev.add(
                  `${response.user.username} a votat in sedinta ${response.meeting.title} pentru topicul ${response.topic.topic} cu ${response.voteValue.value}`
                )
              );*/
          }
        );
      });
    });
  }, []);

  const keyExtractor = (item) => item.username;
  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={result}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({});

export default DetailedHistory;
