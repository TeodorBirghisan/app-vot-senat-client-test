import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl
} from 'react-native';

import VotingCard from '../components/CardComponent/VotingCard';
import { useRoute } from '@react-navigation/native';
import {
  getAllTopicsInMeeting,
  calculateResultForTopic
} from '../endpoints/Endpoints';

//TODO: Calculate the result of every topic
const SessionScreen = (props) => {
  const sessionID = useRoute('SessionScreen').params.sessionID;
  const username = useRoute('SessionScreen').params.username;
  const [topics, setTopics] = useState();
  const Item = ({ id, result, topic }) => {
    return (
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
  };
  const renderItem = ({ item }) => (
    <Item id={item.id} result={item.result} topic={item.topic} />
  );

  const onRefresh = useEffect(() => {
    const ac = new AbortController();
    getAllTopicsInMeeting(sessionID).then((response) => {
      setTopics(response);
    });
    return () => ac.abort();
  }, []);

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
