import React from 'react';
import { useField } from 'formik';
import { TextInput, Text, StyleSheet, View } from 'react-native';

export const FormikInputValue = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, meta.error && styles.inputError]}
        value={field.value}
        onChangeText={helpers.setValue}
        {...props}
      />
      {meta.error && (
        <Text style={styles.errorText} testID={`error-${name}`}>
          {meta.error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
