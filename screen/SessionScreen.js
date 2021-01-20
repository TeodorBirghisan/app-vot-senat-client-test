import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import VotingCard from '../components/CardComponent/VotingCard';

///TODO: Add specific topics for VotingCards through props
const SessionScreen = (props) => {
  return (
    <View>
      <ScrollView>
        <VotingCard topicTitle={'Titlu'} topicContent={'Content topic'} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SessionScreen;
