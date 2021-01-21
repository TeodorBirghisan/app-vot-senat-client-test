import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Button,
  TouchableHighlight,
  View,
  FlatList
} from 'react-native';
import InputField from '../InputComponent/InputField';

import TopicModel from './topicModel';

import { createTopicForMeeting } from '../../endpoints/Endpoints';

//TODO: The user can also remove the topics if he wants
//TODO: Add some design ca ma speriu cand vad cum arata

const CreateTopic = (props) => {
  const [enteredTopic, setEnteredTopic] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [topicList, setTopicList] = useState([]);
  const meetingID = props.meetingID;
  const onAddTopicPress = () => {
    if (meetingID == null) {
      Alert.alert(
        'Cannot add Topics',
        'You must first create a session before adding topics',
        [{ text: 'OK' /*onPress: () => console.log('OK Pressed')*/ }],
        { cancelable: false }
      );
    } else {
      setModalVisible(true);
    }
  };
  const addTopicForList = (topic) => {
    if (topic.length === 0) {
      return;
    }
    setTopicList([
      ...topicList,
      { id: '_' + Math.random().toString(36).substr(2, 9), value: topic }
    ]);
    setEnteredTopic('');
  };

  const addTopicsToMeeting = () => {
    topicList.forEach((topic) =>
      createTopicForMeeting(meetingID, { topic: topic.value }).then(
        (response) => {
          console.log(response);
        }
      )
    );
    setTopicList('');
  };

  return (
    <View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Create Topics!</Text>
            <InputField
              placeholder={'Topic...'}
              style={styles.input}
              onChangeText={setEnteredTopic}
              value={enteredTopic}
            />
            <Button
              title='Add new topic'
              onPress={() => addTopicForList(enteredTopic)}
            />
            <FlatList
              style={{ flexGrow: 1 }}
              keyExtractor={(item, index) => item.id}
              data={topicList}
              renderItem={(itemData) => (
                <TopicModel title={itemData.item.value} />
              )}
            />
            <Button
              title={'Add these topics for meeting'}
              onPress={() => addTopicsToMeeting()}
              style={{ ...styles.openButton }}
            />
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          onAddTopicPress();
        }}
      >
        <Text style={styles.textStyle}>Add topics</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    //margin: 20,
    width: '90%',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  input: {
    width: '80%'
  }
});

export default CreateTopic;
