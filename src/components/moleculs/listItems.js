import React from "react"
import { TouchableOpacity, View } from "react-native"
import { useTheme, Avatar } from "react-native-paper"
import { Colors } from "../../style"
import { CText } from "../atoms"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import PropTypes from "prop-types"

const ListItems = ({ data, onPress }) => {
  const theme = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: theme.colors.surface,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.GREY_LIGHT,
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 8,
          paddingHorizontal: 20,
        }}>
        <Avatar.Image size={wp(12)} source={{ uri: data?.photo }} />
        <View
          style={{
            flex: 1,
            marginLeft: 12,
            justifyContent: "center",
          }}>
          <CText
            numberOfLines={1}
            style={{
              color: "black",
            }}>
            {`${data?.firstName} ${data?.lastName}`}
          </CText>
          <CText
            numberOfLines={1}
            style={{
              marginTop: 4,
              fontSize: 12,
              color: Colors.GRAY_DARK,
            }}>
            {`Age ${data?.age}`}
          </CText>
        </View>
      </View>
    </TouchableOpacity>
  )
}

ListItems.propTypes = {
  data: PropTypes.any,
  onPress: PropTypes.func,
}

export default ListItems
