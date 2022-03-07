import React from 'react';
import {
    ActivityIndicator
} from 'react-native';
import { SPINNER_SIZE } from '../theme/config';

const Spinner = ({color, style}) => {
    return(
        <ActivityIndicator
            size={SPINNER_SIZE}
            color={color}
            style={style}
        />
    );
}

export default Spinner;