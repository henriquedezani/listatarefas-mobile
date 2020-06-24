import React from 'react';
import { View, Text} from 'react-native';

function Item({name, id, done}) {

    return (
        <View>
            <Text>{name}</Text>
        </View>
    );
}

export default Item;