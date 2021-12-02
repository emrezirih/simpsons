import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import List from './list';
import Detail from './detail';
import Add from './add';

const Stack = createNativeStackNavigator();

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={List} />
        <Stack.Screen name="detail" component={Detail} />
        <Stack.Screen name="add" component={Add} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}