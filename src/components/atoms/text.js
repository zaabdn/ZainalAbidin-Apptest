import React from 'react';
import {Text} from 'react-native-paper';
import PropTypes from 'prop-types';

const CText = ({numberOfLines, style, children}) => (
  <Text numberOfLines={numberOfLines} style={style}>
    {children}
  </Text>
);

CText.propTypes = {
  numberOfLines: PropTypes.number,
  style: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

export default React.memo(CText);
