import "react-native-gesture-handler"

import { GestureHandlerRootView } from "react-native-gesture-handler"

import React from "react"

import { configureFonts, DefaultTheme, Provider as ThemeProvider } from "react-native-paper"

import { Provider } from "react-redux"

import { SafeAreaProvider } from "react-native-safe-area-context"

import { LocalizationProvider } from "./src/utils/LocalizationContext"

import store from "./src/store"
import RootNavigator from "./src/navigations"
import { Colors } from "./src/style"

const App = () => {
  const fontConfig = {
    default: {
      regular: {
        fontFamily: "GoogleSans-Regular",
        fontWeight: "normal",
      },
      medium: {
        fontFamily: "GoogleSans-Medium",
        fontWeight: "normal",
      },
      light: {
        fontFamily: "GoogleSans-Regular",
        fontWeight: "normal",
      },
      thin: {
        fontFamily: "GoogleSans-Regular",
        fontWeight: "normal",
      },
      bold: {
        fontFamily: "GoogleSans-Bold",
        fontWeight: "normal",
      },
    },
    ios: {
      regular: {
        fontFamily: "GoogleSans-Regular",
        fontWeight: "400",
      },
      medium: {
        fontFamily: "GoogleSans-Medium",
        fontWeight: "500",
      },
      light: {
        fontFamily: "GoogleSans-Regular",
        fontWeight: "300",
      },
      thin: {
        fontFamily: "GoogleSans-Regular",
        fontWeight: "100",
      },
      bold: {
        fontFamily: "GoogleSans-Bold",
        fontWeight: "700",
      },
    },
  }

  const theme = {
    ...DefaultTheme,
    fonts: configureFonts(fontConfig),
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.PRIMARY,
      text: Colors.BLACK,
      disabled: Colors.GRAY_LIGHT,
      placeholder: Colors.GRAY_LIGHT,
      error: Colors.DANGER,
    },
  }
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <LocalizationProvider>
          <ThemeProvider theme={theme}>
            <RootNavigator />
          </ThemeProvider>
        </LocalizationProvider>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App
