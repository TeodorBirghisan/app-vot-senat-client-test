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

  const onCreateSession = () => {
    setSession(postData);
    postCreateMeeting(postData).then((response) => {
      setMeetingID(response.data.id);
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
        <InputField
          placeholder='Title for session'
          value={title}
          onChangeText={setTitle}
        />
        <View>
          <Button onPress={showDatepicker} title='Show date picker!' />
        </View>
        <View>
          <Button onPress={showTimepicker} title='Show time picker!' />
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
        <InputField
          placeholder='Set duration'
          value={duration}
          onChangeText={setDuration}
        />
        <View style={styles.dateText}>
          <Text style={styles.text}>Selected date: {formateDate(date)}</Text>
        </View>
        <CreateTopic meetingID={meetingID} />
        <View>
          <Button title={'create session'} onPress={() => onCreateSession()} />
          <Button title={'View all'} onPress={() => console.log(session)} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  createSessionContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  dateText: {
    paddingTop: 20,
    alignItems: 'center'
  },
  text: { fontSize: 20 }
});

export default CreateSessionScreen;
