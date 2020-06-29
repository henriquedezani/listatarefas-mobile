import React, { useState  } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import api from '../api';
import { useNavigation } from '@react-navigation/native';


function Lista() {

    const navigator = useNavigation();

    const [nome, setNome] = useState('');

    const salvar = () => {
        api.post('/tarefa', {name: nome}).then(response => {
            navigator.goBack();
        });
    }

    return (
        <View style={styles.container}>
            <TextInput
                value={nome}
                onChangeText={(text) => setNome(text)}
                style={styles.input}
            />
            <Button
                title="Salvar"
                onPress={() => salvar()}
             />
        </View>
    );
}

export default Lista;

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    input: {
        padding: 12,
        backgroundColor: '#fff' ,
        fontSize: 14,
        borderRadius: 8 
    }
});