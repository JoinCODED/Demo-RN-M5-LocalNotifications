import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import cupsStore from './stores/cupsStore';
import { observer } from 'mobx-react';

const App = () => {
  const cups = cupsStore.cups;
  return (
    <View style={styles.container}>
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
