import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';
import api from '../api';

function Lista() {

    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        api.get('/tarefa').then((response) => {
            setTarefas(response.data);
        })
    }, []);

    const markAsDoneOrUndone = (id, done) => {
        const action = done ? 'undone' : 'done';
        api.patch(`/tarefa/${id}/${action}`).then(_ => {
            const indice = tarefas.findIndex(t => t.id == id);
            const _tarefasAtualizadas = [...tarefas];
            _tarefasAtualizadas[indice].done = !done;
            setTarefas(_tarefasAtualizadas);
        });
    }

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <FlatList
                data={tarefas}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item: tarefa }) => (
                    <ListItem
                        key={tarefa.id}
                        title={tarefa.name}
                        subtitle={tarefa.done ? 'Concluída' : 'Em andamento'}
                        onPress={() => markAsDoneOrUndone(tarefa.id, tarefa.done)} 
                        bottomDivider
                        chevron
                    />
                )}
            />
            <Button
                title="Nova Tarefa"
                onPress={() => navigation.navigate('Cadastro')} />
        </View>
    );
}

export default Lista;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})