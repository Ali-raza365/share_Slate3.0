import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { Store } from './application/redux/Store';
import Root from './application/navigation/Root';
import CustomLinking from './application/utils/customLinking';
import { _getItem, _setItem } from './application/utils/async';
import { MenuProvider } from 'react-native-popup-menu';

const App = () => {

    // checking for info modal
    const _maintainingInfoModalState = async () => {
        await _getItem('invoicesInfo')
            .then(async (value) => {
                if (value == null || value == undefined) {
                    await _setItem('invoicesInfo', '1')
                        .then(() => { })
                        .catch((err) => {
                            alert(err);
                        })
                }
            })
            .catch((err) => {
                alert(err);
            })
    }

    useEffect(() => {
        _maintainingInfoModalState();
    }, [])

    return (
        <MenuProvider>
            <Provider store={Store}>
                <NavigationContainer>
                    <Root />
                </NavigationContainer>
            </Provider>
        </MenuProvider>
    );
};

export default App;
