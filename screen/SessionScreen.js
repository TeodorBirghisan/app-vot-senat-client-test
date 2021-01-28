import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';

import VotingCard from '../components/CardComponent/VotingCard';
import { useRoute } from '@react-navigation/native';
import { getAllTopicsInMeeting } from '../endpoints/Endpoints';

//TODO: Calculate the result of every topic
const SessionScreen = (props) => {
  const sessionID = useRoute('SessionScreen').params.sessionID;
  const username = useRoute('SessionScreen').params.username;
  const [topics, setTopics] = useState();
  useEffect(() => {
    getAllTopicsInMeeting(sessionID).then((response) => {
      //console.log(response);
      setTopics(response);
    });
  }, []);
  //console.log(sessionID);
  const Item = ({ id, result, topic }) => (
    <View>
      <ScrollView>
        <VotingCard
          topicID={id}
          sessionID={sessionID}
          topicResult={result}
          topicContent={topic}
          username={username}
        />
      </ScrollView>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item id={item.id} result={item.result} topic={item.topic} />
  );
  return (
    <View>
      <FlatList
        data={topics}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SessionScreen;
