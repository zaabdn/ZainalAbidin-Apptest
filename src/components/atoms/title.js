import React from "react"
import { useTheme, Title } from "react-native-paper"
import PropTypes from "prop-types"

const CTitle = ({ numberOfLines, style, size, children }) => {
  const theme = useTheme()

  return (
    <Title numberOfLines={numberOfLines} style={{ ...theme.fonts.bold, ...style, fontSize: size }}>
      {children}
    </Title>
  )
}

CTitle.propTypes = {
  numberOfLines: PropTypes.number,
  style: PropTypes.object,
  size: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
}

CTitle.defaultProps = {
  size: 24,
}

export default React.memo(CTitle)
