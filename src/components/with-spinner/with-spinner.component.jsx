import React from 'react';
import {SpinnerContainer,SpinnerOverlay} from './with-spinner.styles';

const withSpinner = WrapperComponent =>{
    const Spinner = ({isLoading , ...otherprops}) =>{
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>
        ):<WrapperComponent {...otherprops} />
    }
    return Spinner;
}

export default withSpinner;