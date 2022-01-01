import AsyncStorage from "@react-native-async-storage/async-storage";

export const KEY = "refueling-data";

export const _storeData = async (newData) => {
  const updatedData = await _retrieveData();
  updatedData.unshift(newData);
  const data = AsyncStorage.setItem(KEY, JSON.stringify(updatedData));
};

const sortBasedOnTimestamp = (data1, data2) => {
  return data1.date < data2.date ? 1 : -1;
};

export const _retrieveData = async () => {
  let data = [];
  await AsyncStorage.getItem(KEY)
    .then((value) => {
      if (value) {
        data = JSON.parse(value);
        data = data.sort(sortBasedOnTimestamp);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
};
