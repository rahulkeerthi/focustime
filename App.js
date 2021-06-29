import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import { spacing } from './src/utils/sizes';
import { colors } from './src/utils/colors';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusSubjects, setFocusSubjects] = useState([]);

  const onFocusEnd = (status) => {
    if (!status) {
      setFocusSubject(null);
      return
    }
    setFocusSubjects([...focusSubjects, { subject: focusSubject, status }]);
    setFocusSubject(null);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusSubjects))
    } catch (e) {
      console.log(e)
    }
  }
  
  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory')
      if (history && JSON.parse(history).length) {
        setFocusSubjects(JSON.parse(history))
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    loadFocusHistory()
  }, [])

  useEffect(() => {
    saveFocusHistory()
  }, [focusSubjects])



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
        {focusSubject ? (
          <Timer focusSubject={focusSubject} onFocusEnd={onFocusEnd} />
        ) : (
          <Focus
            addSubject={setFocusSubject}
            focusSubjects={focusSubjects}
            onFocusSubjectsClear={() => setFocusSubjects([])}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  bodyContainer: {
    flex: 1,
    padding: spacing.md,
  },
});
