import React, { useState } from 'react';
import { Text, View, StyleSheet, Vibration, Platform } from 'react-native';
import Constants from 'expo-constants';
import { colors } from '../../utils/colors';
import { spacing, fontSize } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';
import { STATUSES } from '../../utils/constants';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onFocusEnd }) => {
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  useKeepAwake();

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.virate(), 1000);
      setTimeout(() => clearInterval(interval), 1000);
    } else {
      Vibration.vibrate(1000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onFocusEnd(STATUSES.COMPLETE);
  };

  const clearSubject = () => {
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    if (isStarted) {
      setIsStarted(false);
      onFocusEnd(STATUSES.CANCELLED);
    } else {
      onFocusEnd();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={styles.subject}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.progress}>
        <ProgressBar
          color={colors.blue}
          style={{ height: 10 }}
          progress={progress}
        />
      </View>
      <View style={styles.button}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.button}>
        <RoundedButton
          title={isStarted ? 'Pause' : 'Start'}
          onPress={() => setIsStarted(!isStarted)}
        />
      </View>
      <View style={styles.cancelButton}>
        <RoundedButton size={50} title={'-'} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    marginTop: spacing.xxxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subject: {
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  progress: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  cancelButton: {
    paddingBottom: spacing.md,
    paddingLeft: spacing.md,
  },
});
