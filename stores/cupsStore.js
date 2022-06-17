import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable } from 'mobx';

class CupsStore {
  constructor() {
    makeAutoObservable(this);
  }

  cups = [];

  getRemainingCups() {
    return 3700 - this.cups.filter((cup) => cup.drank).length * 370;
  }

  getPercentage() {
    return (
      (this.cups.filter((cup) => cup.drank).length / this.cups.length) * 100
    );
  }

  fetchCups = async () => {
    try {
      const response = await AsyncStorage.getItem('cups');
      if (response !== null) {
        this.cups = JSON.parse(response);
      } else {
        this.cups = [
          {
            id: 1,
            drank: false,
          },
          {
            id: 2,
            drank: false,
          },
          {
            id: 3,
            drank: false,
          },
          {
            id: 4,
            drank: false,
          },
          {
            id: 5,
            drank: false,
          },
          {
            id: 6,
            drank: false,
          },
          {
            id: 7,
            drank: false,
          },
          {
            id: 8,
            drank: false,
          },
          {
            id: 9,
            drank: false,
          },
          {
            id: 10,
            drank: false,
          },
        ];
        await AsyncStorage.setItem('cups', JSON.stringify(this.cups));
      }
    } catch (error) {
      console.log(error);
    }
  };
}

const cupsStore = new CupsStore();
cupsStore.fetchCups();
export default cupsStore;
