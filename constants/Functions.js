import React from 'react';
import * as SecureStore from 'expo-secure-store';

const replaceQuote = (string) => {
  return string.replace(/['"]+/g, '');
};

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

async function saveInSecureStore(key, value) {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
    console.log(`Successfully saved ${key} and ${value}`);
    return true;
  } catch (error) {
    console.log(`A crapat in SAVE ${error}`);
    return false;
  }
}

const getInSecureStore = async (key) => {
  try {
    const result = await SecureStore.getItemAsync(key);
    console.log(`Successfully got ${key} and ${result}`);
    return replaceQuote(result);
  } catch (error) {
    console.log(error);
  }
};

const deleteInSecureStore = async (key) => {
  try {
    if (key == null) {
      console.log('Key cannot be empty');
    } else {
      await SecureStore.deleteItemAsync(key);
      console.log(`Successfully deleted ${key}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  saveInSecureStore,
  getInSecureStore,
  deleteInSecureStore,
  replaceQuote,
  formateDate
};
