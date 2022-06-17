import React from 'react';
import { View, Text, StyleSheet, Button, AppRegistry } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import cupsStore from './stores/cupsStore';
import { observer } from 'mobx-react';
import notifee, {
  EventType,
  TriggerType,
  TimeUnit,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cupsData from './cups';

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  if (type === EventType.PRESS) {
    let cups = await AsyncStorage.getItem('cups');
    if (cups !== null) {
      cups = JSON.parse(cups);
      const availableCup = cups.find((cup) => !cup.drank);
      if (availableCup) {
        availableCup.drank = true;
        await AsyncStorage.setItem('cups', JSON.stringify(cups));
      } else {
        await AsyncStorage.setItem('cups', JSON.stringify(cupsData));
      }
    }

    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});

notifee.onForegroundEvent(({ type, detail }) => {
  if (type === EventType.PRESS) {
    cupsStore.drinkCup();
  }
});

const App = () => {
  const cups = cupsStore.cups;

  async function onCreateTriggerNotification() {
    try {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      await notifee.createTriggerNotification(
        {
          id: 'default',
          title: 'Reminder',
          body: 'Drink a cup of water!',
          android: {
            channelId,
          },
        },
        {
          type: TriggerType.INTERVAL,
          interval: 15,
          timeUnit: TimeUnit.MINUTES,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Start!" onPress={onCreateTriggerNotification} />
      <View>
        <Text style={styles.ml}>{cupsStore.getRemainingCups()}ml</Text>

        <Text style={styles.label}>Drink Water!</Text>
      </View>

      <View style={styles.cups}>
        {cups.map((cup) => (
          <MaterialCommunityIcons
            key={cup.id}
            name="cup"
            size={32}
            color={cup.drank ? theme.colors.blue90 : theme.colors.gray80}
          />
        ))}
      </View>

      <Text style={styles.percentage}>{cupsStore.getPercentage()}%</Text>
    </View>
  );
};

export default observer(App);
AppRegistry.registerComponent('App', () => App);
export const theme = {
  colors: {
    gray100: '#212028',
    gray80: '#2f2e3a',

    blue100: '#0051dc',
    blue90: '#0087dc',
    blue70: '#32BAFA',
  },
};

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    top: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    width: '100%',
  },
  ml: {
    color: theme.colors.blue90,
    fontSize: 48,
    textAlign: 'center',
  },
  label: {
    color: theme.colors.blue90,
    fontSize: 13,
    textAlign: 'center',
  },
  percentage: {
    fontSize: 112,
    color: theme.colors.blue100,
    marginTop: 50,
  },
  cups: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});
