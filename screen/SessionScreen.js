import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import VotingCard from '../components/CardComponent/VotingCard';

const SessionScreen = (props) => {
  return (
    <View>
      <ScrollView>
        <VotingCard />
        <VotingCard />
        <VotingCard />
        <VotingCard />
        <VotingCard />
        <VotingCard />
        <VotingCard />
        <VotingCard />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SessionScreen;
