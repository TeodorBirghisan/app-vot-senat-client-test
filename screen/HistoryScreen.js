import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, FlatList, Text } from 'react-native';
import { getAllMeetings } from '../endpoints/Endpoints';
import { useRoute } from '@react-navigation/native';
import SessionCardHistory from '../components/CardComponent/SessionCardHistory';
import { formateDate } from '../constants/Functions';

const History = (props) => {
  const [meetings, setMeetings] = useState();
  useEffect(() => {
    const ac = new AbortController();
    getAllMeetings().then((response) => {
      setMeetings(
        response
          .filter((a) => a.isOver === true)
          .sort(
            (a, b) => new Date(a.programmed_for) - new Date(b.programmed_for)
          )
      );
    });
    //if (meetings != null) console.log(Object.keys(meetings).length);
    return () => ac.abort();
  }, []);

  const Item = ({ id, title, programmed_for }) => (
    <View>
      <SessionCardHistory
        sessionID={id}
        username={useRoute('History').params.username}
        title={title}
        programmed_for={`Date: ${formateDate(new Date(programmed_for))}`}
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
      <Text style={styles.text}>ISTORIC</Text>
      <FlatList
        data={meetings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    alignSelf: 'center'
  }
});

export default History;
