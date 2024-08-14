import React, { useState } from "react";
import { TextInput, Text, View, StyleSheet, Pressable } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { useNavigation } from "expo-router";
import auth from "@react-native-firebase/auth";

export default function SignIn(): React.JSX.Element {
  const navigate = useNavigation();
  const [error, setError] = useState("");
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async (values) => {
        try {
          auth().signInWithEmailAndPassword(values.email, values.password);
          navigate.goBack();
        } catch (error) {
          setError(error as string);
        }
      }}
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
          {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
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
    backgroundColor: "antiquewhite",
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#4e4e4e",
    padding: 12,
    marginBottom: 5,
  },
});
