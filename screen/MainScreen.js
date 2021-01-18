import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import SessionCard from '../components/CardComponent/SessionCard';
import { getAllMeetings } from '../endpoints/Endpoints';

const MainScreen = (props) => {
  const [meetings, setMeetings] = useState();
  useEffect(() => {
    getAllMeetings().then((response) => {
      setMeetings(response);
    });
  }, []);
  const Item = ({ title, programmed_for }) => (
    <View>
      <SessionCard
        title={title}
        programmed_for={`Programmed_for: ${programmed_for}`}
      />
    </View>
  );
  const renderItem = ({ item }) => (
    <Item title={item.title} programmed_for={item.programmed_for} />
  );
  return (
    <View>
      <FlatList
        data={meetings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default MainScreen;
