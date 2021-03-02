import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import VotingHistoryCard from '../components/CardComponent/VotingHistoryCard';
import { useRoute } from '@react-navigation/native';
import { getAllTopicsInMeeting } from '../endpoints/Endpoints';

const SessionHistoryScreen = (props) => {
  const sessionID = useRoute('SessionHistory').params.sessionID;
  const username = useRoute('SessionHistory').params.username;
  const [topics, setTopics] = useState();

  useEffect(() => {
    getAllTopicsInMeeting(sessionID).then((response) => {
      setTopics(response);
    });
  }, []);

  const Item = ({ id, result, topic }) => {
    return (
      <View>
        <ScrollView>
          <VotingHistoryCard
            topicID={id}
            sessionID={sessionID}
            topicResult={result}
            topicContent={topic}
            username={username}
          />
        </ScrollView>
      </View>
    );
  };
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

export default SessionHistoryScreen;
