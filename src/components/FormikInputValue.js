import React from 'react';
import { useField } from 'formik';
import { TextInput, Text,StyleSheet } from 'react-native';

export const FormikInputValue = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    return (
      <>
        <TextInput
          error={meta.error}
          style={styles.input}
          value={field.value}
          onChangeText={(value) => helpers.setValue(value)}
          {...props}
        />
        {meta.error && <Text style={styles.error}>{meta.error}</Text>}
      </>
    );

    
  };
  const styles = StyleSheet.create({
    input: {
      width: "100%",
      height: 40,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 15,
      color: "black",
    },
   error: {
      color: "red",
      marginBottom: 20,
      marginTop: -10,
      fontSize: 12,
    },
  });