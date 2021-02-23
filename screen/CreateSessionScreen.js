import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Platform,
  Text,
  Modal
} from 'react-native';
import InputField from '../components/InputComponent/InputField';
import DateTimePicker from '@react-native-community/datetimepicker';
import CreateTopic from '../components/Modal/createTopic';
import { postCreateMeeting } from '../endpoints/Endpoints';
import { useRoute } from '@react-navigation/native';
import { getInSecureStore } from '../constants/Functions';
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const formateDate = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return (
    date.getMonth() +
    1 +
    '/' +
    date.getDate() +
    '/' +
    date.getFullYear() +
    '  ' +
    strTime
  );
};

const CreateSessionScreen = (props) => {
  const user = useRoute('CreateSessionScreen').params.username;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [meetingID, setMeetingID] = useState();
  const postData = {
    title: title,
    programmed_for: date,
    duration: duration
  };
  const [session, setSession] = useState({
    title: 'default title',
    programmed_for: 'dd/mm/yyyy hh:mm',
    duration: 'min/hrs'
  });

  const onCreateSession = async () => {
    const token = await getInSecureStore(user);
    setSession(postData);
    postCreateMeeting(postData, token).then((response) => {
      setMeetingID(response.data.id);
      console.log(response.data);
      Alert.alert(
        'Topic pentru meeting',
        'Mesaj',
        [
          {
            text: 'OK',
            onPress: () => {}
          }
        ],
        { cancelable: false }
      );
    });
    setDuration('');
    setTitle('');
  };

  const onChange = (event, selectedDate) => {
    try {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setShow(false);
      }}
    >
      <View style={styles.createSessionContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <InputField
              placeholder='Title for session'
              value={title}
              onChangeText={setTitle}
            />
          </View>
          <View style={styles.input}>
            <InputField
              placeholder='Set duration'
              value={duration}
              onChangeText={setDuration}
            />
          </View>
        </View>
        <View style={styles.dateContainer}>
          <View style={styles.date}>
            <Button onPress={showDatepicker} title='Show date picker!' />
          </View>
          <View style={styles.date}>
            <Button onPress={showTimepicker} title='Show time picker!' />
          </View>
        </View>
        {show && (
          <DateTimePicker
            testID='dateTimePicker'
            value={date}
            mode={mode}
            is24Hour={true}
            display='default'
            onChange={onChange}
          />
        )}

        <View style={styles.dateText}>
          <Text style={styles.text}>Selected date: {formateDate(date)}</Text>
        </View>
        <View style={styles.topic}>
          <CreateTopic meetingID={meetingID} user={user} />
        </View>
        <View style={styles.createSes}>
          <Button title={'create session'} onPress={() => onCreateSession()} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  createSessionContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'red',
    width: '85%'
  },
  input: { backgroundColor: 'black', width: '90%', justifyContent: 'center' },
  dateContainer: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center'
  },
  date: { width: '90%', justifyContent: 'center' },
  dateText: {
    padding: 20,
    alignItems: 'center'
  },
  text: { fontSize: 20, fontWeight: 'bold' },
  topic: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '75%'
  },
  createSes: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%'
  }
});

export default CreateSessionScreen;
