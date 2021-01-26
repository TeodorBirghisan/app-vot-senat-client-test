import React from 'react';
import * as SecureStore from 'expo-secure-store';

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
    return result;
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

export { saveInSecureStore, getInSecureStore, deleteInSecureStore };
