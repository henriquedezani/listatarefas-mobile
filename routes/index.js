import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';
import Lista from '../pages/Lista';
import Cadastro from '../pages/Cadastro';

const Routes = createStackNavigator();

export default function PageRoutes() {
    return (
        <Routes.Navigator 
        // screenOptions={{
            // headerTintColor: '#F00',
            // headerShown: false,
            // headerStyle: { backgroundColor: '#00FFFF'}, 
            // cardStyle: { backgroundColor: '#F5F5F5' }
        // }} initialRouteName='Lista'
        > 
            <Routes.Screen name="Lista" component={Lista} 
            // options={{
            //     headerRight: () => (
            //         <Button
            //             onPress={() => alert('This is a button!')}
            //             title="Novo"
            //         />
            //     ),
            // }}
             />
            <Routes.Screen name="Cadastro" component={Cadastro} />
        </Routes.Navigator>
    );
}