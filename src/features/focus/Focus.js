import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSize, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { FocusList } from './FocusList';

export const Focus = ({ addSubject, focusSubjects, onFocusSubjectsClear }) => {
  const [text, setText] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            onSubmitEditing={({ nativeEvent }) => setText(nativeEvent.text)}
          />
          <RoundedButton title="+" size={50} onPress={() => addSubject(text)} />
        </View>
      </View>
      <View style={styles.focusListContainer}>
        <FocusList
          focusSubjects={focusSubjects}
          onClear={onFocusSubjectsClear}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    marginTop: spacing.xxxl,
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSize.xl,
    textAlign: 'center',
  },
  textInput: {
    flex: 1,
    marginRight: spacing.lg,
  },
  inputContainer: {
    paddingTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  focusListContainer: {
    paddingTop: spacing.xxl,
  },
});
