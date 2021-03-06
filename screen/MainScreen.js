import React, { useEffect, useState, useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import SessionCard from '../components/CardComponent/SessionCard';
import { getAllMeetings, verifyIsOverMeeting } from '../endpoints/Endpoints';
import { formateDate } from '../constants/Functions';

const MainScreen = (props) => {
  //console.log('WELCOME', useRoute('MainScreen').params.username);
  const [meetings, setMeetings] = useState();
  useEffect(() => {
    const ac = new AbortController();
    verifyIsOverMeeting().then((response) => {
      setMeetings(
        response.sort(
          (a, b) => new Date(a.programmed_for) - new Date(b.programmed_for)
        )
      );
    });
    //if (meetings != null) console.log(Object.keys(meetings).length);
    return () => ac.abort();
  }, []);

  const Item = ({ id, title, programmed_for }) => (
    <View>
      <SessionCard
        sessionID={id}
        username={useRoute('MainScreen').params.username}
        title={title}
        programmed_for={`Programmed_for: ${formateDate(
          new Date(programmed_for)
        )}`}
      />
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      id={item.id}
      title={item.title}
      programmed_for={item.programmed_for}
    />
  );

  return (
    <View>
      <FlatList
        data={meetings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default MainScreen;
