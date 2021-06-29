import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSize, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

const HistoryItem = ({ item }) => {
  return (
    <View>
      <Text style={styles.item(item.status)}>{item.subject}</Text>
    </View>
  );
};

export const FocusList = ({ focusSubjects, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <SafeAreaView style={styles.container}>
      {focusSubjects.length > 0 && (
        <>
          <View>
            <Text style={styles.subtitle}>Things focused on:</Text>
          </View>
          <View>
            <FlatList
              style={styles.list}
              data={focusSubjects}
              renderItem={({ item }) => (
                <HistoryItem item={item} key={item.subject} />
              )}
            />
          </View>
          <View style={styles.button}>
            <RoundedButton
              size={50}
              title="Reset"
              onPress={() => clearHistory()}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  subtitle: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  list: {
    marginTop: spacing.sm,
    color: colors.white,
  },
  item: (status) => ({
    textAlign: 'center',
    paddingLeft: 0,
    color: status === 1 ? colors.green : colors.red,
  }),
  button: {
    marginTop: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
