import React, { useState } from "react"

import { View, StyleSheet, Image } from "react-native"
import { Avatar, useTheme } from "react-native-paper"

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, useSelector } from "react-redux"
import { TouchableOpacity } from "react-native-gesture-handler"

import { useNavigation } from "@react-navigation/native"

import { CButton, CDialog, CParagraph, CText } from "../components/atoms"

import { Colors } from "../style"

import translations from "../asset/language"
import { IcBackBlack, IcEdit, IcDelete } from "../asset/images"

import { getDeleteContact } from "../utils/api"

import { setListContactById } from "../store/actions/listContactAction"

const DetailListContact = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const theme = useTheme()
  const [errorMessage, setErrorMessage] = useState("")
  const [dialogActive, setDialogActive] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const { contacts } = useSelector((state) => state.contactReducers)

  const handleDeleteContact = async () => {
    setIsLoading(true)
    try {
      const result = await getDeleteContact(contacts?.id)
      if (result.data) {
        setIsLoading(false)
        setDialogActive({ status: false })
        handleBack()
      } else {
        setErrorMessage(result.message)
        setIsLoading(false)
      }
    } catch (error) {
      setErrorMessage(error.message)
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    dispatch(setListContactById({}))
    navigation.goBack()
  }

  const handleNavigateEdit = () => {
    navigation.navigate("FormContact")
  }

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: theme.colors.surface }}>
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
        <CText style={{ ...theme.fonts.bold, fontSize: 18 }}>{translations.contacts}</CText>
        <TouchableOpacity>
          <CText
            style={{
              ...theme.fonts.medium,
              fontSize: 16,
              color: Colors.PRIMARY,
              opacity: 0,
            }}>
            {translations.save}
          </CText>
        </TouchableOpacity>
      </View>
      <View>
        <View
          style={{
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 20,
          }}>
          <Avatar.Image size={wp(32)} source={{ uri: contacts?.photo }} />
          <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-between" }}>
            <TouchableOpacity onPress={handleNavigateEdit}>
              <Image source={IcEdit} style={[styles.imageIcon, { marginRight: 20 }]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDialogActive({ status: true })}>
              <Image source={IcDelete} style={styles.imageIcon} />
            </TouchableOpacity>
          </View>
          <CText
            numberOfLines={1}
            style={{
              color: "black",
              marginTop: 16,
              fontSize: 16,
            }}>
            {`${contacts?.firstName} ${contacts?.lastName}`}
          </CText>
          <CText
            numberOfLines={1}
            style={{
              marginTop: 4,
              fontSize: 12,
              color: Colors.GRAY_DARK,
            }}>
            {`Age ${contacts?.age}`}
          </CText>
        </View>
      </View>
      <CDialog
        visible={dialogActive?.status}
        content={
          dialogActive && (
            <>
              <CText
                style={{
                  ...theme.fonts.bold,
                  fontSize: 18,
                  marginBottom: 2,
                  color: "black",
                }}>
                {translations.titleModal}
              </CText>

              <CParagraph>{translations.descModal}</CParagraph>
              {errorMessage !== "" && (
                <CParagraph style={{ marginTop: 12, color: Colors.RED_ROSE }}>{errorMessage}</CParagraph>
              )}
            </>
          )
        }
        actions={
          dialogActive && (
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <CButton
                buttonProps={{
                  mode: "outlined",
                  style: {
                    borderColor: isLoading ? Colors.GRAY_MEDIUM : Colors.PRIMARY,
                  },
                  labelStyle: { letterSpacing: 0, marginTop: 5 },
                  contentStyle: { height: 32 },
                  disabled: isLoading,
                  onPress: () => setDialogActive((prev) => ({ ...prev, status: false })),
                }}>
                {translations.cancel}
              </CButton>
              <CButton
                buttonProps={{
                  mode: "outlined",
                  style: {
                    borderColor: Colors.PRIMARY,
                    backgroundColor: Colors.PRIMARY,
                    marginLeft: 8,
                    marginRight: 4,
                  },
                  labelStyle: { color: Colors.WHITE, letterSpacing: 0, marginTop: 5 },
                  contentStyle: { height: 32 },
                  disabled: isLoading,
                  loading: isLoading,
                  onPress: () => {
                    handleDeleteContact()
                  },
                }}>
                OK
              </CButton>
            </View>
          )
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: hp("2%"),
    width: hp("2%"),
    resizeMode: "contain",
    marginLeft: 20,
  },
  imageIcon: {
    height: hp("3%"),
    width: hp("3%"),
    resizeMode: "contain",
  },
})

export default DetailListContact
