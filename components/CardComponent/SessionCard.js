import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

const SessionCard = (props) => {
  return (
    <Card style={styles.cardContainer}>
      <Card.Title>LIVE SESSION</Card.Title>
      <Card.Divider />
      <Text style={{ marginBottom: 10 }}>
        Display the live Session if there is any Or display not current Live
        Session
      </Text>
      <Button
        icon={<Icon name='code' color='#ffffff' />}
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0
        }}
        title='VOTE NOW'
      />
    </Card>
  );
};

const styles = StyleSheet.create({});

export default SessionCard;
