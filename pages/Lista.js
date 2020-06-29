import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';
import api from '../api';

function Lista() {

    const [tarefas, setTarefas] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        api.get('/tarefa').then((response) => {
            setTarefas(response.data);
        })
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        api.get('/tarefa').then((response) => {
            setTarefas(response.data);
            setRefreshing(false);
        })
    }

    const markAsDoneOrUndone = (id, done) => {
        const action = done ? 'undone' : 'done';
        api.patch(`/tarefa/${id}/${action}`).then(_ => {
            const indice = tarefas.findIndex(t => t.id == id);
            const _tarefasAtualizadas = [...tarefas];
            _tarefasAtualizadas[indice].done = !done;
            setTarefas(_tarefasAtualizadas);
        });
    }

    const apagar = (id) => {
        api.delete(`/tarefa/${id}`).then(response => {
            const _tarefasAtualizadas = tarefas.filter(t => t.id !== id);
            setTarefas(_tarefasAtualizadas);
        });
    }

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <FlatList
                data={tarefas}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                keyExtractor={item => item.id.toString()}
                renderItem={({ item: tarefa }) => (
                    <ListItem
                        key={tarefa.id}
                        title={tarefa.name}
                        subtitle={tarefa.done ? 'Concluída' : 'Em andamento'}
                        onPress={() => markAsDoneOrUndone(tarefa.id, tarefa.done)}
                        onLongPress={() => apagar(tarefa.id)}
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