import React from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const CImage = ({style, source, isSquare, width, height}) => (
  <Image
    source={source}
    style={{
      ...style,
      width: wp(width),
      height: isSquare ? wp(width) : wp(height),
    }}
  />
);

CImage.propTypes = {
  style: PropTypes.object,
  isSquare: PropTypes.bool.isRequired,
  source: PropTypes.any.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number,
};

CImage.defaultProps = {
  isSquare: false,
  height: 5.1,
};

export default React.memo(CImage);
