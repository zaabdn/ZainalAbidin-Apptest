import React, { useEffect, useState } from "react"

import { View, FlatList, StyleSheet } from "react-native"
import { useTheme, ActivityIndicator } from "react-native-paper"

import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import { SafeAreaView } from "react-native-safe-area-context"

import { useIsFocused, useNavigation } from "@react-navigation/native"

import { useDispatch } from "react-redux"

import { CButton, CParagraph, CTitle } from "../components/atoms"
import { ListItems } from "../components/moleculs"

import { Colors } from "../style"

import translations from "../asset/language"

import { getListContact } from "../utils/api"

import { setListContactById } from "../store/actions/listContactAction"

const ListContact = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const theme = useTheme()
  const [dataContact, setDataContact] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleGetContact = async () => {
    setIsLoading(true)
    try {
      const result = await getListContact()
      if (result.data) {
        setDataContact(result.data)
        setIsLoading(false)
      } else {
        setErrorMessage(result.message)
        setIsLoading(false)
      }
    } catch (error) {
      setErrorMessage(error.message)
      setIsLoading(false)
    }
  }

  const handleNavigate = (item) => {
    dispatch(setListContactById(item))
    navigation.navigate("DetailListContact")
  }

  useEffect(() => {
    handleGetContact()
  }, [isFocused])

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: theme.colors.surface }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
        }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <CTitle
            style={{
              ...theme.fonts.bold,
              fontSize: 18,
            }}>
            {translations.contacts}
          </CTitle>
        </View>
      </View>
      <View>
        {isLoading ? (
          <ActivityIndicator size={28} style={{ marginTop: 12 }} />
        ) : (
          <FlatList
            data={dataContact}
            onRefresh={handleGetContact}
            refreshing={false}
            renderItem={({ item, index }) => {
              return <ListItems key={index} data={item} onPress={() => handleNavigate(item)} />
            }}
            keyExtractor={(item, index) => item?.id ?? index.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  height: hp(100) - 80,
                  paddingHorizontal: 20,
                }}>
                <CTitle style={{ marginTop: 37 }} size={18}>
                  {translations.contactEmpty}
                </CTitle>
                <CParagraph style={{ textAlign: "center", marginTop: 12 }}>{translations.descContactEmpty}</CParagraph>
                <CButton
                  buttonProps={{
                    onPress: () => navigation.navigate("FormContact"),
                    mode: "contained",
                    style: { marginTop: 32, backgroundColor: Colors.PRIMARY },
                    labelStyle: { letterSpacing: 0, color: Colors.WHITE },
                    contentStyle: { height: 44 },
                  }}>
                  {translations.newContact}
                </CButton>
              </View>
            }
            ListHeaderComponent={
              dataContact.length > 0 && (
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    zIndex: 1,
                  }}>
                  <CButton
                    buttonProps={{
                      mode: "contained",
                      style: {
                        borderRadius: 20,
                        backgroundColor: Colors.PRIMARY_LIGHT,
                      },
                      labelStyle: {
                        fontWeight: "bold",
                        color: Colors.PRIMARY,
                        marginLeft: 8,
                        letterSpacing: -0.24,
                      },
                      contentStyle: { height: 40 },
                      onPress: () => {
                        navigation.navigate("FormContact")
                      },
                    }}>
                    {translations.newContact}
                  </CButton>
                </View>
              )
            }
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ListContact
