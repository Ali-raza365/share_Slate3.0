import React, {useRef} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Animated,
} from 'react-native';

import { _gotoAuthStack } from '../../navigation/NavigationService';
import {
    COLORS, 
    TEXT_SIZES, 
    FONT, 
    MOBILE_WIDTH, 
    ONBOARD_DATA,
    SPACING_PERCENT, 
    WP,
    HP,
    RADIUS,
} from '../../theme/config';
import { AppBar } from '../../components';
import { _setItem } from '../../utils/async';

const Onboard = ({navigation}) => {

    const scrollX = useRef(new Animated.Value(0)).current;
    let position = Animated.divide(scrollX, MOBILE_WIDTH + SPACING_PERCENT * 2);

    //On Skip Click
    const _onSkipClick = () => {
        _setItem('onboard', '1')
        .then(()=>{
            _gotoAuthStack(navigation);
        })
        .catch((err)=>{
            alert(err);
        })
    }

    return(
        <View style={Styles._mainContainer}>
            
            <AppBar 
                type='dark'
                backgroundColor={COLORS.whiteColor}
                hidden={true}
            />

            {/* Skip Button */}
            <TouchableOpacity
                onPress={()=>{ _onSkipClick() }}
                style={Styles._skipBtn}
            >
                <Text style={Styles._skipText}>Skip</Text>
            </TouchableOpacity>

            <Animated.FlatList
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={true}
                scrollEventThrottle={16}
                decelerationRate={'fast'}
                snapToInterval={WP('100%')}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } }}],
                    { useNativeDriver: false }
                )}
                style={{ flexGrow: 0 }}
                contentContainerStyle={Styles._scrollContainer}
                data={ONBOARD_DATA}
                keyExtractor={item => item.key}
                renderItem={({item, index})=>{

                    const inputRange = [
                        (index - 1) * (WP('100%')),
                        index * (WP('100%')),
                        (index + 1) * (WP('100%'))
                    ];

                    const translateX = scrollX.interpolate({
                        inputRange,
                        outputRange: [ WP('100%'), 0, -WP('100%')]
                    });

                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.5, 1, 0.5]
                    })

                    return(
                        <View style={Styles._itemContainer}>
                            <Animated.Image source={item.image} style={[Styles._image,{transform:[{scale}]}]} />
                            <Animated.Text style={[Styles._title,{transform: [{translateX}]}]}>{item.title}</Animated.Text>
                            {
                                item.bullets.map((bullet)=>{
                                    return(
                                        <Animated.Text style={[Styles._bullet, {transform: [{translateX}]}]}>{'\u2022  ' + bullet.bullet}</Animated.Text>
                                    );
                                })
                            }
                        </View>
                    );
                }}
            />

            {/* Rendering Dots */}
            <View style={Styles._dotsView}>
                {
                    ONBOARD_DATA.map((_, i) => {
                        let opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
                            outputRange: [0.3, 1, 0.3], // when position is not i, the opacity of the dot will animate to 0.3
                            extrapolate: 'clamp' // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3)
                        });

                        let width = position.interpolate({
                            inputRange: [i-1, i, i+1],
                            outputRange: [10, 35, 10],
                            extrapolate: 'clamp'
                        });

                        return (
                        <Animated.View
                            key={i}
                            style={{
                                opacity: opacity,
                                height: 10, 
                                width: width, 
                                backgroundColor: COLORS.primaryColor, 
                                margin: WP(SPACING_PERCENT/2), 
                                borderRadius: WP(RADIUS)
                            }}
                        />
                        );
                    })
                }
            </View>
            
        </View>
    );
}

const Styles = StyleSheet.create({
    _mainContainer:{
        flex: 1,
    },
    _skipBtn:{
        position: 'absolute',
        top: WP(SPACING_PERCENT*2),
        right: WP(SPACING_PERCENT),
        zIndex: 1,
    },
    _skipText:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_2),
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: COLORS.lightGrey,
    },
    _scrollContainer:{
        
    },
    _itemContainer:{
        width: WP('100%'),
        height: HP('100%'),
        padding: WP(SPACING_PERCENT),
        justifyContent: 'center',
    },
    _image:{
        width: WP('70%'),
        height: HP('30%'),
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    _title:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.h1),
        color: COLORS.primaryColor,
        fontWeight: '800',
        marginTop: HP(SPACING_PERCENT),
    },
    _bullet:{
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1),
        color: COLORS.lightGrey,
        marginTop: HP(SPACING_PERCENT/5),
    },
    _dotsView:{
        flexDirection: 'row',
        position: 'absolute',
        alignSelf: 'center',
        bottom: HP(SPACING_PERCENT)
    },
});

export default Onboard;