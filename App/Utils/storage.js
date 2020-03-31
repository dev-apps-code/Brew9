import { AsyncStorage } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export async function setServerIndex() {
  await AsyncStorage.setItem('serverIndex', '0');
  return;
}

export async function getServerIndex() {
  return await AsyncStorage.getItem('serverIndex');
}

export async function changeServerIndex(value) {
  var index = await getServerIndex();
  if (isNaN(index) || index == null) {
    // console.log("serverIndex is NaN");
    index = '0';
  }
  // console.log("old index: ", index);
  index = (parseInt(index) + 1) % value;
  // console.log("new index: ", index);
  await AsyncStorage.setItem('serverIndex', index.toString());
  return;
}

function clear() {
  return AsyncStorage.clear();
}

function get(key, defaultValue = null) {
  return AsyncStorage.getItem(key).then((value) =>
    value !== null ? JSON.parse(value) : defaultValue
  );
}

function set(key, value) {
  return AsyncStorage.setItem(key, JSON.stringify(value));
}

function remove(key) {
  return AsyncStorage.removeItem(key);
}

function multiGet(...keys) {
  return AsyncStorage.multiGet([...keys]).then((stores) => {
    const data = {};
    stores.forEach((result, i, store) => {
      data[store[i][0]] = JSON.parse(store[i][1]);
    });
    return data;
  });
}

function multiRemove(...keys) {
  return AsyncStorage.multiRemove([...keys]);
}

function secureGet(key) {
  return SecureStore.getItemAsync(key)
    .then((result) => {
      result;
    })
    .catch((error) => {
      console.log(error);
    });
}

function secureSet(key, value) {
  SecureStore.setItemAsync(key, JSON.stringify(value)).catch((error) => {
    console.log(error);
  });
}

export default {
  clear,
  get,
  set,
  remove,
  multiGet,
  multiRemove,
  secureGet,
  secureSet
};
