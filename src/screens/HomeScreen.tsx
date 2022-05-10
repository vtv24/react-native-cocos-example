import React, {FC} from 'react';
import {Button, View, Text} from 'react-native';
import useDownloadAssets from '../hooks/useDownloadAssets';

const HomeScreen: FC<any> = ({navigation}) => {
    const {dowloading, percent, start} = useDownloadAssets();

    const startGame = (id: string) => {
        start(id).then(path => {
            navigation.push('Game', {path});
        });
    };

    if (dowloading) {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{textAlign: 'center'}}>Dowloading {percent}</Text>
            </View>
        );
    }

    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Button title="Open Game 1" onPress={() => startGame('test')} />
            <View style={{height: 10}} />
            <Button title="Open Game 2" onPress={() => startGame('thinh')} />
        </View>
    );
};

export default HomeScreen;
