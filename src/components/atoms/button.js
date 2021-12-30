import React from 'react';
import {Image} from 'react-native';
import {Button} from 'react-native-paper';
import PropTypes from 'prop-types';

const CButton = ({iconProps, buttonProps, children}) => (
  <Button
    icon={
      iconProps
        ? ({size}) => {
            return <Image style={{width: size, height: size}} {...iconProps} />;
          }
        : null
    }
    {...buttonProps}
    uppercase={false}>
    {children}
  </Button>
);

CButton.propTypes = {
  buttonProps: PropTypes.object,
  iconProps: PropTypes.object,
  children: PropTypes.any,
};

export default CButton;
