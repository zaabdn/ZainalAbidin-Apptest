import React from 'react';
import {TextInput} from 'react-native-paper';
import PropTypes from 'prop-types';

const CTextInput = ({inputProps, forwardRef}) => {
  return <TextInput ref={forwardRef} {...inputProps} />;
};

CTextInput.propTypes = {
  forwardRef: PropTypes.any,
  inputProps: PropTypes.object,
};

export default CTextInput;
