import React, {FC, useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import CocosView, {cocosBridge} from 'react-native-cocos';

const GameScreen: FC<any> = ({route, navigation}) => {
    useEffect(() => {
        cocosBridge.start('COCOS_MAX_API');
        cocosBridge.addEventListener('COCOS_MAX_API', handlerEvent);

        return () => {
            cocosBridge.removeEventListener('COCOS_MAX_API');
        };
    }, []);

    const handlerEvent = (messageStr: string) => {
        const event = JSON.parse(messageStr);

        //handler here
        switch (event.func) {
            case 'goBack':
                navigation.goBack();
        }
    };

    return (
        <View style={{flex: 1, backgroundColor: 'red'}}>
            <StatusBar
                translucent
                backgroundColor="rgba(0, 0, 0, 0.20)"
                animated
            />
            <CocosView assetsPath={route.params.path} />
        </View>
    );
};

export default GameScreen;
