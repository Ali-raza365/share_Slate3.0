import React, { useRef } from 'react';
import {
    FlatList,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
    Animated
} from 'react-native';
const { width } = Dimensions.get('window');
// import Header from './components/Header';
// import ListItem from './components/ListItem';
// import { generateData } from './data';

const headerHeight = 58 * 2;
const colors = [
    '#FC8181',
    '#F6AD55',
    '#F6E05E',
    '#68D391',
    '#4FD1C5',
    '#63B3ED',
    '#7F9CF5',
    '#B794F4',
    '#F687B3',
];

export const firstNames = [
    'Adam',
    'Alex',
    'Aaron',
    'Ben',
    'Carl',
    'Dan',
    'David',
    'Edward',
    'Fred',
    'Frank',
    'George',
    'Hal',
    'Hank',
    'Ike',
    'John',
    'Jack',
    'Joe',
    'Larry',
    'Monte',
    'Matthew',
    'Mark',
    'Nathan',
];

const lastNames = [
    'Anderson',
    'Ashwoon',
    'Aikin',
    'Bateman',
    'Bongard',
    'Bowers',
    'Boyd',
    'Cannon',
    'Cast',
    'Deitz',
    'Dewalt',
    'Ebner',
    'Frick',
    'Hancock',
    'Haworth',
    'Hesch',
    'Hoffman',
    'Kassing',
    'Knutson',
];

const messages = [
    'Can we go to the park.',
    'Where is the black dog? Said the purple bird.',
    'We can make the bird fly away if we jump on something.',
    'We can go down to the store with the dog. It is not too far away.',
    'My big yellow cat ate the little black bird.',
    'I like to read my book at school.',
    'We are going to swim at the park.',
];

export const generateData = (count = 50) =>
    Array(count)
        .fill()
        .map((_, index) => ({
            name:
                firstNames[Math.floor(Math.random() * firstNames.length)] +
                ' ' +
                lastNames[Math.floor(Math.random() * lastNames.length)],
            color: colors[Math.floor(Math.random() * colors.length)],
            message: messages[Math.floor(Math.random() * messages.length)],
            key: index,
        }));

const ListItem = (props) => {
    const { item } = props;
    const { name, color, message } = item;
    return (
        <TouchableOpacity style={styles.listItem}>
            <View
                style={[
                    styles.contactIcon,
                    {
                        backgroundColor: color,
                    },
                ]}
            />
            <View>
                <Text style={styles.contactName}>{name}</Text>
                <View style={styles.messageContainer}>
                    <Text style={styles.message} numberOfLines={2} ellipsizeMode={'tail'}>
                        {message}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const HeaderCom = (props) => {
    const { headerHeight } = props;
    return (
        <>
            <View
                style={[
                    styles._subHeader,
                    {
                        height: headerHeight / 2,
                    },
                ]}>
                {/* <Menu /> */}
                <Text style={styles.conversation}>Conversations</Text>
                {/* <Add /> */}
            </View>
            <View
                style={[
                    styles.subHeader,
                    {
                        height: headerHeight / 2,
                    },
                ]}>
                <View style={styles.searchBox}>
                    {/* <Search /> */}
                    <Text style={styles.searchText}>Search for messages or users</Text>
                </View>
            </View>
        </>
    )
}
export const getCloser = (value, checkOne, checkTwo) =>
    Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;
const { diffClamp } = Animated;
const App = () => {
    const data = generateData(25);
    const ref = useRef(null);
    const scrollY = useRef(new Animated.Value(0));
    const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);

    const translateY = scrollYClamped.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, -(headerHeight)],
    });

    const translateYNumber = useRef();

    translateY.addListener(({ value }) => {
        translateYNumber.current = value;
    });

    const handleScroll = Animated.event(
        [
            {
                nativeEvent: {
                    contentOffset: { y: scrollY.current },
                },
            },
        ],
        {
            useNativeDriver: true,
        },
    );

    const handleSnap = ({ nativeEvent }) => {
        const offsetY = nativeEvent.contentOffset.y;
        if (
            !(
                translateYNumber.current === 0 ||
                translateYNumber.current === -headerHeight
            )
        ) {
            if (ref.current) {
                ref.current.scrollToOffset({
                    offset:
                        getCloser(translateYNumber.current, -headerHeight / 2, 0) ===
                            -headerHeight / 2
                            ? offsetY + headerHeight / 2
                            : offsetY - headerHeight / 2,
                });
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#1c1c1c" style="light" />
            <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
                <HeaderCom {...{ headerHeight }} />
            </Animated.View>
            <Animated.FlatList
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingTop: headerHeight }}
                onScroll={handleScroll}
                ref={ref}
                onMomentumScrollEnd={handleSnap}
                data={data}
                renderItem={ListItem}
                keyExtractor={(item, index) => `list-item-${index}-${item.color}`}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        backgroundColor: '#1c1c1c',
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1,
    },
    subHeader: {
        height: headerHeight / 2,
        width: '100%',
        paddingHorizontal: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    _subHeader: {
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#1c1c1c',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    conversation: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    searchText: {
        color: '#8B8B8B',
        fontSize: 17,
        lineHeight: 22,
        marginLeft: 8,
    },
    searchBox: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#0F0F0F',
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    contactIcon: {
        height: 60,
        width: 60,
        borderRadius: 999,
    },
    contactName: {
        marginLeft: 15,
        fontSize: 16,
        color: 'white',
    },
    messageContainer: {
        marginRight: 20,
        paddingHorizontal: 15,
        width: width * 0.8,
    },
    message: {
        fontSize: 14,
        color: '#979799',
    },
});

export default App;