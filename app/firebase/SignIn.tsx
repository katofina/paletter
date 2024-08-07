import React from "react";
import { TextInput, Text, View, StyleSheet, Pressable } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";

export default function SignIn() {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) => console.log(JSON.stringify(values))}
      validationSchema={yup.object().shape({
        email: yup.string().email().required(),
        password: yup
          .string()
          .min(4)
          .max(10, "Password should not excced 10 chars.")
          .required(),
      })}
    >
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit,
      }) => (
        <View style={styles.formContainer}>
          <TextInput
            value={values.email}
            style={styles.inputStyle}
            onChangeText={handleChange("email")}
            onBlur={() => setFieldTouched("email")}
            placeholder="E-mail"
          />
          {touched.email && errors.email && (
            <Text style={{ fontSize: 12, color: "#FF0D10" }}>
              {errors.email}
            </Text>
          )}
          <TextInput
            value={values.password}
            style={styles.inputStyle}
            onChangeText={handleChange("password")}
            placeholder="Password"
            onBlur={() => setFieldTouched("password")}
            secureTextEntry={true}
          />
          {touched.password && errors.password && (
            <Text style={{ fontSize: 12, color: "#FF0D10" }}>
              {errors.password}
            </Text>
          )}
          <Pressable
            style={styles.signButton}
            disabled={!isValid}
            onPress={() => handleSubmit()}
          >
            <Text>Sign In</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 50,
  },
  signButton: {
    width: "auto",
    height: 50,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "antiquewhite"
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#4e4e4e",
    padding: 12,
    marginBottom: 5,
  }
});
