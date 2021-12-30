import React, { useState } from "react"

import { SafeAreaView, ScrollView, View, TouchableOpacity, Image, StyleSheet } from "react-native"
import { useTheme } from "react-native-paper"

import { useSelector } from "react-redux"

import { heightPercentageToDP as hp } from "react-native-responsive-screen"

import { useFormik } from "formik"
import * as Yup from "yup"

import { getPostContact, getPutContact } from "../utils/api"

import { Colors } from "../style"

import translations from "../asset/language"

import { IcBackBlack } from "../asset/images"

import { CText, CTextInput, CCaption } from "../components/atoms"

const FormContact = ({ route, navigation }) => {
  const theme = useTheme()

  const [errorMessage, setErrorMessage] = useState("")

  const inputTheme = {
    colors: {
      background: Colors.WHITE,
    },
  }

  const { contacts } = useSelector((state) => state.contactReducers)

  const onAdd = async (data) => {
    try {
      const result = await getPostContact(data)

      if (result.data) {
        navigation.navigate("ListContact")
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onEdit = async (data) => {
    try {
      const result = await getPutContact(contacts?.id, data)
      if (result.data) {
        navigation.navigate("ListContact")
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {}
  }

  const formik = useFormik({
    initialValues: {
      firstName: contacts?.firstName ?? "",
      lastName: contacts?.lastName ?? "",
      age: contacts?.age ?? 0,
      photo: contacts?.photo ?? "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(translations["groupcall.caption.required"]),
      lastName: Yup.string().required(translations["groupcall.caption.required"]),
      age: Yup.number().required(translations["groupcall.caption.required"]),
      photo: Yup.string().required(translations["groupcall.caption.required"]),
    }),
    onSubmit: async (values) => {
      if (formik.values.firstName.length < 3) {
        setErrorMessage("First name must be at least 3 character length")
      } else if (formik.values.lastName.length < 3) {
        setErrorMessage("Last name must be at least 3 character length")
      } else if (formik.values.age < 1) {
        setErrorMessage("Age must be larger than or equal to 1")
      } else {
        setErrorMessage("")
        if (contacts?.id) {
          await onEdit(values)
        } else {
          await onAdd(values)
        }
      }
    },
  })

  const isDisabled =
    formik.isSubmitting ||
    Object.keys(formik.errors).length ||
    !formik.values.firstName ||
    !formik.values.lastName ||
    !formik.values.age ||
    !formik.values.photo

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.surface }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 20,
          height: hp("8%"),
        }}>
        <TouchableOpacity onPress={handleBack}>
          <Image source={IcBackBlack} style={styles.image} />
        </TouchableOpacity>
        <CText style={{ ...theme.fonts.bold, fontSize: 18 }}>
          {contacts?.id ? translations.update : translations.new}
        </CText>
        <TouchableOpacity disabled={isDisabled} onPress={formik.handleSubmit}>
          <CText
            style={{
              ...theme.fonts.medium,
              fontSize: 16,
              color: isDisabled ? Colors.GRAY_MEDIUM : Colors.PRIMARY,
            }}>
            {translations.save}
          </CText>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 20,
            borderBottomWidth: 8,
            borderBottomColor: Colors.GREY_LIGHT,
          }}>
          <CText style={{ ...theme.fonts.bold }}>
            {translations.firstname}
            <CText style={{ color: Colors.RED_LIGHT }}>*</CText>
          </CText>
          <CTextInput
            inputProps={{
              name: "firstName",
              onChangeText: formik.handleChange("firstName"),
              onBlur: formik.handleBlur("firstName"),
              value: formik.values.firstName,
              mode: "outlined",
              returnKeyType: "next",
              placeholder: translations["class.name.placeholder"],
              underlineColor: "transparent",
              theme: inputTheme,
              style: { fontSize: 14 },
              dense: true,
            }}
          />
          {formik.errors.firstName && formik.touched.firstName && <CCaption>{formik.errors.firstName}</CCaption>}

          <CText style={{ ...theme.fonts.bold, marginTop: 12 }}>
            {translations.lastname}
            <CText style={{ color: Colors.RED_LIGHT }}>*</CText>
          </CText>
          <CTextInput
            inputProps={{
              name: "lastName",
              onChangeText: formik.handleChange("lastName"),
              onBlur: formik.handleBlur("lastName"),
              value: formik.values.lastName,
              mode: "outlined",
              returnKeyType: "next",
              placeholder: translations["class.name.placeholder"],
              underlineColor: "transparent",
              theme: inputTheme,
              style: { fontSize: 14 },
              dense: true,
            }}
          />
          {formik.errors.lastName && formik.touched.lastName && <CCaption>{formik.errors.lastName}</CCaption>}
        </View>

        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 20,
            borderBottomWidth: 8,
            borderBottomColor: Colors.GREY_LIGHT,
          }}>
          <CText style={{ ...theme.fonts.bold, marginTop: 12 }}>
            {translations.age}
            <CText style={{ color: Colors.RED_LIGHT }}>*</CText>
          </CText>
          <CTextInput
            inputProps={{
              name: "age",
              onChangeText: formik.handleChange("age"),
              onBlur: formik.handleBlur("age"),
              value: formik.values.age ? formik.values.age.toString() : "",
              mode: "outlined",
              keyboardType: "numeric",
              returnKeyType: "next",
              placeholder: translations["class.name.placeholder"],
              underlineColor: "transparent",
              theme: inputTheme,
              style: { fontSize: 14 },
              dense: true,
            }}
          />
          {formik.errors.age && formik.touched.age && <CCaption>{formik.errors.age}</CCaption>}

          <CText style={{ ...theme.fonts.bold, marginTop: 12 }}>
            {translations.photo}
            <CText style={{ color: Colors.RED_LIGHT }}>*</CText>
          </CText>
          <CTextInput
            inputProps={{
              name: "photo",
              onChangeText: formik.handleChange("photo"),
              onBlur: formik.handleBlur("photo"),
              value: formik.values.photo,
              mode: "outlined",
              placeholder: translations["class.name.placeholder"],
              underlineColor: "transparent",
              theme: inputTheme,
              style: { fontSize: 14 },
              dense: true,
            }}
          />
          {formik.errors.photo && formik.touched.photo && <CCaption>{formik.errors.photo}</CCaption>}
        </View>
      </ScrollView>

      {errorMessage !== "" && (
        <CText style={{ marginTop: 12, paddingHorizontal: 20, color: Colors.RED_ROSE, paddingBottom: 10 }}>
          {errorMessage}
        </CText>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  image: {
    height: hp("2%"),
    width: hp("2%"),
    resizeMode: "contain",
    marginLeft: 20,
  },
})

export default FormContact
