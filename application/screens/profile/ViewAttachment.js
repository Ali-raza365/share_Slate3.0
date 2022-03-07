import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import { WebView } from 'react-native-webview';
import { AppBar, Spinner } from '../../components';
import { COLORS, HP, WP } from '../../theme/config';

const ViewAttachment = ({route}) => {

    const {url} = route.params;
    const DOCS_URL = "https://docs.google.com/gview?embedded=true&url=";
    
    let uri = '';
    if(url.includes('.pdf')){
        let tempurl = url.replace('https://','');
        uri = DOCS_URL + tempurl;
    }
    else{
        uri= url;
    }
    

    return(
        <View style={Styles._mainContainer}>
            <AppBar 
                type='light'
                backgroundColor={COLORS.primaryColor2}
            />
            <WebView 
                source={{ uri: uri }} 
                startInLoadingState={true}
                renderLoading={() => {
                    return(
                        <View style={{
                            position: 'absolute',
                            alignSelf: 'center',
                            top: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Spinner
                                color={COLORS.primaryColor}
                            />
                        </View>
                    );
                }}
                injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                scalesPageToFit={false}
            />
        </View>
    );
}

const Styles = StyleSheet.create({
    _mainContainer: {
        flex: 1,
    },
    _webView:{
        flex: 1,
        width: WP('100%'),
        height: HP('100%'),
    }
});

export default ViewAttachment;