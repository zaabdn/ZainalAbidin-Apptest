import React from "react"
import { Paragraph } from "react-native-paper"
import PropTypes from "prop-types"

const CParagraph = ({ numberOfLines, style, children }) => (
  <Paragraph numberOfLines={numberOfLines} style={style}>
    {children}
  </Paragraph>
)

CParagraph.propTypes = {
  numberOfLines: PropTypes.number,
  style: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
}

export default React.memo(CParagraph)
