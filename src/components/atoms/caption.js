import React from "react"
import { useTheme, Caption } from "react-native-paper"
import PropTypes from "prop-types"

const CCaption = ({ error, children }) => {
  const theme = useTheme()

  return <Caption style={{ color: error ? theme.colors.error : theme.colors.primary }}>{children}</Caption>
}

CCaption.propTypes = {
  error: PropTypes.bool,
  children: PropTypes.string.isRequired,
}

CCaption.defaultProps = {
  error: true,
}

export default React.memo(CCaption)
