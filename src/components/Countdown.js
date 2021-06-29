import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fontSize, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMillis = (min) => min * 1000 * 60;

const formatTime = (min) => (min < 10 ? `0${min}` : min);

export const Countdown = ({ minutes = 20, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);
  const [millis, setMillis] = useState(minutesToMillis(minutes));

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
    if (millis === 0) {
      onEnd();
    }
  }, [millis])

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    fontSize: fontSize.xxxl,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.5)',
  },
});
